import { test, assert } from 'vitest';
import { TodoModel } from '../../src/model/todo-model.js';

class MockStorage {
    constructor() { this.data = {}; }
    save(key, value) { this.data[key] = value; }
    load(key, defaultValue) { return this.data[key] ?? defaultValue; }
    remove(key) { delete this.data[key]; }
    clear() { this.data = {}; }
}

test('clearCompleted – removes only completed', () => {
    const model = new TodoModel(new MockStorage());
    model.addTodo('A');
    model.addTodo('B');
    model.toggleComplete(model['todos'][0].id);

    model.clearCompleted();
    const todos = model['todos'];
    assert.strictEqual(todos.length, 1);
    assert.strictEqual(todos[0].text, 'B');
});

test('clearAll – empties list', () => {
    const model = new TodoModel(new MockStorage());
    model.addTodo('One');
    model.addTodo('Two');

    model.clearAll();
    assert.strictEqual(model['todos'].length, 0);
});