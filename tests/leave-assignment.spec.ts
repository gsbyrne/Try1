import { expect, test } from '@playwright/test';
import { LeavePage } from './pages/LeavePage';
import { LoginPage } from './pages/LoginPage';

test('opens Assign Leave and fills the requested leave details', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('GazzaGazzaGazza123', 'Password123');
  await expect(page).toHaveURL(/\/dashboard\/index/);

  const leavePage = new LeavePage(page);
  await leavePage.openAssignLeave();
  await leavePage.fillLeaveDetails(
    'John Doe',
    'US - Personal',
    '2026-12-24',
    '2027-01-07',
  );

  await expect(page.getByRole('heading', { name: /assign leave|attribuer congés/i })).toBeVisible();
  await expect(leavePage.employeeName).toHaveValue('john Robert Doe');
  await expect(leavePage.leaveType).toContainText('US - Personal');
  await expect(leavePage.fromDate).toHaveValue('2026-12-24');
  await expect(leavePage.toDate).toHaveValue('2027-01-07');

  // Deliberately do not submit: this public demo employee shows a 0.00-day balance.
});
