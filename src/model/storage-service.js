/**
 * TodoModel – Core business logic for the todo app.
 *
 * Uses Observer pattern to notify UI when data changes.
 * Saves everything to localStorage via StorageService.
 * @example
 * const storage = new StorageService();
 * const model = new TodoModel(storage);
 * model.subscribe(() => updateUI(model.todos));
 * model.addTodo('Finish lab', 'high');
 */
export class TodoModel {
  /**
   * @param {StorageService} storageService - Handles saving/loading
   */
  constructor(storageService) {
    /** @private */
    this.storage = storageService;
    this.todos = this.storage.load('items', []);
    this.listeners = [];
    this.nextId = this.storage.load('nextId', 1);
  }

  /**
   * Add a listener for UI updates.
   * @param {function} listener
   */
  subscribe(listener) {
    this.listeners.push(listener);
  }

  /**
   * Notify all listeners of a change.
   * @private
   */
  notify() {
    this.listeners.forEach(cb => cb());
  }

  /**
   * Add a new todo.
   * @param {string} text
   * @param {string} [priority='medium']
   */
  addTodo(text, priority = 'medium') {
    if (!text?.trim()) return;

    const todo = {
      id: this.nextId++,
      text: text.trim(),
      completed: false,
      priority,
      createdAt: new Date().toISOString()
    };

    this.todos.push(todo);
    this.save();
    this.notify();
  }

  /**
   * Toggle completion.
   * @param {number} id
   */
  toggleComplete(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.save();
      this.notify();
    }
  }

  /**
   * Delete a todo.
   * @param {number} id
   */
  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.save();
    this.notify();
  }

  /**
   * Update todo text.
   * @param {number} id
   * @param {string} newText
   */
  updateTodo(id, newText) {
    const todo = this.todos.find(t => t.id === id);
    if (todo && newText?.trim()) {
      todo.text = newText.trim();
      this.save();
      this.notify();
    }
  }

  /**
   * Remove all completed todos.
   */
  clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed);
    this.save();
    this.notify();
  }

  /**
   * Remove all todos.
   */
  clearAll() {
    this.todos = [];
    this.save();
    this.notify();
  }

  /**
   * Count active todos.
   * @returns {number}
   */
  get activeCount() {
    return this.todos.filter(t => !t.completed).length;
  }

  /**
   * Count completed todos.
   * @returns {number}
   */
  get completedCount() {
    return this.todos.filter(t => t.completed).length;
  }

  /**
   * Search todos by text.
   * @param {string} [query='']
   * @returns {Array<TodoItem>}
   */
  search(query = '') {
    if (!query) return this.todos;
    const q = query.toLowerCase();
    return this.todos.filter(t => t.text.toLowerCase().includes(q));
  }

  /**
   * Save current state.
   * @private
   */
  save() {
    this.storage.save('items', this.todos);
    this.storage.save('nextId', this.nextId);
  }
}

/**
 * A single todo item.
 * @typedef {object} TodoItem
 * @property {number} id
 * @property {string} text
 * @property {boolean} completed
 * @property {string} priority
 * @property {string} createdAt
 */