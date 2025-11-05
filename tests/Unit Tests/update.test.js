import { test, assert } from 'vitest';
import { TodoModel } from '../../src/model/todo-model.js';

class MockStorage {
    constructor() { this.data = {}; }
    save(key, value) { this.data[key] = value; }
    load(key, defaultValue) { return this.data[key] ?? defaultValue; }
    remove(key) { delete this.data[key]; }
    clear() { this.data = {}; }
}

test('updateTodo – changes text (non‑empty)', () => {
    const model = new TodoModel(new MockStorage());
    model.addTodo('Old');
    const id = model['todos'][0].id;

    model.updateTodo(id, '  New  ');
    assert.strictEqual(model['todos'][0].text, 'New');
});

test('updateTodo – ignores empty/whitespace', () => {
    const model = new TodoModel(new MockStorage());
    model.addTodo('Original');
    const id = model['todos'][0].id;
    const original = model['todos'][0].text;

    model.updateTodo(id, '');
    model.updateTodo(id, '   ');
    assert.strictEqual(model['todos'][0].text, original);
});