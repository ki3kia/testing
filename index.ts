import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://client.sana-commerce.dev/');
});

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

