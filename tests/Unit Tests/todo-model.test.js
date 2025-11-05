// tests/unit/todo-model.test.js
import { test } from 'node:test';
import assert from 'node:assert';
import { TodoModel } from '../../src/model/todo-model.js';

/* --------------------------------------------------------------
   Mock storage – tiny in‑memory replacement for localStorage
   -------------------------------------------------------------- */
class MockStorage {
    constructor() { this.data = {}; }
    save(key, value) { this.data[key] = value; }
    load(key, defaultValue) { return this.data[key] ?? defaultValue; }
    remove(key) { delete this.data[key]; }
    clear() { this.data = {}; }
}

/* --------------------------------------------------------------
   Helper – fresh model for each test
   -------------------------------------------------------------- */
const freshModel = () => new TodoModel(new MockStorage());

/* --------------------------------------------------------------
   UNIT TESTS
   -------------------------------------------------------------- */

test('addTodo – adds a todo with trimmed text', () => {
    const model = freshModel();
    model.addTodo('  Buy milk  ');

    // Access private array via the getter that the class already uses internally
    const todos = model['todos'];   // works because JS allows bracket access

    assert.strictEqual(todos.length, 1);
    assert.strictEqual(todos[0].text, 'Buy milk');
    assert.strictEqual(todos[0].completed, false);
    assert.strictEqual(todos[0].priority, 'medium');
    assert.ok(typeof todos[0].id === 'number');
    assert.ok(typeof todos[0].createdAt === 'string');
});

test('addTodo – skips empty/whitespace strings', () => {
    const model = freshModel();
    model.addTodo('');
    model.addTodo('   ');
    assert.strictEqual(model['todos'].length, 0);
});

test('toggleComplete – flips completed flag', () => {
    const model = freshModel();
    model.addTodo('Task');
    const id = model['todos'][0].id;

    model.toggleComplete(id);
    assert.strictEqual(model['todos'][0].completed, true);

    model.toggleComplete(id);
    assert.strictEqual(model['todos'][0].completed, false);
});

test('deleteTodo – removes the correct item', () => {
    const model = freshModel();
    model.addTodo('A');
    model.addTodo('B');
    const id = model['todos'][0].id;

    model.deleteTodo(id);
    const todos = model['todos'];
    assert.strictEqual(todos.length, 1);
    assert.strictEqual(todos[0].text, 'B');
});

test('updateTodo – changes text (non‑empty)', () => {
    const model = freshModel();
    model.addTodo('Old');
    const id = model['todos'][0].id;

    model.updateTodo(id, '  New  ');
    assert.strictEqual(model['todos'][0].text, 'New');
});

test('updateTodo – ignores empty/whitespace', () => {
    const model = freshModel();
    model.addTodo('Original');
    const id = model['todos'][0].id;
    const original = model['todos'][0].text;

    model.updateTodo(id, '');
    model.updateTodo(id, '   ');
    assert.strictEqual(model['todos'][0].text, original);
});

test('clearCompleted – removes only completed items', () => {
    const model = freshModel();
    model.addTodo('A');
    model.addTodo('B');
    model.toggleComplete(model['todos'][0].id); // A completed

    model.clearCompleted();
    const todos = model['todos'];
    assert.strictEqual(todos.length, 1);
    assert.strictEqual(todos[0].text, 'B');
});

test('clearAll – empties the list', () => {
    const model = freshModel();
    model.addTodo('One');
    model.addTodo('Two');

    model.clearAll();
    assert.strictEqual(model['todos'].length, 0);
});

test('activeCount / completedCount – correct tallies', () => {
    const model = freshModel();
    model.addTodo('A');
    model.addTodo('B');
    model.toggleComplete(model['todos'][0].id); // A completed

    assert.strictEqual(model.activeCount, 1);
    assert.strictEqual(model.completedCount, 1);
});

test('search – case‑insensitive partial match', () => {
    const model = freshModel();
    model.addTodo('Buy milk');
    model.addTodo('Walk dog');
    model.addTodo('Read book');

    const results = model.search('MIL');
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].text, 'Buy milk');
});

test('search – returns all when query empty', () => {
    const model = freshModel();
    model.addTodo('One');
    model.addTodo('Two');

    const results = model.search();
    assert.strictEqual(results.length, 2);
});

test('mutations persist to storage', () => {
    const storage = new MockStorage();
    const model = new TodoModel(storage);

    model.addTodo('Persist me');
    assert.deepStrictEqual(storage.data['items'], model['todos']);
    assert.strictEqual(storage.data['nextId'], 2);

    model.toggleComplete(model['todos'][0].id);
    assert.deepStrictEqual(storage.data['items'], model['todos']);
});