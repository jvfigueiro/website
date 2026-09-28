#!/usr/bin/env python3
"""
Image Optimization Utility: Convert JPG/PNG images to WebP format.

Usage:
    python3 scripts/convert_to_webp.py [--quality 82] [--keep-originals]
"""

import os
import sys
from PIL import Image

IMAGES_DIR = os.path.join(os.path.dirname(__file__), '..', 'html', 'images')
QUALITY = 82

def convert_images(images_dir=IMAGES_DIR, quality=QUALITY):
    total_original = 0
    total_webp = 0
    count = 0

    print(f"Scanning directory: {os.path.abspath(images_dir)}")
    print(f"{'Filename':<22} | {'Original':<10} | {'WebP':<10} | {'Savings':<8}")
    print("-" * 60)

    for filename in sorted(os.listdir(images_dir)):
        ext = filename.lower().rsplit('.', 1)[-1]
        if ext not in ('jpg', 'jpeg', 'png'):
            continue
        
        # Skip favicon
        if filename == 'favicon.png':
            continue

        src_path = os.path.join(images_dir, filename)
        base_name = filename.rsplit('.', 1)[0]
        out_path = os.path.join(images_dir, f"{base_name}.webp")

        orig_size = os.path.getsize(src_path)

        try:
            with Image.open(src_path) as im:
                # Handle RGBA/transparency for PNGs
                if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
                    im.save(out_path, 'WEBP', quality=quality, method=6)
                else:
                    rgb_im = im.convert('RGB')
                    rgb_im.save(out_path, 'WEBP', quality=quality, method=6)

            webp_size = os.path.getsize(out_path)
            savings = (1 - webp_size / orig_size) * 100
            total_original += orig_size
            total_webp += webp_size
            count += 1

            print(f"{filename:<22} | {orig_size/1024:7.1f} KB | {webp_size/1024:7.1f} KB | {savings:5.1f}%")
        except Exception as err:
            print(f"Failed to convert {filename}: {err}", file=sys.stderr)

    if count > 0:
        overall_savings = (1 - total_webp / total_original) * 100
        print("-" * 60)
        print(f"Total: {count} images converted.")
        print(f"Original size: {total_original / (1024*1024):.2f} MB")
        print(f"WebP size:     {total_webp / (1024*1024):.2f} MB")
        print(f"Bandwidth reduction: {overall_savings:.1f}%")

if __name__ == '__main__':
    convert_images()
