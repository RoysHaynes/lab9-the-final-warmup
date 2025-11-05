import { test, assert } from 'vitest';
import { TodoModel } from '../../src/model/todo-model.js';

class MockStorage {
    constructor() { this.data = {}; }
    save(key, value) { this.data[key] = value; }
    load(key, defaultValue) { return this.data[key] ?? defaultValue; }
    remove(key) { delete this.data[key]; }
    clear() { this.data = {}; }
}

test('toggleComplete – flips flag', () => {
    const model = new TodoModel(new MockStorage());
    model.addTodo('Task');
    const id = model['todos'][0].id;

    model.toggleComplete(id);
    assert.strictEqual(model['todos'][0].completed, true);

    model.toggleComplete(id);
    assert.strictEqual(model['todos'][0].completed, false);
});