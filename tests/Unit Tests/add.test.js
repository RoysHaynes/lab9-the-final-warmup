import { test, assert } from 'vitest';
import { TodoModel } from '../../src/model/todo-model.js';

class MockStorage {
    constructor() { this.data = {}; }
    save(key, value) { this.data[key] = value; }
    load(key, defaultValue) { return this.data[key] ?? defaultValue; }
    remove(key) { delete this.data[key]; }
    clear() { this.data = {}; }
}

test('addTodo – adds trimmed todo', () => {
    const model = new TodoModel(new MockStorage());
    model.addTodo('  Buy milk  ');
    const todos = model['todos'];

    assert.strictEqual(todos.length, 1);
    assert.strictEqual(todos[0].text, 'Buy milk');
    assert.strictEqual(todos[0].completed, false);
    assert.ok(typeof todos[0].id === 'number');
    assert.ok(typeof todos[0].createdAt === 'string');
});

test('addTodo – skips empty/whitespace', () => {
    const model = new TodoModel(new MockStorage());
    model.addTodo('');
    model.addTodo('   ');
    assert.strictEqual(model['todos'].length, 0);
});