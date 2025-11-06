import { test, expect } from '@playwright/test';

test('add and complete todo', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Get the todo-app locator
    const todoApp = page.locator('todo-app');

    // Use locator with shadowRoot traversal
    const input = todoApp.locator('todo-form').locator('input[placeholder="What needs to be done?"]');
    const addButton = todoApp.locator('todo-form').locator('button[type="submit"]');

    // Fill input and click add
    await input.fill('Buy milk');
    await addButton.click();

    // Get the first todo item text and checkbox
    const todoItem = todoApp.locator('todo-list').locator('todo-item').first();
    const todoText = todoItem.locator('.todo-text');
    const todoCheckbox = todoItem.locator('input[type="checkbox"]');

    // Assertions
    await expect(todoText).toHaveText('Buy milk');

    // Mark as complete
    await todoCheckbox.check();
    await expect(todoCheckbox).toBeChecked();
});