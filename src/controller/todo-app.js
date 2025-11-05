/**
 * TodoApp – Main application component.
 *
 * Coordinates the model (TodoModel), storage (StorageService), and views.
 * Renders the full UI and handles user actions.
 * @augments LitElement
 */
export class TodoApp extends LitElement {
  /**
   * Reactive state: current list of todos.
   * @type {Array<TodoItemData>}
   */
  static properties = {
    todos: { state: true },
  };

  /**
   * Global styles for the app.
   * @type {CSSResult}
   */
  static styles = css`
    /* ... your CSS ... */
  `;

  /**
   * @param {StorageService} [storageService] - Optional storage instance.
   * @param {TodoModel} [model] - Optional pre-made model (for testing).
   */
  constructor(storageService = new StorageService(), model) {
    super();
    this.storageService = storageService;
    this.model = model ?? new TodoModel(this.storageService);
    this.todos = this.model.todos;

    // Update UI when model changes
    this.model.subscribe(() => {
      this.todos = [...this.model.todos];
    });
  }

  /**
   * Handles adding a new todo from the form.
   * @param {CustomEvent} e - Event with `detail.text`
   */
  handleAddTodo(e) {
    this.model.addTodo(e.detail.text);
  }

  /**
   * Toggles a todo's completed state.
   * @param {CustomEvent} e - Event with `detail.id`
   */
  handleToggleTodo(e) {
    this.model.toggleComplete(e.detail.id);
  }

  /**
   * Deletes a todo.
   * @param {CustomEvent} e - Event with `detail.id`
   */
  handleDeleteTodo(e) {
    this.model.deleteTodo(e.detail.id);
  }

  /**
   * Updates a todo's text.
   * @param {CustomEvent} e - Event with `detail.id` and `detail.text`
   */
  handleUpdateTodo(e) {
    this.model.updateTodo(e.detail.id, e.detail.text);
  }

  /**
   * Clears all completed todos after confirmation.
   */
  handleClearCompleted() {
    if (confirm('Clear all completed todos?')) {
      this.model.clearCompleted();
    }
  }

  /**
   * Deletes all todos after confirmation.
   */
  handleClearAll() {
    if (confirm('Clear ALL todos? This cannot be undone.')) {
      this.model.clearAll();
    }
  }

  /**
   * Renders the full app UI.
   * @returns {TemplateResult}
   */
  render() {
    return html`
      <div class="app-container">
        <h1>My Tasks</h1>
        <p class="subtitle">Stay organized and productive</p>

        <div class="stats">
          <div class="stat-item">
            <div class="stat-value">${this.todos.length}</div>
            <div class="stat-label">Total</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${this.model.activeCount}</div>
            <div class="stat-label">Active</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${this.model.completedCount}</div>
            <div class="stat-label">Completed</div>
          </div>
        </div>

        <todo-form @add-todo=${this.handleAddTodo}></todo-form>

        <todo-list
          .todos=${this.todos}
          @toggle-todo=${this.handleToggleTodo}
          @delete-todo=${this.handleDeleteTodo}
          @update-todo=${this.handleUpdateTodo}
        >
        </todo-list>

        <div class="actions">
          <button
            class="clear-completed"
            @click=${this.handleClearCompleted}
            ?disabled=${this.model.completedCount === 0}
          >
            Clear Completed
          </button>
          <button
            class="clear-all"
            @click=${this.handleClearAll}
            ?disabled=${this.todos.length === 0}
          >
            Clear All
          </button>
        </div>

        <div class="footer">Lab 9: The final battle!</div>
      </div>
    `;
  }
}

/**
 * Data shape of a single todo item.
 * @typedef {object} TodoItemData
 * @property {number} id
 * @property {string} text
 * @property {boolean} completed
 * @property {string} [priority] - Optional priority
 * @property {string} createdAt - ISO timestamp
 */

customElements.define('todo-app', TodoApp);
