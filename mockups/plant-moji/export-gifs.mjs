// Exports plant-moji as looping GIFs: one per plant × feeling, plus an animated contact sheet.
// Draws with the same code as plant-moji-leaf.html, so the GIFs always match the sheet.
//
// Usage (dependencies stay outside the repo; Chrome must be installed):
//   npm i --prefix /tmp/moji-deps playwright gifenc pngjs
//   DEPS=/tmp/moji-deps node mockups/plant-moji/export-gifs.mjs [out-dir]
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(join(process.env.DEPS ?? process.cwd(), 'noop.js'));
const { chromium } = require('playwright');
const { GIFEncoder, quantize, applyPalette } = require('gifenc');
const { PNG } = require('pngjs');

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.argv[2] ?? join(here, 'gif');
const FRAMES = 16, DELAY_MS = 90, SIZE = 180, PAPER = '#f3efe6';
const PLANTS = ['mochi', 'lua', 'kogane', 'wren', 'bjorn'];
const FEELINGS = ['happy', 'hyped', 'thanks', 'relax', 'shy', 'awkward', 'mad', 'sad', 'melt', 'dead'];

function encode(frames, width, height) {
  const gif = GIFEncoder();
  for (const rgba of frames) {
    const palette = quantize(rgba, 256);
    gif.writeFrame(applyPalette(rgba, palette), width, height, { palette, delay: DELAY_MS });
  }
  gif.finish();
  return gif.bytes();
}

// rasterise one moji's frames inside the page and hand back RGBA as base64
async function mojiFrames(page, plant, feeling, width, height) {
  const frames = await page.evaluate(async ({ plant, feeling, n, width, height, paper }) => {
    const canvas = Object.assign(document.createElement('canvas'), { width, height });
    const ctx = canvas.getContext('2d');
    const out = [];
    for (let i = 0; i < n; i++) {
      const svg = window.mojiAt(plant, feeling, i / n).replace('<svg ', `<svg width="${width}" height="${height}" `);
      const img = new Image();
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
      await img.decode();
      ctx.fillStyle = paper;
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      const px = ctx.getImageData(0, 0, width, height).data;
      let bin = '';
      for (let j = 0; j < px.length; j += 0x8000) bin += String.fromCharCode(...px.subarray(j, j + 0x8000));
      out.push(btoa(bin));
    }
    return out;
  }, { plant, feeling, n: FRAMES, width, height, paper: PAPER });
  return frames.map(b64 => new Uint8Array(Buffer.from(b64, 'base64')));
}

async function sheetFrames(page) {
  const table = page.locator('#table');
  const frames = [];
  let size;
  for (let i = 0; i < FRAMES; i++) {
    await page.evaluate(t => window.renderAt(t), i / FRAMES);
    const png = PNG.sync.read(await table.screenshot());
    size = [png.width, png.height];
    frames.push(new Uint8Array(png.data));
  }
  return { frames, size };
}

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1240, height: 900 } });
await page.goto(pathToFileURL(join(here, 'plant-moji-leaf.html')).href + '#static');

const height = Math.round(SIZE * 124 / 120);
for (const plant of PLANTS) {
  for (const feeling of FEELINGS) {
    const frames = await mojiFrames(page, plant, feeling, SIZE, height);
    writeFileSync(join(outDir, `${plant}-${feeling}.gif`), encode(frames, SIZE, height));
  }
}

const sheet = await sheetFrames(page);
writeFileSync(join(here, 'plant-moji-sheet.gif'), encode(sheet.frames, ...sheet.size));
await browser.close();
process.stdout.write(`wrote ${PLANTS.length * FEELINGS.length} GIFs to ${outDir} and plant-moji-sheet.gif\n`);
