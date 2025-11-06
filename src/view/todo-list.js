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
          overflow-y: auto;
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
    if (!this.todos.length) {
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
