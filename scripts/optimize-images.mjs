// One-off image pass for the static site. Uses ImageMagick (`magick`).
// Writes new files next to the originals (originals are kept as masters). Re-run any time; it overwrites outputs.
//   node scripts/optimize-images.mjs
import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const assets = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'assets');
const size = (p) => statSync(p).size;

// Brand logos used on the home wall, rendered at ~90 CSS px. 360px wide covers 3x screens.
const LOGOS = ['adani', 'amante', 'apollo', 'breathe-in', 'cornucopia', 'delta-reliance', 'frnd', 'jiohotstar', 'nykaa', 'snack-a-doodle', 'stranger'];

const jobs = [
  // Hero portrait is shown at most 350 CSS px wide (230px on phones). srcset chooses between the two.
  { src: 'img/portrait.webp', out: 'img/portrait-480.webp', width: 480, quality: 72 },
  { src: 'img/portrait.webp', out: 'img/portrait-720.webp', width: 720, quality: 70 },
  ...LOGOS.map((name) => ({ src: `logos/${name}.png`, out: `logos/${name}.webp`, width: 360, quality: 88 })),
];

for (const job of jobs) {
  const from = join(assets, job.src);
  const to = join(assets, job.out);
  execFileSync('magick', [from, '-resize', `${job.width}x>`, '-strip', '-quality', String(job.quality), to]);
  console.log(`${job.out.padEnd(28)} ${String(size(from)).padStart(7)} -> ${String(size(to)).padStart(6)} bytes`);
}

// Case-file checker (.checker::before in base.css) used to run filter: blur(7px) saturate(1.05) on a
// large layer every frame. Bake that into one seamless tile instead.
// The conic gradient is a 2x2 cell per 96x132 tile: wine in the top-right and bottom-left quadrants, wine-2 in the
// other two, so it is a checkerboard of 48x66 cells. Colours are the tokens after saturate(1.05), which is
// applied to the colours here rather than at runtime. Tile is 2x (192x264) for retina; sigma 14 = CSS blur 7px at 2x.
function bakeChecker() {
  const WINE = '#5d1720'; // --wine (#5a1820) after saturate(1.05)
  const WINE2 = '#7d2330'; // --wine-2 (#7a2430) after saturate(1.05)
  const cell = { w: 96, h: 132 }; // one 48x66 CSS cell at 2x
  const cols = 6, rows = 6; // 3x3 tiles of 2x2 cells, so the blur never sees the canvas edge at the centre crop
  const draws = [];
  for (let cy = 0; cy < rows; cy++) {
    for (let cx = 0; cx < cols; cx++) {
      if ((cx + cy) % 2 !== 1) continue;
      const x0 = cx * cell.w, y0 = cy * cell.h;
      draws.push('-draw', `rectangle ${x0},${y0} ${x0 + cell.w - 1},${y0 + cell.h - 1}`);
    }
  }
  const out = join(assets, 'img/checker-blur.webp');
  execFileSync('magick', [
    '-size', `${cols * cell.w}x${rows * cell.h}`, `xc:${WINE2}`, '-fill', WINE, ...draws,
    '-gaussian-blur', '0x14',
    '-crop', '192x264+192+264', '+repage',
    '-strip', '-quality', '92', out,
  ]);
  console.log(`img/checker-blur.webp        baked 192x264 tile, ${size(out)} bytes`);
}
bakeChecker();
