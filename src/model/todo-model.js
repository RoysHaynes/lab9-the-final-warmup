/**
 * TodoModel – Core business logic for the task management application.
 *
 * This class implements the **Observer pattern** to enable reactive UI updates.
 * All state mutations are persisted to `localStorage` via the injected
 * {@link StorageService}. The model maintains:
 * - An in-memory array of todo items
 * - An auto-incrementing ID counter
 * - A list of subscriber callbacks
 * @example
 * const storage = new StorageService();
 * const model = new TodoModel(storage);
 *
 * // Register UI components for updates
 * model.subscribe(() => renderTodos(model.todos));
 *
 * // Create a new task with priority
 * model.addTodo('Complete Lab 9', 'high');
 */
export class TodoModel {
  /**
   * Initializes the model and loads persisted state.
   * @param {StorageService} storageService - Persistence abstraction.
   */
  constructor(storageService) {
    /**
     * Reference to the storage service.
     * @private
     */
    this.storage = storageService;

    /**
     * Current list of todo items.
     * @type {Array<TodoItem>}
     * @private
     */
    this.todos = this.storage.load('items', []);

    /**
     * List of functions to call on state change.
     * @type {Array<function(): void>}
     * @private
     */
    this.listeners = [];

    /**
     * Next available ID for new todos.
     * @type {number}
     * @private
     */
    this.nextId = this.storage.load('nextId', 1);
  }

  /**
   * Registers a callback to be invoked after any state mutation.
   * @param {function(): void} listener - Function to call on update.
   */
  subscribe(listener) {
    this.listeners.push(listener);
  }

  /**
   * Notifies all registered subscribers of a state change.
   * @private
   */
  notify() {
    this.listeners.forEach(callback => callback());
  }

  /**
   * Creates and appends a new todo item.
   * @param {string} text - The task description.
   * @param {('low'|'medium'|'high')} [priority] - Task priority level.
   * @returns {void}
   */
  addTodo(text, priority = 'medium') {
    if (!text || text.trim() === '') return;

    const todo = {
      id: this.nextId++,
      text: text.trim(),
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };

    this.todos.push(todo);
    this.save();
    this.notify();
  }

  /**
   * Toggles the completion status of a todo by ID.
   * @param {number} id - The unique identifier of the todo.
   * @returns {void}
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
   * Removes a todo item by ID.
   * @param {number} id - The ID of the todo to delete.
   * @returns {void}
   */
  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.save();
    this.notify();
  }

  /**
   * Updates the text of an existing todo.
   * @param {number} id - The ID of the todo to update.
   * @param {string} newText - The new task description.
   * @returns {void}
   */
  updateTodo(id, newText) {
    const todo = this.todos.find(t => t.id === id);
    if (todo && newText && newText.trim() !== '') {
      todo.text = newText.trim();
      this.save();
      this.notify();
    }
  }

  /**
   * Removes all completed todos from the list.
   * @returns {void}
   */
  clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed);
    this.save();
    this.notify();
  }

  /**
   * Deletes all todos regardless of completion status.
   * @returns {void}
   */
  clearAll() {
    this.todos = [];
    this.save();
    this.notify();
  }

  /**
   * Returns the count of incomplete (active) todos.
   * @returns {number} Number of active tasks.
   */
  get activeCount() {
    return this.todos.filter(t => !t.completed).length;
  }

  /**
   * Returns the count of completed todos.
   * @returns {number} Number of completed tasks.
   */
  get completedCount() {
    return this.todos.filter(t => t.completed).length;
  }

  /**
   * Filters todos by a search query (case-insensitive).
   * @param {string} [query] - Text to search within todo descriptions.
   * @returns {Array<TodoItem>} Array of matching todo items.
   */
  search(query = '') {
    if (!query) return this.todos;
    const term = query.toLowerCase();
    return this.todos.filter(t => t.text.toLowerCase().includes(term));
  }

  /**
   * Persists the current state to storage.
   *
   * Called internally after every mutation.
   * @private
   */
  save() {
    this.storage.save('items', this.todos);
    this.storage.save('nextId', this.nextId);
  }
}

/**
 * Represents a single todo item in the application.
 * @typedef {object} TodoItem
 * @property {number} id - Unique identifier.
 * @property {string} text - Task description.
 * @property {boolean} completed - Completion status.
 * @property {('low'|'medium'|'high')} priority - Task urgency level.
 * @property {string} createdAt - ISO 8601 timestamp of creation.
 */
