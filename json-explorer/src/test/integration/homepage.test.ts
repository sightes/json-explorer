import { test, expect } from '@playwright/test';

test.describe('JSON Explorer Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders header with title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'JSON Explorer' })).toBeVisible();
  });

  test('shows empty state initially', async ({ page }) => {
    await expect(page.getByText('Paste JSON to get started')).toBeVisible();
  });

  test('shows input panel with placeholder', async ({ page }) => {
    const textarea = page.getByPlaceholder('{ ... }');
    await expect(textarea).toBeVisible();
  });
});

test.describe('JSON Input', () => {
  test('parses valid JSON and displays tree', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('{ ... }').fill('{"name":"test","value":42}');

    await expect(page.getByText('name', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('"test"', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('value', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('42', { exact: true }).first()).toBeVisible();
  });

  test('shows error badge for invalid JSON', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('{ ... }').fill('{ invalid json }');

    await expect(page.getByText('Invalid JSON', { exact: true })).toBeVisible();
  });

  test('shows valid badge for correct JSON', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('{ ... }').fill('{"key":"value"}');

    await expect(page.getByText('Valid')).toBeVisible();
  });
});

test.describe('Tree Interaction', () => {
  test('expands and collapses nodes', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('{ ... }').fill('{"user":{"name":"John","age":30}}');

    await expect(page.getByText('user', { exact: true }).first()).toBeVisible();

    await page.getByText('user', { exact: true }).first().click();

    await expect(page.getByText('name', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('"John"', { exact: true }).first()).toBeVisible();
  });

  test('shows array indices', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('{ ... }').fill('["a","b","c"]');

    await expect(page.getByText('[0]')).toBeVisible();
    await expect(page.getByText('[1]')).toBeVisible();
    await expect(page.getByText('[2]')).toBeVisible();
  });
});

test.describe('Samples', () => {
  test('loads API Response sample', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Samples' }).click();
    await page.getByRole('button', { name: 'API Response' }).click();

    await expect(page.getByText('users', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('total', { exact: true }).first()).toBeVisible();
  });

  test('loads Config File sample', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Samples' }).click();
    await page.getByRole('button', { name: 'Config File' }).click();

    await expect(page.getByText('settings', { exact: true }).first()).toBeVisible();
  });

  test('loads Nested Data sample', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Samples' }).click();
    await page.getByRole('button', { name: 'Nested Data' }).click();

    await expect(page.getByText('organization', { exact: true }).first()).toBeVisible();
  });
});

test.describe('Search', () => {
  test('filters tree by key name', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('{ ... }').fill('{"username":"john","email":"john@example.com"}');

    await page.getByPlaceholder('Search keys & values...').fill('email');

    await expect(page.getByText('1 match')).toBeVisible();
    await expect(page.getByText('email', { exact: true }).first()).toBeVisible();
  });

  test('filters tree by value', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('{ ... }').fill('{"name":"Ana","email":"ana@example.com"}');

    await page.getByPlaceholder('Search keys & values...').fill('Ana');

    await expect(page.getByText('2 matches')).toBeVisible();
  });

  test('shows no matches message', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('{ ... }').fill('{"name":"John"}');

    await page.getByPlaceholder('Search keys & values...').fill('nonexistent');

    await expect(page.getByText('0 matches')).toBeVisible();
  });
});

test.describe('Copy to Clipboard', () => {
  test('copies value on click', async ({ page }) => {
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await page.getByPlaceholder('{ ... }').fill('{"key":"test-value"}');

    const copyButton = page.getByTitle('Copy value').first();
    await copyButton.click();

    await expect(page.getByText('Copied to clipboard')).toBeVisible();
  });
});