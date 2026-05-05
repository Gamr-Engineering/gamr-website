const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  console.log('Navigating to the editor page...');
  // Use domcontentloaded instead of load to avoid waiting for all resources
  await page.goto('http://127.0.0.1:8080/insights/submit', {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });
  console.log('Page DOM loaded.');

  // Wait for React to hydrate & the editor to appear
  console.log('Waiting for the editor to render...');
  try {
    await page.waitForSelector('.tiptap, [role="tablist"]', { state: 'visible', timeout: 20000 });
  } catch {
    console.log('Editor not found with .tiptap selector, trying broader search...');
    await page.waitForTimeout(5000);
  }

  // Scroll editor into view
  await page.evaluate(() => {
    const el = document.querySelector('.tiptap') || document.querySelector('[role="tablist"]');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await page.waitForTimeout(1500);

  console.log('1/5 - Taking screenshot of Home tab...');
  await page.screenshot({ path: path.join(__dirname, 'test-results', '1-editor-home-tab.png'), fullPage: false });

  // Click Insert tab
  console.log('2/5 - Clicking Insert tab...');
  try {
    await page.click('button[role="tab"]:has-text("Insert")', { timeout: 5000 });
    await page.waitForTimeout(1000);
  } catch { console.log('Insert tab click failed, continuing...'); }
  await page.screenshot({ path: path.join(__dirname, 'test-results', '2-editor-insert-tab.png'), fullPage: false });

  // Click Design tab
  console.log('3/5 - Clicking Design tab...');
  try {
    await page.click('button[role="tab"]:has-text("Design")', { timeout: 5000 });
    await page.waitForTimeout(1000);
  } catch { console.log('Design tab click failed, continuing...'); }
  await page.screenshot({ path: path.join(__dirname, 'test-results', '3-editor-design-tab.png'), fullPage: false });

  // Click Layout tab
  console.log('4/5 - Clicking Layout tab...');
  try {
    await page.click('button[role="tab"]:has-text("Layout")', { timeout: 5000 });
    await page.waitForTimeout(1000);
  } catch { console.log('Layout tab click failed, continuing...'); }
  await page.screenshot({ path: path.join(__dirname, 'test-results', '4-editor-layout-tab.png'), fullPage: false });

  // Go back to Home and type
  console.log('5/5 - Typing text in editor...');
  try {
    await page.click('button[role="tab"]:has-text("Home")', { timeout: 5000 });
    await page.waitForTimeout(500);
    await page.click('.tiptap', { timeout: 5000 });
    await page.keyboard.type('Hello World from Antigravity! This is an automated E2E test.');
    await page.waitForTimeout(500);
  } catch { console.log('Text entry failed, continuing...'); }
  await page.screenshot({ path: path.join(__dirname, 'test-results', '5-editor-text-entered.png'), fullPage: false });

  // Full page screenshot too
  await page.screenshot({ path: path.join(__dirname, 'test-results', '6-full-page.png'), fullPage: true });

  console.log('\n✅ Test complete! Screenshots saved to test-results/');
  await browser.close();
})();
