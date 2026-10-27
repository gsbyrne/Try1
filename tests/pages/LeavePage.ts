import { expect, Locator, Page } from '@playwright/test';

export class LeavePage {
  readonly employeeName: Locator;
  readonly leaveType: Locator;
  readonly fromDate: Locator;
  readonly toDate: Locator;
  readonly assignButton: Locator;

  constructor(private readonly page: Page) {
    this.employeeName = page.getByPlaceholder('Type for hints...');
    this.leaveType = page.locator('.oxd-select-text').first();
    this.fromDate = page.locator('input[placeholder="yyyy-mm-dd"]').nth(0);
    this.toDate = page.locator('input[placeholder="yyyy-mm-dd"]').nth(1);
    this.assignButton = page.getByRole('button', { name: /assign|attribuer/i });
  }

  async openAssignLeave(): Promise<void> {
    await this.page.locator('a[href="/web/index.php/leave/viewLeaveModule"]').click();
    await expect(this.page).toHaveURL(/\/leave\/viewLeaveList/);
    await this.page.getByRole('link', { name: /assign leave|attribuer congés/i }).click();
    await expect(this.page).toHaveURL(/\/leave\/assignLeave/);
  }

  async fillLeaveDetails(
    employeeName: string,
    leaveType: string,
    fromDate: string,
    toDate: string,
  ): Promise<void> {
    await this.employeeName.fill(employeeName);
    await this.page.getByRole('option', { name: /john Robert Doe/i }).click();

    await this.leaveType.click();
    await this.page.getByRole('option', { name: leaveType, exact: true }).click();

    await expect(this.fromDate).toBeVisible();
    await expect(this.toDate).toBeVisible();
    await this.fromDate.fill(fromDate);
    await expect(this.fromDate).toHaveValue(fromDate);
    await this.toDate.fill(toDate);
  }
}
