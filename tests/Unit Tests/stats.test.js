import { test, assert } from 'vitest';
import { TodoModel } from '../../src/model/todo-model.js';

class MockStorage {
    constructor() { this.data = {}; }
    save(key, value) { this.data[key] = value; }
    load(key, defaultValue) { return this.data[key] ?? defaultValue; }
    remove(key) { delete this.data[key]; }
    clear() { this.data = {}; }
}

test('activeCount / completedCount – correct tallies', () => {
    const model = new TodoModel(new MockStorage());
    model.addTodo('A');
    model.addTodo('B');
    model.toggleComplete(model['todos'][0].id);

    assert.strictEqual(model.activeCount, 1);
    assert.strictEqual(model.completedCount, 1);
});