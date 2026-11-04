"""Download flavor media from Supabase and write optimized copies to public/media.

Requires Python 3 + Pillow and ffmpeg. Usage: python3 scripts/optimize-media.py <sources.json>
sources.json maps output basenames to source URLs (.png stills or animated .webp).
Animated sources become an H.264 MP4 plus a poster frame; stills become WebP in two heights.
"""
import json
import os
import subprocess
import sys
import tempfile
import urllib.request

from PIL import Image

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'media')
STILL_HEIGHTS = (480, 960)


def still(name, path):
    im = Image.open(path).convert('RGBA')
    for h in STILL_HEIGHTS:
        w = round(im.width * h / im.height)
        im.resize((w, h), Image.LANCZOS).save(os.path.join(OUT, f'{name}-{h}.webp'), quality=82, method=6)


def animation(name, path, tmp):
    im = Image.open(path)
    duration = im.info.get('duration', 40) or 40
    frames = os.path.join(tmp, name)
    os.makedirs(frames, exist_ok=True)
    for i in range(im.n_frames):
        im.seek(i)
        frame = Image.new('RGB', im.size, (0, 0, 0))
        rgba = im.convert('RGBA')
        frame.paste(rgba, mask=rgba.split()[3])
        if i == 0:
            frame.save(os.path.join(OUT, f'{name}-poster.jpg'), quality=80)
        frame.save(os.path.join(frames, f'{i:04d}.png'))
    fps = str(round(1000 / duration, 3))
    pattern = os.path.join(frames, '%04d.png')
    scale = 'scale=-2:min(720\\,ih)'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', fps, '-i', pattern, '-vf', scale,
                    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '27', '-preset', 'slow', '-movflags', '+faststart',
                    '-an', os.path.join(OUT, f'{name}.mp4')], check=True)


def main():
    sources = json.load(open(sys.argv[1]))
    os.makedirs(OUT, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        for name, url in sources.items():
            if os.path.exists(os.path.join(OUT, f'{name}.mp4')) or os.path.exists(os.path.join(OUT, f'{name}-960.webp')):
                continue
            path = os.path.join(tmp, name + ('.webp' if '.webp' in url.split('?')[0] else '.png'))
            urllib.request.urlretrieve(url, path)
            if path.endswith('.webp') and getattr(Image.open(path), 'n_frames', 1) > 1:
                animation(name, path, tmp)
            else:
                still(name, path)
            print('ok', name)


if __name__ == '__main__':
    main()
