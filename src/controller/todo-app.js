/**
 * TodoApp – the **root** Lit component that glues the MVC layers together.
 *
 * It:
 * 1. Instantiates {@link StorageService} and {@link TodoModel}.
 * 2. Subscribes to model changes and keeps `this.todos` in sync.
 * 3. Dispatches user actions to the model.
 * 4. Renders the UI (stats, form, list, actions).
 * @augments LitElement
 * @fires TodoForm#add-todo → handled by {@link TodoApp#handleAddTodo}
 * @fires TodoItem#toggle-todo → handled by {@link TodoApp#handleToggleTodo}
 * @fires TodoItem#delete-todo → handled by {@link TodoApp#handleDeleteTodo}
 * @fires TodoItem#update-todo → handled by {@link TodoApp#handleUpdateTodo}
 * @example
 * // In index.html
 * <todo-app></todo-app>
 */
export class TodoApp extends LitElement {
  /**
   * Reactive state – the current array of todo objects.
   * @type {Array<TodoItemData>}
   * @private
   */
  static properties = {
    todos: { state: true },
  };

  /**
   * Global CSS for the whole app.
   * @type {CSSResult}
   */
  static styles = css`
    /* … (your existing CSS) … */
  `;

  /**
   * @param {StorageService} [storageService] - Persistence layer.
   * @param {TodoModel} [model] - Optional pre-instantiated model (useful for testing).
   */
  constructor(storageService = new StorageService(), model) {
    super();
    /** @private */
    this.storageService = storageService;
    /** @private */
    this.model = model ?? new TodoModel(this.storageService);
    /** @private */
    this.todos = this.model.todos;

    // React to any model mutation
    this.model.subscribe(() => {
      this.todos = [...this.model.todos];
    });
  }

  /* --------------------------------------------------------------------- *
   *  Event handlers – each maps a custom event to a model method.
   * --------------------------------------------------------------------- */

  /**
   * Handles the `add-todo` event dispatched by `<todo-form>`.
   * @param {CustomEvent<{text:string}>} e - Event payload.
   */
  handleAddTodo(e) {
    this.model.addTodo(e.detail.text);
  }

  /**
   * Handles the `toggle-todo` event from `<todo-item>`.
   * @param {CustomEvent<{id:number}>} e
   */
  handleToggleTodo(e) {
    this.model.toggleComplete(e.detail.id);
  }

  /**
   * Handles the `delete-todo` event from `<todo-item>`.
   * @param {CustomEvent<{id:number}>} e
   */
  handleDeleteTodo(e) {
    this.model.deleteTodo(e.detail.id);
  }

  /**
   * Handles the `update-todo` event from `<todo-item>` (edit mode).
   * @param {CustomEvent<{id:number, text:string}>} e
   */
  handleUpdateTodo(e) {
    this.model.updateTodo(e.detail.id, e.detail.text);
  }

  /**
   * Clears **all** completed todos after user confirmation.
   * @fires TodoModel#clearCompleted
   */
  handleClearCompleted() {
    if (confirm('Clear all completed todos?')) {
      this.model.clearCompleted();
    }
  }

  /**
   * Deletes **every** todo after user confirmation.
   * @fires TodoModel#clearAll
   */
  handleClearAll() {
    if (confirm('Clear ALL todos? This cannot be undone.')) {
      this.model.clearAll();
    }
  }

  /* --------------------------------------------------------------------- *
   *  Rendering
   * --------------------------------------------------------------------- */

  /**
   * Renders the whole application UI.
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
 * Shape of a single todo object stored in {@link TodoModel#todos}.
 * @typedef {object} TodoItemData
 * @property {number} id - Unique identifier.
 * @property {string} text - User-entered description.
 * @property {boolean} completed - Completion flag.
 * @property {string} [priority] - Optional priority (my addition).
 * @property {string} createdAt - ISO timestamp of creation.
 */

customElements.define('todo-app', TodoApp);
