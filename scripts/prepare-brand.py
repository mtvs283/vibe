from collections import deque
from PIL import Image

CREAM = (246, 240, 228)


def flood_clear(img: Image.Image, tol: int = 8) -> Image.Image:
    out = img.convert("RGBA").copy()
    px = out.load()
    w, h = out.size
    visited = [[False] * w for _ in range(h)]
    q = deque()

    def is_bg(c):
        r, g, b, a = c
        return a > 0 and abs(r - CREAM[0]) <= tol and abs(g - CREAM[1]) <= tol and abs(b - CREAM[2]) <= tol

    for x in range(w):
        for y in (0, h - 1):
            if is_bg(px[x, y]):
                q.append((x, y))
                visited[y][x] = True
    for y in range(h):
        for x in (0, w - 1):
            if not visited[y][x] and is_bg(px[x, y]):
                q.append((x, y))
                visited[y][x] = True

    while q:
        x, y = q.popleft()
        px[x, y] = (0, 0, 0, 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx] and is_bg(px[nx, ny]):
                visited[ny][nx] = True
                q.append((nx, ny))
    return out


def tight_crop(img: Image.Image, pad: int = 16) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        raise SystemExit("empty image after processing")
    cropped = img.crop(bbox)
    canvas = Image.new("RGBA", (cropped.width + pad * 2, cropped.height + pad * 2), (0, 0, 0, 0))
    canvas.paste(cropped, (pad, pad), cropped)
    return canvas


raw = Image.open(r"c:\시나브로-vibe\public\brand\tk-saem-raw.png").convert("RGBA")
# Character + yellow TK샘 only; stop before the large orange title block.
tk = raw.crop((265, 218, 455, 345))
tk = flood_clear(tk, tol=8)
tk = tk.resize((tk.width * 4, tk.height * 4), Image.Resampling.LANCZOS)
tk = tight_crop(tk, pad=24)
tk_path = r"c:\시나브로-vibe\public\brand\tk-saem.png"
tk.save(tk_path)
print("tk", tk_path, tk.size)

inst_src = r"C:\Users\kodak\.cursor\projects\c-vibe\assets\c__Users_kodak_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images______ai_____-8cb04d10-b419-4c28-935e-2b4debcb7d18.png"
inst = Image.open(inst_src).convert("RGBA")
inst = flood_clear(inst, tol=10)
inst = tight_crop(inst, pad=16)
inst_path = r"c:\시나브로-vibe\public\brand\institute.png"
inst.save(inst_path)
print("institute", inst_path, inst.size)
