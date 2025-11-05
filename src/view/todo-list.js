import { LitElement, html, css } from 'lit';
import './todo-item.js';
/**
 * `<todo-list>` – Renders a scrollable list of todo items.
 *
 * Displays:
 * - An **empty state** when no todos exist
 * - A **virtualized-style list** using native `<todo-item>` components
 * - **Custom scrollbar** styling for WebKit browsers
 *
 * The component is **purely presentational** – it receives `todos` as a property
 * and forwards all user interactions (toggle, edit, delete) via event bubbling.
 * @property {Array<TodoItem>} todos - Array of todo objects to display.
 * @fires TodoItem#toggle-todo   - Bubbled from child `<todo-item>`
 * @fires TodoItem#delete-todo   - Bubbled from child
 * @fires TodoItem#update-todo   - Bubbled from child
 * @example
 * <todo-list
 *   .todos=${model.todos}
 *   @toggle-todo=${e => model.toggleComplete(e.detail.id)}
 *   @delete-todo=${e => model.deleteTodo(e.detail.id)}
 *   @update-todo=${e => model.updateTodo(e.detail.id, e.detail.text)}>
 * </todo-list>
 */
export class TodoList extends LitElement {
  /**
   * Reactive property: the array of todos to render.
   * @type {Array<TodoItem>}
   */
  static properties = {
    todos: { type: Array },
  };

  /**
   * Shadow DOM styles – encapsulated and performance-optimized.
   *
   * Includes:
   * - Scroll container with max height
   * - Custom scrollbar (WebKit only)
   * - Empty state styling
   * @type {CSSResult}
   */
  static styles = css`
    :host {
      display: block;
    }

    .empty-state {
      text-align: center;
      padding: 40px 20px;
      color: white;
      font-size: 18px;
    }

    .empty-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .list-container {
      max-height: 500px;
      overflow-y: auto;
    }

    /* Custom scrollbar – WebKit only */
    .list-container::-webkit-scrollbar {
      width: 8px;
    }

    .list-container::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }

    .list-container::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 4px;
    }

    .list-container::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  `;

  /**
   * Initializes with an empty todo array.
   */
  constructor() {
    super();
    /** @private */
    this.todos = [];
  }

  /**
   * Renders the list or empty state.
   *
   * Uses `Array.map` to generate `<todo-item>` elements.
   * Events from children bubble up automatically due to `composed: true`.
   * @returns {TemplateResult}
   */
  render() {
    if (this.todos.length === 0) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">pencil</div>
          <p>No todos yet. Add one above!</p>
        </div>
      `;
    }

    return html`
      <div class="list-container">
        ${this.todos.map(todo => html`<todo-item .todo=${todo}></todo-item>`)}
      </div>
    `;
  }
}

customElements.define('todo-list', TodoList);
