import { test, assert } from 'vitest';
import { TodoModel } from '../../src/model/todo-model.js';

class MockStorage {
    constructor() { this.data = {}; }
    save(key, value) { this.data[key] = value; }
    load(key, defaultValue) { return this.data[key] ?? defaultValue; }
    remove(key) { delete this.data[key]; }
    clear() { this.data = {}; }
}

test('deleteTodo – removes correct item', () => {
    const model = new TodoModel(new MockStorage());
    model.addTodo('A');
    model.addTodo('B');
    const id = model['todos'][0].id;

    model.deleteTodo(id);
    const todos = model['todos'];
    assert.strictEqual(todos.length, 1);
    assert.strictEqual(todos[0].text, 'B');
});