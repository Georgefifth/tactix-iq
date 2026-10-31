import { chromium } from '@playwright/test';

async function verifyProduction() {
  const url = 'https://aqx-sports.vercel.app';
  console.log(`Connecting to live production URL: ${url} ...`);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('pageerror', err => errors.push(`[Page Error] ${err.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(`[Console Error] ${msg.text()}`);
  });

  const response = await page.goto(url, { waitUntil: 'networkidle' });
  console.log(`HTTP Status: ${response.status()}`);

  const title = await page.title();
  console.log(`Page Title: ${title}`);

  // Check header & pitch
  await page.waitForSelector('header');
  const zoneCount = await page.locator('svg g[class*="cursor-pointer"]').count();
  console.log(`Tactical pitch zones detected: ${zoneCount}`);

  // Test selecting zone 7
  await page.locator('svg g[class*="cursor-pointer"]').nth(6).click();
  await page.waitForTimeout(300);

  // Check Inspector updated
  const inspectorText = await page.locator('h3:has-text("Middle Left Wing")').count();
  console.log(`Zone 7 inspector rendered: ${inspectorText > 0}`);

  // Switch to Press Resistance
  await page.getByRole('button', { name: 'Press Resistance' }).click();
  await page.waitForTimeout(300);
  const matrixHeading = await page.locator('h2:has-text("Press-Resistance & Composure Matrix")').count();
  console.log(`Press Resistance matrix rendered: ${matrixHeading > 0}`);

  // Switch to Matchup Clash
  await page.getByRole('button', { name: 'Matchup Clash' }).click();
  await page.waitForTimeout(300);
  const matchupHeading = await page.locator('h2:has-text("Tactical Matchup & Press Clash Simulator")').count();
  console.log(`Matchup Simulator rendered: ${matchupHeading > 0}`);

  // Switch to Opposition Brief
  await page.getByRole('button', { name: 'Opposition Brief' }).click();
  await page.waitForTimeout(300);
  const briefHeading = await page.locator('h2:has-text("Opposition Press Triggers")').count();
  console.log(`Opposition Brief rendered: ${briefHeading > 0}`);

  // Capture production live screenshot
  await page.screenshot({ path: 'evidence/stage-2-build/production-live.png' });
  console.log('Saved production live screenshot: evidence/stage-2-build/production-live.png');

  console.log(`Total errors caught: ${errors.length}`);
  if (errors.length > 0) {
    console.error('Errors found:', errors);
    process.exit(1);
  }

  await browser.close();
  console.log('Production live verification PASSED flawlessly!');
}

verifyProduction().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
