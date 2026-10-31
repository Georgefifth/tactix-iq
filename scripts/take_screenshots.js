import { chromium } from '@playwright/test';
import { spawn } from 'child_process';

async function main() {
  const PORT = 4188;
  console.log(`Starting preview server on port ${PORT}...`);
  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'pipe' });

  server.stdout.on('data', (data) => {
    console.log(`[server] ${data}`);
  });
  server.stderr.on('data', (data) => {
    console.error(`[server err] ${data}`);
  });

  // Wait 2s for server
  await new Promise(r => setTimeout(r, 2000));

  console.log('Launching browser...');
  const browser = await chromium.launch();

  try {
    // 1. Desktop 1440x900
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1
    });
    const desktopPage = await desktopContext.newPage();

    console.log(`Navigating to http://localhost:${PORT} ...`);
    await desktopPage.goto(`http://localhost:${PORT}`);
    await desktopPage.waitForSelector('header');

    // Screenshot Pitch Command
    console.log('Capturing desktop-pitch-command.png...');
    await desktopPage.screenshot({ path: 'evidence/stage-2-build/frontend/desktop-pitch-command.png' });

    // Click Zone 7 to inspect
    const zones = desktopPage.locator('svg g[class*="cursor-pointer"]');
    if (await zones.count() > 5) {
      await zones.nth(6).click();
      await desktopPage.waitForTimeout(300);
      await desktopPage.screenshot({ path: 'evidence/stage-2-build/frontend/desktop-zone-inspected.png' });
    }

    // Switch to Press Resistance Matrix
    console.log('Capturing desktop-press-matrix.png...');
    await desktopPage.getByRole('button', { name: 'Press Resistance' }).click();
    await desktopPage.waitForTimeout(400);
    await desktopPage.screenshot({ path: 'evidence/stage-2-build/frontend/desktop-press-matrix.png' });

    // Switch to Matchup Clash
    console.log('Capturing desktop-matchup.png...');
    await desktopPage.getByRole('button', { name: 'Matchup Clash' }).click();
    await desktopPage.waitForTimeout(400);
    await desktopPage.screenshot({ path: 'evidence/stage-2-build/frontend/desktop-matchup.png' });

    // Switch to Opposition Brief
    console.log('Capturing desktop-scouting-card.png...');
    await desktopPage.getByRole('button', { name: 'Opposition Brief' }).click();
    await desktopPage.waitForTimeout(400);
    await desktopPage.screenshot({ path: 'evidence/stage-2-build/frontend/desktop-scouting-card.png' });

    // Switch back to Pitch Command
    await desktopPage.getByRole('button', { name: 'Pitch Command' }).click();
    await desktopPage.waitForTimeout(200);

    // Toggle Mock Dataset
    console.log('Capturing desktop-mock-mode.png...');
    await desktopPage.getByRole('button', { name: /Live Data/i }).click();
    await desktopPage.waitForTimeout(400);
    await desktopPage.screenshot({ path: 'evidence/stage-2-build/frontend/desktop-mock-mode.png' });

    // Test Error State
    console.log('Capturing desktop-error-state.png...');
    await desktopPage.getByRole('button', { name: 'Test Error' }).click();
    await desktopPage.waitForTimeout(300);
    await desktopPage.screenshot({ path: 'evidence/stage-2-build/frontend/desktop-error-state.png' });

    // 2. Mobile 390x844
    console.log('Switching to mobile 390x844 viewport...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`http://localhost:${PORT}`);
    await mobilePage.waitForSelector('header');

    console.log('Capturing mobile-390-pitch-command.png...');
    await mobilePage.screenshot({ path: 'evidence/stage-2-build/frontend/mobile-390-pitch-command.png' });

    console.log('Capturing mobile-390-press-matrix.png...');
    await mobilePage.getByRole('button', { name: 'Press Resistance' }).click();
    await mobilePage.waitForTimeout(400);
    await mobilePage.screenshot({ path: 'evidence/stage-2-build/frontend/mobile-390-press-matrix.png' });

    console.log('Capturing mobile-390-scouting-card.png...');
    await mobilePage.getByRole('button', { name: 'Opposition Brief' }).click();
    await mobilePage.waitForTimeout(400);
    await mobilePage.screenshot({ path: 'evidence/stage-2-build/frontend/mobile-390-scouting-card.png' });

    console.log('All screenshots captured successfully!');
  } finally {
    await browser.close();
    server.kill();
  }
}

main().catch(err => {
  console.error('Error in screenshot runner:', err);
  process.exit(1);
});
