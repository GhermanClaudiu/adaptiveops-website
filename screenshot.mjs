import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { readdirSync } from 'fs';
import { join } from 'path';

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const screenshotsDir = './screenshots';
await mkdir(screenshotsDir, { recursive: true });

// Auto-increment filename
const existing = readdirSync(screenshotsDir).filter(f => f.endsWith('.png'));
const nextNum = existing.length + 1;
const filename = label
  ? `screenshot-${nextNum}-${label}.png`
  : `screenshot-${nextNum}.png`;

// Scroll through the entire page to trigger IntersectionObserver animations
async function scrollToBottom(page) {
  await page.evaluate(async () => {
    const delay = (ms) => new Promise(r => setTimeout(r, ms));
    const scrollStep = window.innerHeight * 0.7;
    let scrollTop = 0;
    const maxScroll = document.body.scrollHeight;

    while (scrollTop < maxScroll) {
      scrollTop += scrollStep;
      window.scrollTo(0, scrollTop);
      await delay(200);
    }

    // Scroll back to top for the final screenshot
    window.scrollTo(0, 0);
    await delay(300);
  });
}

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

// Desktop viewport
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
await scrollToBottom(page);

// Wait for animations to complete
await new Promise(r => setTimeout(r, 2500));

// Full page screenshot
await page.screenshot({
  path: join(screenshotsDir, filename),
  fullPage: true,
});

console.log(`Screenshot saved: ${join(screenshotsDir, filename)}`);

// Mobile screenshot
await page.setViewport({ width: 390, height: 844 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
await scrollToBottom(page);

await new Promise(r => setTimeout(r, 2500));

const mobileFilename = label
  ? `screenshot-${nextNum}-${label}-mobile.png`
  : `screenshot-${nextNum}-mobile.png`;

await page.screenshot({
  path: join(screenshotsDir, mobileFilename),
  fullPage: true,
});

console.log(`Screenshot saved: ${join(screenshotsDir, mobileFilename)}`);

await browser.close();
