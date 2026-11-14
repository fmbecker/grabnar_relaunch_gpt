#!/usr/bin/env node
/** Capture reproducible responsive screenshots against the seeded CI site.
 * Usage: node scripts/screenshots.mjs [--base http://127.0.0.1:8080] [--out screenshots]
 */
import { execSync } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(import.meta.url);
function loadPlaywright() {
  try { return require("playwright"); }
  catch { return require(`${execSync("npm root -g").toString().trim()}/playwright`); }
}
const { chromium } = loadPlaywright();
const args = process.argv.slice(2);
const option = (key, fallback) => {
  const index = args.indexOf(key);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};
const base = option("--base", "http://127.0.0.1:8080").replace(/\/$/, "");
const out = option("--out", "screenshots");
const pages = [{ path: "/", name: "startseite" }, { path: "/gebaeudereinigung/", name: "gebaeudereinigung" }, { path: "/kontakt/", name: "kontakt" }];
const viewports = [{ width: 390, height: 844 }, { width: 1440, height: 900 }];
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  for (const pageSpec of pages) {
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport, deviceScaleFactor: 1, reducedMotion: "reduce" });
      try {
        const response = await page.goto(base + pageSpec.path, { waitUntil: "networkidle" });
        if (!response?.ok()) throw new Error(`Page ${pageSpec.path} returned ${response?.status() ?? "no response"}`);
        await page.evaluate(async () => {
          await document.fonts.ready;
          for (let y = 0; y < document.body.scrollHeight; y += 600) {
            window.scrollTo(0, y);
            await new Promise((resolve) => setTimeout(resolve, 50));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForLoadState("networkidle");
        const file = join(out, `${pageSpec.name}-${viewport.width}.png`);
        await page.screenshot({ path: file, fullPage: true, animations: "disabled" });
        console.log(`Saved ${file}`);
      } finally { await page.close(); }
    }
  }
} finally { await browser.close(); }
