"""Build a single self-contained slides.html (JS, CSS, images, fonts inlined).

Usage:  python3 scripts/build_standalone.py
Requires: npm deps installed, Pillow, internet (Google Fonts download).
"""
import base64
import io
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
OUT = ROOT / "slides.html"

MAX_W = 1920  # full-HD is the largest the deck is ever shown at
JPEG_Q = 82
FONT_SUBSETS = {"cyrillic-ext", "cyrillic", "latin-ext", "latin"}
CHROME_UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
)


def b64(data: bytes, mime: str) -> str:
    return f"data:{mime};base64,{base64.b64encode(data).decode()}"


def image_data_uri(path: Path) -> str:
    original = path.read_bytes()
    uri = recompressed_data_uri(path)
    if len(uri) * 3 // 4 >= len(original):  # re-encoding didn't help: keep the original bytes
        mime = "image/png" if path.suffix.lower() == ".png" else "image/jpeg"
        return b64(original, mime)
    return uri


def recompressed_data_uri(path: Path) -> str:
    im = Image.open(path)
    has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
    if im.width > MAX_W:
        im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
    buf = io.BytesIO()
    if has_alpha:
        if im.width > 1100:  # logo / pattern never render wider than ~600px
            im = im.resize((1100, round(im.height * 1100 / im.width)), Image.LANCZOS)
        im.save(buf, "PNG", optimize=True)
        return b64(buf.getvalue(), "image/png")
    im.convert("RGB").save(buf, "JPEG", quality=JPEG_Q, optimize=True, progressive=True)
    return b64(buf.getvalue(), "image/jpeg")


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": CHROME_UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def inline_google_fonts(css: str) -> str:
    m = re.search(r'@import\s*(?:url\()?["\']?(https://fonts\.googleapis\.com/[^"\')]+)["\']?\)?;', css)
    if not m:
        return css
    font_css = fetch(m.group(1)).decode()
    faces = []
    cache: dict[str, str] = {}
    for subset, block in re.findall(r"/\*\s*([\w-]+)\s*\*/\s*(@font-face\s*{[^}]*})", font_css):
        if subset not in FONT_SUBSETS:
            continue
        url = re.search(r"url\((https://[^)]+)\)", block).group(1)
        if url not in cache:
            cache[url] = b64(fetch(url), "font/woff2")
        faces.append(block.replace(url, cache[url]))
    print(f"  fonts: {len(faces)} @font-face blocks inlined")
    return "\n".join(faces) + "\n" + css.replace(m.group(0), "", 1)


def main() -> None:
    print("1/3 vite build")
    subprocess.run(["npx", "vite", "build"], cwd=ROOT, check=True)

    html = (DIST / "index.html").read_text()
    js_src = re.search(r'<script type="module" crossorigin src="([^"]+)"></script>', html)
    css_href = re.search(r'<link rel="stylesheet" crossorigin href="([^"]+)">', html)
    js = (DIST / js_src.group(1).lstrip("/")).read_text()
    css = (DIST / css_href.group(1).lstrip("/")).read_text()

    print("2/3 inlining images + fonts")
    for asset in sorted((DIST / "assets").iterdir()):
        if asset.suffix.lower() not in (".jpg", ".jpeg", ".png", ".webp"):
            continue
        ref = f"/assets/{asset.name}"
        if ref not in js and ref not in css:
            continue
        uri = image_data_uri(asset)
        js = js.replace(ref, uri)
        css = css.replace(ref, uri)
        print(f"  {asset.name}: {asset.stat().st_size // 1024} KB -> {len(uri) * 3 // 4 // 1024} KB")
    css = inline_google_fonts(css)

    js = js.replace("</script", "<\\/script")
    html = html.replace(js_src.group(0), "")
    html = html.replace(css_href.group(0), f"<style>{css}</style>")
    html = html.replace("</body>", f'<script type="module">{js}</script>\n</body>')

    print("3/3 writing", OUT.name)
    OUT.write_text(html)
    leftovers = re.findall(r'["(]/assets/[^")]+', html) + re.findall(r"https://fonts\.(?:googleapis|gstatic)", html)
    if leftovers:
        sys.exit(f"unresolved external refs: {leftovers[:5]}")
    print(f"done: {OUT} ({OUT.stat().st_size / 1024 / 1024:.1f} MB)")


if __name__ == "__main__":
    main()
