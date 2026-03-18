import { chromium, devices } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const iPhone12 = devices['iPhone 12 Pro'];
  const context = await browser.newContext({
    ...iPhone12,
  });
  const page = await context.newPage();

  const pages = [
    { name: 'landing', url: 'http://localhost:5174/' },
    { name: 'login', url: 'http://localhost:5174/login' },
    { name: 'customer_home', url: 'http://localhost:5174/customer' },
    { name: 'rider_dashboard', url: 'http://localhost:5174/rider' },
    { name: 'admin_dashboard', url: 'http://localhost:5174/admin' },
  ];

  const screenshotDir = path.join(process.cwd(), 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  for (const p of pages) {
    try {
      console.log(`Capturing ${p.name}...`);
      await page.goto(p.url, { waitUntil: 'networkidle' });
      await page.screenshot({ path: path.join(screenshotDir, `${p.name}.png`), fullPage: true });
    } catch (err) {
      console.error(`Failed to capture ${p.name}:`, err);
    }
  }

  await browser.close();
})();
