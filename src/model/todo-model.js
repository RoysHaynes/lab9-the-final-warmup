/**
 * @class TodoModel
 * @description
 * Manages the todo list data and encapsulates the business logic of the application.
 * Provides methods for adding, updating, deleting, and toggling todos.
 *
 * Implements the **Observer pattern** — other components (like the view)
 * can subscribe to changes and reactively update when the model changes.
 */
export class TodoModel {
  /**
   * Creates a new TodoModel instance.
   * @param {import('./storage-service.js').StorageService} storageService - An instance of the StorageService used for persistence.
   */
  constructor(storageService) {
    /** @type {import('./storage-service.js').StorageService} */
    this.storage = storageService;

    /** @type {Array<{id: number, text: string, completed: boolean, createdAt: string}>} */
    this.todos = this.storage.load('items', []);

    /** @type {Array<Function>} */
    this.listeners = [];

    /** @type {number} */
    this.nextId = this.storage.load('nextId', 1);
  }

  /**
   * Subscribes a callback function to be notified whenever the model changes.
   * Useful for linking the model with reactive UI updates.
   * @param {Function} listener - A callback function that is called on every model update.
   * @example
   * model.subscribe(() => console.log('Todos changed!'));
   */
  subscribe(listener) {
    this.listeners.push(listener);
  }

  /**
   * Notifies all registered listeners of a change in the model.
   * Called automatically after any mutation (add, update, delete, etc.).
   * @private
   */
  notify() {
    this.listeners.forEach(listener => listener());
  }

  /**
   * Adds a new todo item to the list.
   * @param {string} text - The text content of the new todo.
   * @example
   * model.addTodo('Buy groceries');
   */
  addTodo(text) {
    if (!text || text.trim() === '') {
      return;
    }

    const todo = {
      id: this.nextId++,
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    this.todos.push(todo);
    this.save();
    this.notify();
  }
  /**
   *
   * @param fromIndex
   * @param toIndex
   */
  reorder(fromIndex, toIndex) {
    const [moved] = this.todos.splice(fromIndex, 1);
    this.todos.splice(toIndex, 0, moved);
    this.reindex(); // keep order numbers in sync
    this.save();
    this.notify();
  }

  /* helper – keep order field consistent */
  /**
   *
   */
  reindex() {
    this.todos.forEach((t, i) => (t.order = i));
  }

  /**
   * Toggles the completion state of a todo item by ID.
   * @param {number} id - The ID of the todo item to toggle.
   * @example
   * model.toggleComplete(2);
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
   * Deletes a todo item by ID.
   * @param {number} id - The ID of the todo to delete.
   * @example
   * model.deleteTodo(3);
   */
  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.save();
    this.notify();
  }
  /**
   * Updates the text of a todo item.
   * @param {number} id - The ID of the todo to update.
   * @param {string} newText - The new text for the todo item.
   * @example
   * model.updateTodo(1, 'Finish project report');
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
   * @example
   * model.clearCompleted();
   */
  clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed);
    this.save();
    this.notify();
  }
  /**
   * Removes **all** todos, regardless of completion state.
   * @example
   * model.clearAll();
   */
  clearAll() {
    this.todos = [];
    this.save();
    this.notify();
  }

  /**
   * Gets the count of active (not completed) todos.
   * @type {number}
   * @readonly
   * @example
   * console.log(model.activeCount); // e.g., 3
   */
  get activeCount() {
    return this.todos.filter(t => !t.completed).length;
  }

  /**
   * Gets the count of completed todos.
   * @type {number}
   * @readonly
   * @example
   * console.log(model.completedCount); // e.g., 2
   */
  get completedCount() {
    return this.todos.filter(t => t.completed).length;
  }

  /**
   * Saves the current todos and next ID value to persistent storage.
   * This method is automatically called whenever a change is made.
   * @private
   */
  save() {
    this.storage.save('items', this.todos);
    this.storage.save('nextId', this.nextId);
  }
}
