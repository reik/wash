import { assertEquals } from '@std/assert';

import { stripMetadata } from './metadata-strip.ts';

const enc = new TextEncoder();

function bytes(...parts: (number[] | Uint8Array | string)[]): Uint8Array {
  const chunks = parts.map((part) => (typeof part === 'string' ? enc.encode(part) : part instanceof Uint8Array ? part : Uint8Array.from(part)));
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
}

function u32be(value: number): number[] {
  return [(value >>> 24) & 0xff, (value >>> 16) & 0xff, (value >>> 8) & 0xff, value & 0xff];
}

function u32le(value: number): number[] {
  return [value & 0xff, (value >>> 8) & 0xff, (value >>> 16) & 0xff, (value >>> 24) & 0xff];
}

// ---- JPEG -------------------------------------------------------------------

const SOI = [0xff, 0xd8];
const EOI = [0xff, 0xd9];
const APP0 = [0xff, 0xe0, 0x00, 0x04, 0x00, 0x00]; // JFIF-style, kept
const APP1_EXIF = [0xff, 0xe1, 0x00, 0x08, 0x45, 0x78, 0x69, 0x66, 0x00, 0x00]; // "Exif\0\0", removed
const SOS = [0xff, 0xda, 0x00, 0x04, 0x01, 0x02]; // scan header, kept
const SCAN = [0x11, 0x22, 0x33]; // entropy-coded data, kept as-is

Deno.test('should_remove_exif_segment_from_jpeg', () => {
  const input = bytes(SOI, APP0, APP1_EXIF, SOS, SCAN, EOI);

  const output = stripMetadata('image/jpeg', input);

  assertEquals(output, bytes(SOI, APP0, SOS, SCAN, EOI));
});

Deno.test('should_keep_jpeg_image_data_unchanged_when_no_metadata_present', () => {
  const input = bytes(SOI, APP0, SOS, SCAN, EOI);

  assertEquals(stripMetadata('image/jpeg', input), input);
});

Deno.test('should_remove_xmp_segment_from_jpeg', () => {
  const xmp = [0xff, 0xe1, 0x00, 0x06, 0x58, 0x4d, 0x50, 0x00]; // "XMP\0", length 6 (payload 4)
  const input = bytes(SOI, xmp, SOS, SCAN, EOI);

  assertEquals(stripMetadata('image/jpeg', input), bytes(SOI, SOS, SCAN, EOI));
});

// ---- PNG --------------------------------------------------------------------

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

function pngChunk(type: string, data: number[]): Uint8Array {
  return bytes(u32be(data.length), type, data, [0, 0, 0, 0]);
}

Deno.test('should_remove_text_chunk_from_png', () => {
  const ihdr = pngChunk('IHDR', [0, 0, 0, 1, 0, 0, 0, 1, 8, 2, 0, 0, 0]);
  const text = pngChunk('tEXt', [0x43, 0x6f, 0x6d, 0x6d, 0x00, 0x68, 0x69]);
  const iend = pngChunk('IEND', []);

  const output = stripMetadata('image/png', bytes(PNG_SIGNATURE, ihdr, text, iend));

  assertEquals(output, bytes(PNG_SIGNATURE, ihdr, iend));
});

Deno.test('should_remove_exif_chunk_from_png', () => {
  const ihdr = pngChunk('IHDR', [0, 0, 0, 1, 0, 0, 0, 1, 8, 2, 0, 0, 0]);
  const exif = pngChunk('eXIf', [0x4d, 0x4d, 0x00, 0x2a]);
  const iend = pngChunk('IEND', []);

  assertEquals(stripMetadata('image/png', bytes(PNG_SIGNATURE, ihdr, exif, iend)), bytes(PNG_SIGNATURE, ihdr, iend));
});

// ---- WebP -------------------------------------------------------------------

function webpChunk(fourCC: string, data: number[]): Uint8Array {
  const padded = data.length % 2 === 1 ? [...data, 0] : data;
  return bytes(fourCC, u32le(data.length), padded);
}

function riff(...chunks: Uint8Array[]): Uint8Array {
  const body = bytes('WEBP', ...chunks);
  return bytes('RIFF', u32le(body.length), body);
}

Deno.test('should_remove_exif_chunk_from_webp_and_fix_riff_size', () => {
  const image = webpChunk('VP8L', [0x2f, 0x00, 0x00, 0x00]);
  const exif = webpChunk('EXIF', [0x49, 0x49, 0x2a, 0x00]);

  const output = stripMetadata('image/webp', riff(exif, image));

  assertEquals(output, riff(image));
});

Deno.test('should_remove_xmp_chunk_from_webp', () => {
  const image = webpChunk('VP8L', [0x2f, 0x00, 0x00, 0x00]);
  const xmp = webpChunk('XMP ', [0x3c, 0x78, 0x3a]);

  assertEquals(stripMetadata('image/webp', riff(image, xmp)), riff(image));
});
