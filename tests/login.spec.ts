import { expect, test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

const validUsername = 'GazzaGazzaGazza123';
const validPassword = 'Password123';

test.describe('OrangeHRM login', () => {
  test('allows a user to log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUsername, validPassword);

    await expect(page).toHaveURL(/\/dashboard\/index/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('rejects an incorrect username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('NotARealUser', validPassword);

    await expect(page.getByText('Invalid credentials')).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('rejects an incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUsername, 'wrong-password');

    await expect(page.getByText('Invalid credentials')).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('requires both username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', '');

    await expect(page.getByText('Required', { exact: true })).toHaveCount(2);
    await expect(page).toHaveURL(/\/auth\/login/);
  });
});
