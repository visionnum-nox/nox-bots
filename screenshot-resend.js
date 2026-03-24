const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://resend.com/home', { waitUntil: 'networkidle' });
  
  // Full page screenshot
  await page.screenshot({ path: 'resend-full.png', fullPage: true });
  console.log('Full page done');

  // Individual viewport screenshots while scrolling
  const height = await page.evaluate(() => document.body.scrollHeight);
  const step = 900;
  let i = 0;
  for (let y = 0; y < height && i < 8; y += step) {
    await page.evaluate(scrollY => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `resend-${i+1}.png` });
    console.log(`Screenshot ${i+1} at y=${y}`);
    i++;
  }

  await browser.close();
  console.log('Done!');
})();
