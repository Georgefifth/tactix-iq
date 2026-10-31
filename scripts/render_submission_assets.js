import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });

  // 1. Render Thumbnail (1200x800, 3:2 ratio)
  console.log('Rendering submission/assets/thumbnail.png ...');
  await page.goto('file://' + path.resolve('submission/assets/thumbnail.html'));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'submission/assets/thumbnail.png' });

  // 2. Render Gallery Images at 1200x800 (3:2 ratio)
  console.log('Connecting to https://aqx-sports.vercel.app for gallery captures (1200x800)...');
  await page.goto('https://aqx-sports.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForSelector('header');

  // Gallery 1: Pitch Grid
  console.log('Rendering gallery-01-pitch-grid.png ...');
  await page.screenshot({ path: 'submission/assets/gallery-01-pitch-grid.png' });

  // Gallery 2: Zone Inspector (Click Zone 7)
  console.log('Rendering gallery-02-zone-inspector.png ...');
  await page.locator('svg g[class*="cursor-pointer"]').nth(6).click({ force: true });
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'submission/assets/gallery-02-zone-inspector.png' });

  // Gallery 3: Press Matrix
  console.log('Rendering gallery-03-press-matrix.png ...');
  await page.getByRole('button', { name: 'Press Resistance' }).click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'submission/assets/gallery-03-press-matrix.png' });

  // Gallery 4: Matchup Clash
  console.log('Rendering gallery-04-matchup-clash.png ...');
  await page.getByRole('button', { name: 'Matchup Clash' }).click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'submission/assets/gallery-04-matchup-clash.png' });

  // Gallery 5: Opposition Brief
  console.log('Rendering gallery-05-opposition-brief.png ...');
  await page.getByRole('button', { name: 'Opposition Brief' }).click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'submission/assets/gallery-05-opposition-brief.png' });

  // Gallery 6: Validation Benchmarks
  console.log('Rendering gallery-06-validation-benchmarks.png ...');
  await page.goto('file://' + path.resolve('demo/slides.html'));
  await page.locator('#slide-3-validation').screenshot({ path: 'submission/assets/gallery-06-validation-benchmarks.png' });

  await browser.close();

  // Copy demo video
  console.log('Copying demo video to submission/assets/demo.mp4 ...');
  fs.copyFileSync('evidence/stage-4-demo/demo.mp4', 'submission/assets/demo.mp4');

  console.log('All submission assets generated successfully!');
}

main().catch(err => {
  console.error('Error generating submission assets:', err);
  process.exit(1);
});
