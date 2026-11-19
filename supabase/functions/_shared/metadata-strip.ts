/**
 * Removes location, camera and authoring metadata from uploaded images without
 * re-encoding the picture. Image data is copied byte-for-byte; only the metadata
 * segments or chunks are dropped. Input that does not match its declared format
 * throws, so the caller can refuse to store it.
 */

export type StrippableMediaType = 'image/jpeg' | 'image/png' | 'image/webp';

const decoder = new TextDecoder('ascii');

/** JPEG markers that carry metadata: APP1 (EXIF/XMP), APP12 (Ducky), APP13 (IPTC), COM. */
const JPEG_METADATA_MARKERS: ReadonlySet<number> = new Set([0xe1, 0xec, 0xed, 0xfe]);
/** PNG chunks that carry metadata: text, compressed text, international text, EXIF, time. */
const PNG_METADATA_CHUNKS: ReadonlySet<string> = new Set(['tEXt', 'zTXt', 'iTXt', 'eXIf', 'tIME']);
/** WebP chunks that carry metadata. */
const WEBP_METADATA_CHUNKS: ReadonlySet<string> = new Set(['EXIF', 'XMP ']);

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

function concat(parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

function ascii(bytes: Uint8Array, start: number, end: number): string {
  return decoder.decode(bytes.subarray(start, end));
}

function u32be(bytes: Uint8Array, at: number): number {
  return ((bytes[at] << 24) | (bytes[at + 1] << 16) | (bytes[at + 2] << 8) | bytes[at + 3]) >>> 0;
}

function u32le(bytes: Uint8Array, at: number): number {
  return (bytes[at] | (bytes[at + 1] << 8) | (bytes[at + 2] << 16) | (bytes[at + 3] << 24)) >>> 0;
}

function stripJpeg(input: Uint8Array): Uint8Array {
  if (input[0] !== 0xff || input[1] !== 0xd8) {
    throw new Error('not a JPEG');
  }
  const parts: Uint8Array[] = [input.subarray(0, 2)];
  let i = 2;
  while (i < input.length) {
    if (input[i] !== 0xff) {
      throw new Error('malformed JPEG marker');
    }
    const marker = input[i + 1];
    if (marker === 0xff) {
      i += 1;
      continue;
    }
    if (marker === 0xd9) {
      parts.push(input.subarray(i, i + 2));
      break;
    }
    if (marker === 0xda) {
      // Start of scan: the rest of the file is the picture itself.
      parts.push(input.subarray(i));
      break;
    }
    if ((marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) {
      parts.push(input.subarray(i, i + 2));
      i += 2;
      continue;
    }
    const length = (input[i + 2] << 8) | input[i + 3];
    const end = i + 2 + length;
    if (!JPEG_METADATA_MARKERS.has(marker)) {
      parts.push(input.subarray(i, end));
    }
    i = end;
  }
  return concat(parts);
}

function stripPng(input: Uint8Array): Uint8Array {
  if (!PNG_SIGNATURE.every((byte, index) => input[index] === byte)) {
    throw new Error('not a PNG');
  }
  const parts: Uint8Array[] = [input.subarray(0, 8)];
  let i = 8;
  while (i + 8 <= input.length) {
    const length = u32be(input, i);
    const type = ascii(input, i + 4, i + 8);
    const end = i + 12 + length;
    if (!PNG_METADATA_CHUNKS.has(type)) {
      parts.push(input.subarray(i, end));
    }
    i = end;
    if (type === 'IEND') {
      break;
    }
  }
  return concat(parts);
}

function stripWebp(input: Uint8Array): Uint8Array {
  if (ascii(input, 0, 4) !== 'RIFF' || ascii(input, 8, 12) !== 'WEBP') {
    throw new Error('not a WebP');
  }
  const chunks: Uint8Array[] = [];
  let i = 12;
  while (i + 8 <= input.length) {
    const fourCC = ascii(input, i, i + 4);
    const size = u32le(input, i + 4);
    const end = i + 8 + size + (size % 2);
    if (!WEBP_METADATA_CHUNKS.has(fourCC)) {
      chunks.push(input.subarray(i, end));
    }
    i = end;
  }
  const body = concat([input.subarray(8, 12), ...chunks]);
  const header = new Uint8Array(8);
  header.set(input.subarray(0, 4), 0);
  new DataView(header.buffer).setUint32(4, body.length, true);
  return concat([header, body]);
}

export function stripMetadata(mediaType: StrippableMediaType, input: Uint8Array): Uint8Array {
  switch (mediaType) {
    case 'image/jpeg':
      return stripJpeg(input);
    case 'image/png':
      return stripPng(input);
    case 'image/webp':
      return stripWebp(input);
  }
}
