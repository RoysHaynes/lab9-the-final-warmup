import { LitElement, html, css } from 'lit';
import './todo-item.js';

/**
 * `<todo-list>` – Shows the list of todos.
 *
 * - Shows empty message if no todos
 * - Renders each todo with `<todo-item>`
 * - Has custom scrollbar (Chrome/Edge)
 *
 * Just displays data – all clicks bubble up.
 */
export class TodoList extends LitElement {
  /**
   * List of to dos to show.
   * @type {Array<object>}
   */
  static properties = {
    todos: { type: Array },
  };

  /**
   * Styles for list and empty state.
   * @type {CSSResult}
   */
  static styles = css`
    :host {
      display: block;
    }

    .empty-state {
      text-align: center;
      padding: 2.5rem 1.25rem;
      color: white;
      font-size: 1.125rem;
    }

    .empty-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .list-container {
      max-height: 31.25rem;
    }

    /* Custom scrollbar (Chrome/Edge) */
    .list-container::-webkit-scrollbar {
      width: 0.5rem;
    }

    .list-container::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 0.25rem;
    }

    .list-container::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 0.25rem;
    }

    .list-container::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  `;

  /**
   *
   */
  constructor() {
    super();
    this.todos = [];
  }

  /**
   * Renders empty state or list of items.
   * @returns {TemplateResult}
   */
  render() {
    return html`
      <div
        class="list-container"
        @dragover=${this._allowDrop}
        @drop=${this._onDrop}
      >
        ${this.todos.map(
          (todo, index) => html`
            <todo-item
              .todo=${todo}
              draggable="true"
              @dragstart=${e => e.dataTransfer.setData('text/plain', index)}
            >
            </todo-item>
          `
        )}
      </div>
    `;
  }
}

customElements.define('todo-list', TodoList);
