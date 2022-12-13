import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://client.sana-commerce.dev/');
});

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

test.describe('Actions with owner page', () => {
  test('Should allow me to add new owner', async ({ page }) => {
    await page.locator('.ownerTab').click()
    await page.locator('a[routerlink="/vets/add"]').click();

    await expect(page.locator('.addOwner')).toBeDisabled();

    await page.locator('#firstName').fill('Iryna');
    await page.locator('#lastName').fill('Hnatiuk');
    await page.locator('#type').fill('dentistry');
    await page.locator('.addOwner').click()
    
    await delay(2000)
  });

  test('Check if a new veterinarian has been added', async ({ page }) => {
    await page.locator('.vetTab').click()
    await page.locator('a[routerlink="/vets"]').click();

    await delay(3000);
    await expect(page.locator('tr:last-child .vetFullName')).toHaveText('Iryna Hnatiuk');
  });

  test('Check vet edit', async ({ page }) => {
    await page.locator('.vetTab').click()
    await page.locator('a[routerlink="/vets"]').click();
    await delay(3000);

    await page.locator('tr:last-child .vetFullName a').click();
    await delay(1000);

    await page.locator('.editVet').click();

    await page.locator('#firstName').selectText();
    await page.locator('#firstName').fill(' ');
    await expect(page.locator('.updateVet')).toBeDisabled();

    await page.locator('#firstName').fill('Iryna');
    await page.locator('#lastName').fill('Kondratiuk');

    await expect(page.locator('.updateVet')).toBeEnabled();
    await page.locator('.updateVet').click();
    await expect(page.locator('.vetFullName b')).toHaveText('Iryna Kondratiuk');
  });
});

test.describe('Actions with pet types page', () => {
  test('Should allow me to add new pet type', async ({ page }) => {
    await page.locator('a[routerlink="/pettypes"]').click();

    await page.locator('.addPet').click();
    await page.locator('#name').fill('frog');
    await page.locator('.form-group > .addType').click();

    await expect(page.locator('tr:last-child > td > input')).toHaveAttribute('ng-reflect-model', 'frog');
    await delay(1000);
  });

  test('Should allow me to edit vet', async ({ page }) => {
    await page.locator('.vetsTab').click()
    await page.locator('a[routerlink="/vets"]').click();

    await page.locator('tr:last-child .editVet').click();
    await page.locator('#firstName').selectText();
    await page.locator('#firstName').fill('edited');
    await page.locator('#lastName').selectText();
    await page.locator('#lastName').fill('vet');
    await page.locator('.saveVet').click();
    delay(2000);

    await expect(page.locator('tr:last-child .vetFullName')).toHaveText('edited vet');
  });
});
