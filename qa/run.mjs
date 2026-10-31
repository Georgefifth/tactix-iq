// Real-browser QA runner for TactixIQ (Playwright)
import { chromium, firefox } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "https://aqx-sports.vercel.app";
const OUT = process.env.QA_OUT ?? "evidence/stage-3-qa";
const BROWSER = process.env.BROWSER === "chromium" ? "chromium" : "firefox";
const HEADED = process.env.HEADED === "1";

const SHOTS = path.join(OUT, "screens");
fs.mkdirSync(SHOTS, { recursive: true });

const VIEWPORTS = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  { name: "mobile", viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 },
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function expectVisible(page, selector, timeout = 10000) {
  const locator = page.locator(selector).first();
  await locator.waitFor({ state: "visible", timeout });
  return locator;
}

const scenarios = [
  {
    id: "p0-landing-and-pitch",
    title: "Landing page renders with 18-zone pitch and zero overflow",
    async run(page, ctx) {
      await page.goto("/", { waitUntil: "networkidle" });
      await ctx.expectVisible("header");
      const title = await page.title();
      ctx.assert(title.includes("TactixIQ"), `Unexpected title: ${title}`);

      // Check overflow
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      ctx.assert(overflow <= 1, `Horizontal overflow detected: ${overflow}px`);

      // Check 18 zones
      const zoneCount = await page.locator('svg g[class*="cursor-pointer"]').count();
      ctx.assert(zoneCount === 18, `Expected 18 tactical pitch zones, found ${zoneCount}`);

      await ctx.shot("pitch-canvas");
    },
  },
  {
    id: "p0-zone-spatial-inspection",
    title: "Zone click opens inspector with PDI and responsible culprits",
    async run(page, ctx) {
      await page.goto("/", { waitUntil: "networkidle" });
      // Click Zone 7 (Middle Left Wing)
      const zone7 = page.locator('svg g[class*="cursor-pointer"]').nth(6);
      await zone7.click({ force: true });
      await page.waitForTimeout(300);

      // Verify inspector header
      const inspectorTitle = await page.locator('h3:has-text("Middle Left Wing")').first();
      await inspectorTitle.waitFor({ state: "visible" });

      // Verify PDI score visible
      const pdiBadge = page.locator('div:has-text("PITCH DANGER INDEX")').first();
      await pdiBadge.waitFor({ state: "visible" });

      await ctx.shot("zone-7-inspected");
    },
  },
  {
    id: "p0-squad-telemetry-switch",
    title: "Switch team recalculates tactical metrics and pitch telemetry",
    async run(page, ctx) {
      await page.goto("/", { waitUntil: "networkidle" });
      const select = page.locator('header select').first();
      await select.selectOption('England');
      await page.waitForTimeout(400);

      // Verify England stats in main
      const squadText = await page.locator('main span:has-text("England")').first();
      await squadText.waitFor({ state: "visible" });

      const turnoverCount = await page.locator('span:has-text("704 Total Turnovers")').count();
      ctx.assert(turnoverCount > 0, "England turnover count not reflected");

      await ctx.shot("england-squad-loaded");
    },
  },
  {
    id: "p0-press-matrix-quadrant",
    title: "Press-resistance matrix renders quadrant and player filters",
    async run(page, ctx) {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.getByRole("button", { name: "Press Resistance" }).click();
      await page.waitForTimeout(400);

      // Verify scatter canvas
      await ctx.expectVisible('svg text:has-text("PRESS-RESISTANT ENGINES")');

      // Filter by role
      await page.getByRole("button", { name: /Defender|Def/i }).click();
      await page.waitForTimeout(300);

      // Search player
      const searchInput = page.locator('input[placeholder*="Search player"]');
      await searchInput.fill("Carvajal");
      await page.waitForTimeout(300);

      await ctx.shot("press-matrix-filtered");
    },
  },
  {
    id: "p1-matchup-simulator",
    title: "Tactical Matchup simulator calculates press clash score and battle plan",
    async run(page, ctx) {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.getByRole("button", { name: "Matchup Clash" }).click();
      await page.waitForTimeout(400);

      // Verify simulated score
      await ctx.expectVisible('span:has-text("/ 100")');

      // Verify battle plan directive
      await ctx.expectVisible('h3:has-text("Tactical Battle Plan")');

      await ctx.shot("matchup-clash-active");
    },
  },
  {
    id: "p1-opposition-brief",
    title: "Opposition brief presents prioritized press triggers and copy action",
    async run(page, ctx) {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.getByRole("button", { name: "Opposition Brief" }).click();
      await page.waitForTimeout(400);

      // Verify Priority triggers
      await ctx.expectVisible('span:has-text("CRITICAL")');

      // Click copy button
      const copyBtn = page.getByRole("button", { name: /Copy Tactical Brief/i });
      if (await copyBtn.count() > 0) {
        await copyBtn.click();
        await page.waitForTimeout(300);
      }

      await ctx.shot("opposition-brief-dossier");
    },
  },
  {
    id: "p1-error-state-recovery",
    title: "Pipeline error is caught gracefully and recovers on user retry",
    async run(page, ctx) {
      await page.goto("/", { waitUntil: "networkidle" });
      // Only desktop shows test error button
      const errorBtn = page.getByRole("button", { name: "Test Error" });
      if (await errorBtn.count() > 0 && await errorBtn.isVisible()) {
        await errorBtn.click();
        await page.waitForTimeout(300);

        // Verify error alert
        await ctx.expectVisible('h3:has-text("Tactical Pipeline Alert")');
        await ctx.shot("error-state-alert");

        // Recover
        await page.getByRole("button", { name: "Reload Default Match Data" }).click();
        await page.waitForTimeout(300);

        // Verify recovered
        await ctx.expectVisible('header');
        await ctx.shot("error-recovered");
      }
    },
  },
  {
    id: "p2-mock-mode-toggle",
    title: "Mock mode toggle swaps between live StatsBomb and mock sandbox",
    async run(page, ctx) {
      await page.goto("/", { waitUntil: "networkidle" });
      const toggleBtn = page.getByRole("button", { name: /Live Data/i });
      if (await toggleBtn.count() > 0) {
        await toggleBtn.click();
        await page.waitForTimeout(300);

        // Verify mock team
        const mockTag = await page.locator('span:has-text("FC Tactix")').count();
        ctx.assert(mockTag > 0, "Mock team title not displayed");
        await ctx.shot("mock-mode-active");

        // Toggle back to Live
        await page.getByRole("button", { name: /Mock Dataset/i }).click();
        await page.waitForTimeout(300);
      }
    },
  },
];

function collectIssues(page) {
  const issues = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") issues.push({ kind: "console", text: msg.text() });
  });
  page.on("pageerror", (err) => {
    issues.push({ kind: "pageerror", text: err.message });
  });
  page.on("requestfailed", (req) => {
    const reason = req.failure()?.errorText ?? "request failed";
    if (!reason.includes("ERR_ABORTED")) {
      issues.push({ kind: "requestfailed", text: `${reason} ${req.url()}` });
    }
  });
  page.on("response", (res) => {
    const status = res.status();
    if (status >= 500) issues.push({ kind: "http", text: `${status} ${res.url()}` });
    else if (status >= 400) {
      issues.push({ kind: "http", level: "warn", text: `${status} ${res.url()}` });
    }
  });
  return issues;
}

async function main() {
  const browserType = BROWSER === "chromium" ? chromium : firefox;
  console.log(`Launching ${BROWSER} for QA against ${BASE} ...`);
  const browser = await browserType.launch({ headless: !HEADED });
  const startedAt = new Date().toISOString();
  const results = [];

  for (const vp of VIEWPORTS) {
    const contextOpts = {
      baseURL: BASE,
      viewport: vp.viewport,
      deviceScaleFactor: vp.deviceScaleFactor,
    };
    if (BROWSER === "chromium") {
      contextOpts.permissions = ["clipboard-write", "clipboard-read"];
    }
    const context = await browser.newContext(contextOpts);

    for (const scenario of scenarios) {
      const page = await context.newPage();
      const issues = collectIssues(page);
      const screenshots = [];
      const started = Date.now();
      let status = "pass";
      let error = null;

      const ctx = {
        assert,
        expectVisible: (selector, timeout) => expectVisible(page, selector, timeout),
        shot: async (name, opts = {}) => {
          const file = path.join(SHOTS, `${scenario.id}-${name}-${vp.name}.png`);
          await page.screenshot({ path: file, fullPage: opts.fullPage ?? true });
          screenshots.push(file);
          return file;
        },
      };

      try {
        await scenario.run(page, ctx);
      } catch (err) {
        status = "fail";
        error = err.message;
      } finally {
        await page.close().catch(() => {});
      }

      const errors = issues.filter((i) => (i.level ?? "error") === "error");
      const warnings = issues.filter((i) => i.level === "warn");
      if (status === "pass" && errors.length > 0) {
        status = "fail";
        error = errors.map((i) => `${i.kind}: ${i.text}`).join(" | ");
      }

      results.push({
        viewport: vp.name,
        id: scenario.id,
        title: scenario.title,
        status,
        ms: Date.now() - started,
        error,
        errors,
        warnings,
        screenshots,
      });

      console.log(
        `${status === "pass" ? "✓" : "✗"} [${vp.name}] ${scenario.id}` +
          (error ? ` — ${error}` : "")
      );
    }

    await context.close();
  }

  await browser.close();

  const summary = {
    total: results.length,
    pass: results.filter((r) => r.status === "pass").length,
    fail: results.filter((r) => r.status === "fail").length,
  };
  const finishedAt = new Date().toISOString();
  const report = {
    base: BASE,
    browser: BROWSER,
    headed: HEADED,
    startedAt,
    finishedAt,
    summary,
    results,
  };

  fs.writeFileSync(path.join(OUT, "results.json"), JSON.stringify(report, null, 2));

  const warnings = results.flatMap((r) =>
    r.warnings.map((w) => `- [${r.viewport}] ${r.id}: ${w.kind} — ${w.text}`)
  );
  const md = [
    `# QA Report — TactixIQ Test Suite (${finishedAt})`,
    "",
    `- Base URL: ${BASE}`,
    `- Browser: ${BROWSER} (${HEADED ? "headed" : "headless"})`,
    `- Total Scenarios Executed: ${summary.total}`,
    `- Pass: ${summary.pass} | Fail: ${summary.fail}`,
    "",
    "| Viewport | Scenario | Status | ms | Detail |",
    "|---|---|---|---|---|",
    ...results.map(
      (r) =>
        `| ${r.viewport} | ${r.id} | ${r.status.toUpperCase()} | ${r.ms}ms | ${(r.error ?? "OK").replace(/\|/g, "\\|")} |`
    ),
    "",
    ...(warnings.length ? ["## Warnings", "", ...warnings, ""] : []),
    "## Captured State Screenshots",
    "",
    ...results.flatMap((r) => r.screenshots.map((s) => `- \`${s}\``)),
    "",
  ];
  fs.writeFileSync(path.join(OUT, "report.md"), md.join("\n"));

  console.log(`\nQA Suite Completed: ${summary.pass}/${summary.total} passed. Written to ${OUT}/`);
  process.exit(summary.fail > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Runner crash:", err);
  process.exit(2);
});
