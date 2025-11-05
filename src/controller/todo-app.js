import { LitElement, html, css } from 'lit';
import { TodoModel } from '../model/todo-model.js';
import { StorageService } from '../model/storage-service.js';
import '../view/todo-form.js';
import '../view/todo-list.js';

/**
 * @class TodoApp
 * @augments LitElement
 * @description
 * Main application component that coordinates between
 * the Model (`TodoModel`) and the View (`todo-form` and `todo-list`).
 * Handles user interactions, model updates, and rendering.
 */
export class TodoApp extends LitElement {
  /**
   * Reactive properties used by the LitElement framework.
   */
  static properties = {
    /** @type {Array<object>} */
    todos: { state: true },
  };

  /**
   * CSS styles for the component.
   */
  static styles = css`
    :host {
      display: block;
    }

    .app-container {
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      padding: 32px;
      min-height: 400px;
    }

    h1 {
      margin: 0 0 8px 0;
      color: #333;
      font-size: 32px;
      font-weight: 700;
    }

    .subtitle {
      color: #666;
      margin-bottom: 24px;
      font-size: 14px;
    }

    .stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: #667eea;
    }

    .stat-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .actions {
      display: flex;
      gap: 8px;
      margin-top: 20px;
    }

    button {
      flex: 1;
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .clear-completed {
      background: #ff9800;
      color: white;
    }

    .clear-completed:hover {
      background: #f57c00;
    }

    .clear-all {
      background: #f44336;
      color: white;
    }

    .clear-all:hover {
      background: #da190b;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .footer {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
  `;

  /**
   * Constructs the TodoApp component.
   * Initializes the model, storage service, and subscribes to model updates.
   */
  constructor() {
    super();
    /** @type {StorageService} */
    this.storageService = new StorageService();
    /** @type {TodoModel} */
    this.model = new TodoModel(this.storageService);
    /** @type {Array<object>} */
    this.todos = this.model.todos;

    // Subscribe to model changes
    this.model.subscribe(() => {
      this.todos = [...this.model.todos];
    });
  }

  /**
   * Handles the "add-todo" event from the todo-form component.
   * Adds a new todo item to the model.
   * @param {CustomEvent<{text: string}>} e - The custom event containing the todo text.
   */
  handleAddTodo(e) {
    this.model.addTodo(e.detail.text);
  }

  /**
   * Handles the "toggle-todo" event from the todo-list component.
   * Toggles the completion state of a todo item.
   * @param {CustomEvent<{id: string}>} e - The custom event containing the todo ID.
   */
  handleToggleTodo(e) {
    this.model.toggleComplete(e.detail.id);
  }

  /**
   * Handles the "delete-todo" event from the todo-list component.
   * Deletes a todo item by ID.
   * @param {CustomEvent<{id: string}>} e - The custom event containing the todo ID.
   */
  handleDeleteTodo(e) {
    this.model.deleteTodo(e.detail.id);
  }

  /**
   * Handles the "update-to do" event from the to do-list component.
   * Updates a to do item’s text by ID.
   * @param {CustomEvent<{id: string, text: string}>} e - The custom event containing the todo ID and new text.
   */
  handleUpdateTodo(e) {
    this.model.updateTodo(e.detail.id, e.detail.text);
  }

  /**
   *clears all completed to do items after user confirmation
   */
  handleClearCompleted() {
    if (confirm('Clear all completed todos?')) {
      this.model.clearCompleted();
    }
  }

  /**
   * Clears all todos (both active and completed) after user confirmation.
   */
  handleClearAll() {
    if (confirm('Clear ALL todos? This cannot be undone.')) {
      this.model.clearAll();
    }
  }

  /**
   * Renders the main UI for the Todo application.
   * @returns {import('lit').TemplateResult} The rendered HTML template.
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

        <todo-form @add-todo=${this.handleAddTodo}> </todo-form>

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

customElements.define('todo-app', TodoApp);
