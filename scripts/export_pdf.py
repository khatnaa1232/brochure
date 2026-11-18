"""Export slides.html to a Full-HD, image-based slides.pdf.

Each slide is opened in "still" mode (?export=still&slide=N): animations run
normally, then we wait until every finite CSS animation has finished and the
JS count-ups have settled before taking a 1920x1080 screenshot.

Usage:  python3 scripts/export_pdf.py        (run build_standalone.py first)
Requires: playwright (python) + chromium, Pillow.
"""
import io
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
HTML = ROOT / "slides.html"
OUT = ROOT / "slides.pdf"
SLIDE_COUNT = 14
SCALE = 1920 / 1600  # slides are authored at 1600x900

# true once no finite animation is still running and RAF-driven numbers stopped changing
SETTLED_JS = """
() => {
  const running = document.getAnimations().filter((a) => {
    const t = a.effect && a.effect.getComputedTiming ? a.effect.getComputedTiming() : null;
    return t && t.iterations !== Infinity && a.playState === "running";
  });
  const text = document.body.innerText;
  const stable = window.__lastText === text;
  window.__lastText = text;
  return running.length === 0 && stable;
}
"""


def main() -> None:
    if not HTML.exists():
        raise SystemExit("slides.html not found - run scripts/build_standalone.py first")

    pages = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1600, "height": 900}, device_scale_factor=SCALE)
        for n in range(1, SLIDE_COUNT + 1):
            page.goto(f"{HTML.as_uri()}?export=still&slide={n}", wait_until="load")
            page.evaluate("document.fonts.ready")
            page.wait_for_timeout(2500)  # longest entrance delay is ~1.9s
            # poll until finite animations are done and text (counters) is stable
            for _ in range(40):
                if page.evaluate(SETTLED_JS):
                    break
                page.wait_for_timeout(250)
            page.wait_for_timeout(400)
            png = page.screenshot(clip={"x": 0, "y": 0, "width": 1600, "height": 900})
            img = Image.open(io.BytesIO(png)).convert("RGB")
            assert img.size == (1920, 1080), img.size
            img.save(ROOT / "dist" / f"slide-{n:02d}.jpg", quality=92)
            pages.append(img)
            print(f"  slide {n:02d} captured")
        browser.close()

    pages[0].save(OUT, "PDF", save_all=True, append_images=pages[1:], resolution=144, quality=92)
    print(f"done: {OUT} ({OUT.stat().st_size / 1024 / 1024:.1f} MB, {len(pages)} pages @ 1920x1080)")


if __name__ == "__main__":
    main()
