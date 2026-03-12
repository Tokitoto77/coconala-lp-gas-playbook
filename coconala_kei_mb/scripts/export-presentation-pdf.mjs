#!/usr/bin/env node
/**
 * Export slide deck to PDF from a running web URL.
 *
 * Usage:
 *   node scripts/export-presentation-pdf.mjs \
 *     --url http://localhost:5173 \
 *     --out ./exports/kei-mb-proposal.pdf
 *
 * Notes:
 * - The page should support `?print=1` to render all slides in one view.
 * - Install playwright first:
 *     npm i -D playwright
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);

function getArg(name, fallback = "") {
  const i = args.indexOf(name);
  if (i === -1 || i + 1 >= args.length) return fallback;
  return args[i + 1];
}

const baseUrl = getArg("--url");
const outPath = getArg("--out", "./exports/presentation.pdf");

if (!baseUrl) {
  console.error("Missing required arg: --url");
  console.error(
    "Example: node scripts/export-presentation-pdf.mjs --url http://localhost:5173 --out ./exports/kei-mb-proposal.pdf",
  );
  process.exit(1);
}

const outDir = path.dirname(outPath);
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const printUrl = new URL(baseUrl);
printUrl.searchParams.set("print", "1");

async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch {
    const scriptDir = path.dirname(new URL(import.meta.url).pathname);
    const candidates = [
      path.resolve(process.cwd(), "node_modules/playwright/index.mjs"),
      path.resolve(process.cwd(), "presentation-viewer/node_modules/playwright/index.mjs"),
      path.resolve(scriptDir, "../presentation-viewer/node_modules/playwright/index.mjs"),
    ];

    for (const fallback of candidates) {
      if (fs.existsSync(fallback)) {
        return import(pathToFileURL(fallback).href);
      }
    }
    throw new Error(
      "Playwright not found. Install with `npm i -D playwright` in repo root or `presentation-viewer`.",
    );
  }
}

const { chromium } = await loadPlaywright();
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

try {
  console.log(`Opening: ${printUrl.toString()}`);
  await page.goto(printUrl.toString(), { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });

  // Give client-side rendering a moment to settle.
  await page.waitForTimeout(500);

  await page.pdf({
    path: outPath,
    printBackground: true,
    format: "A4",
    landscape: true,
    margin: {
      top: "8mm",
      right: "8mm",
      bottom: "8mm",
      left: "8mm",
    },
  });

  console.log(`Saved PDF: ${path.resolve(outPath)}`);
} finally {
  await browser.close();
}
