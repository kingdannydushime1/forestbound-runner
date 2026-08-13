import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { inflateSync } from "node:zlib";

function decodePng(bytes) {
  assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  let offset = 8; let width; let height; let bitDepth; let colorType; let interlace; const idat = [];
  while (offset < bytes.length) {
    const size = bytes.readUInt32BE(offset); const type = bytes.toString("ascii", offset + 4, offset + 8); const chunk = bytes.subarray(offset + 8, offset + 8 + size); offset += size + 12;
    if (type === "IHDR") { width = chunk.readUInt32BE(0); height = chunk.readUInt32BE(4); bitDepth = chunk[8]; colorType = chunk[9]; interlace = chunk[12]; }
    else if (type === "IDAT") idat.push(chunk);
    else if (type === "IEND") break;
  }
  assert.equal(bitDepth, 8); assert.equal(colorType, 6, "production PNGs must be RGBA"); assert.equal(interlace, 0, "production PNGs must be non-interlaced");
  const decoded = inflateSync(Buffer.concat(idat)); const stride = width * 4; const rows = []; let cursor = 0; let previous = new Uint8Array(stride);
  for (let y = 0; y < height; y += 1) {
    const filter = decoded[cursor++]; const row = Uint8Array.from(decoded.subarray(cursor, cursor + stride)); cursor += stride;
    for (let x = 0; x < stride; x += 1) {
      const left = x >= 4 ? row[x - 4] : 0; const up = previous[x]; const upLeft = x >= 4 ? previous[x - 4] : 0;
      if (filter === 1) row[x] = (row[x] + left) & 255;
      else if (filter === 2) row[x] = (row[x] + up) & 255;
      else if (filter === 3) row[x] = (row[x] + Math.floor((left + up) / 2)) & 255;
      else if (filter === 4) { const p = left + up - upLeft; const pa = Math.abs(p - left); const pb = Math.abs(p - up); const pc = Math.abs(p - upLeft); const predictor = pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft; row[x] = (row[x] + predictor) & 255; }
      else assert.equal(filter, 0, `unsupported PNG filter ${filter}`);
    }
    rows.push(row); previous = row;
  }
  return { width, height, rows };
}

async function assertSheet(path, frameWidth, frameHeight, expectedFrames, usedFrames) {
  const png = decodePng(await readFile(path));
  assert.equal(png.width % frameWidth, 0, `${path} width must divide into frames`);
  assert.equal(png.height % frameHeight, 0, `${path} height must divide into frames`);
  const count = (png.width / frameWidth) * (png.height / frameHeight);
  assert.equal(count, expectedFrames, `${path} frame count`);
  for (const frame of usedFrames) {
    const fx = (frame % (png.width / frameWidth)) * frameWidth; const fy = Math.floor(frame / (png.width / frameWidth)) * frameHeight; let opaque = 0;
    for (let y = fy; y < fy + frameHeight; y += 1) for (let x = fx; x < fx + frameWidth; x += 1) if (png.rows[y][x * 4 + 3] > 0) opaque += 1;
    assert.ok(opaque > 0, `${path} frame ${frame} is empty`);
  }
  return `${path}: ${png.width}x${png.height}, ${count} frames, checked ${usedFrames.length}`;
}

const root = "public/assets/path-drawer/selected";
const sheets = [
  ["art/ground-tiles.png", 32, 32, 144, [0, 1]],
  ["art/rocks.png", 32, 32, 36, [0, 1, 2, 4, 5, 6, 7]],
  ["art/roots-logs.png", 32, 32, 36, [0, 1, 2, 3, 4, 5]],
  ["art/ruins.png", 32, 32, 192, [0, 1, 2, 3, 4, 5]],
  ["art/bushes.png", 32, 32, 120, [0, 1, 2]],
  ["art/trees.png", 32, 32, 120, [0, 1, 2]],
  ["art/nature-details.png", 32, 32, 48, [0, 1]],
  ["art/items.png", 32, 32, 24, [0, 1, 2, 3]],
  ["art/player-idle-front.png", 32, 33, 9, [0, 1, 2, 3, 4, 5, 6, 7, 8]],
  ["art/player-walk-front.png", 32, 33, 4, [0, 1, 2, 3]],
  ["art/ui-panels-buttons.png", 32, 32, 192, [0]],
  ["vfx/explosion.png", 32, 32, 11, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
  ["vfx/impact-shock.png", 140, 50, 7, [0, 1, 2, 3, 4, 5, 6]],
];
for (const [path, width, height, count, used] of sheets) console.log(await assertSheet(`${root}/${path}`, width, height, count, used));

const audioFiles = ["audio/puzzle-pieces.ogg", "audio/sfx/draw-select.wav", "audio/sfx/route-confirm.wav", "audio/sfx/shard-collect.wav", "audio/sfx/collision.wav", "audio/sfx/beacon-success.wav"];
for (const relative of audioFiles) {
  const bytes = await readFile(`${root}/${relative}`);
  assert.ok(bytes.length > 32, `${relative} is not empty`);
  assert.ok(relative.endsWith(".ogg") ? bytes.subarray(0, 4).toString() === "OggS" : bytes.subarray(0, 4).toString() === "RIFF", `${relative} has an expected audio container`);
}
console.log(`checked ${audioFiles.length} local audio files`);
