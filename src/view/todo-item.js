import { LitElement, html, css } from 'lit';

/**
 * `<todo-item>` – Renders and manages a single todo entry.
 *
 * Supports:
 * - Toggle completion
 * - Inline editing (Enter/Esc)
 * - Delete with confirmation
 * - Visual feedback (hover, completed state, disabled edit when done)
 * @fires TodoItem#toggle-todo   - When checkbox is changed
 * @fires TodoItem#delete-todo   - When delete button is confirmed
 * @fires TodoItem#update-todo   - When edit is saved
 * @example
 * <todo-item .todo=${todoObj}
 *   @toggle-todo=${e => model.toggleComplete(e.detail.id)}
 *   @delete-todo=${e => model.deleteTodo(e.detail.id)}
 *   @update-todo=${e => model.updateTodo(e.detail.id, e.detail.text)}>
 * </todo-item>
 */
export class TodoItem extends LitElement {
  /**
   * Reactive properties.
   * @type {{
   *   todo: { type: Object },
   *   isEditing: { state: true },
   *   editValue: { state: true }
   * }}
   */
  static properties = {
    todo: { type: Object },
    isEditing: { state: true },
    editValue: { state: true },
  };

  /**
   * Shadow DOM styles – scoped and encapsulated.
   * @type {CSSResult}
   */
  static styles = css`
    :host {
      display: block;
    }

    .todo-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: white;
      border-radius: 8px;
      margin-bottom: 8px;
      transition:
        transform 0.2s,
        box-shadow 0.2s;
    }

    .todo-item:hover {
      transform: translateX(4px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .checkbox {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .todo-text {
      flex: 1;
      font-size: 16px;
      color: #333;
      word-break: break-word;
    }

    .todo-text.completed {
      text-decoration: line-through;
      color: #999;
    }

    .edit-input {
      flex: 1;
      padding: 8px;
      font-size: 16px;
      border: 2px solid #667eea;
      border-radius: 4px;
      outline: none;
    }

    .button-group {
      display: flex;
      gap: 8px;
    }

    button {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;
    }

    .edit-btn {
      background: #4caf50;
      color: white;
    }

    .edit-btn:hover {
      background: #45a049;
    }

    .delete-btn {
      background: #f44336;
      color: white;
    }

    .delete-btn:hover {
      background: #da190b;
    }

    .save-btn {
      background: #2196f3;
      color: white;
    }

    .save-btn:hover {
      background: #0b7dda;
    }

    .cancel-btn {
      background: #757575;
      color: white;
    }

    .cancel-btn:hover {
      background: #616161;
    }

    .edit-btn[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  /**
   * Initializes component state.
   */
  constructor() {
    super();
    /** @private */
    this.isEditing = false;
    /** @private */
    this.editValue = '';
  }

  /* --------------------------------------------------------------------- *
   *  Event Dispatchers
   * --------------------------------------------------------------------- */

  /**
   * Emits `toggle-todo` event with the todo ID.
   * @fires TodoItem#toggle-todo
   */
  handleToggle() {
    this.dispatchEvent(
      new CustomEvent('toggle-todo', {
        detail: { id: this.todo.id },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Prompts for confirmation then emits `delete-todo`.
   * @fires TodoItem#delete-todo
   */
  handleDelete() {
    if (confirm('Delete this todo?')) {
      this.dispatchEvent(
        new CustomEvent('delete-todo', {
          detail: { id: this.todo.id },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  /**
   * Enters edit mode and pre-fills the current text.
   */
  handleEdit() {
    this.isEditing = true;
    this.editValue = this.todo.text;
  }

  /**
   * Saves edited text if non-empty and exits edit mode.
   * @fires TodoItem#update-todo
   */
  handleSave() {
    const trimmed = this.editValue.trim();
    if (trimmed) {
      this.dispatchEvent(
        new CustomEvent('update-todo', {
          detail: { id: this.todo.id, text: trimmed },
          bubbles: true,
          composed: true,
        })
      );
      this.isEditing = false;
    }
  }

  /**
   * Discards changes and exits edit mode.
   */
  handleCancel() {
    this.isEditing = false;
    this.editValue = '';
  }

  /**
   * Handles keyboard shortcuts in edit mode.
   *
   * - **Enter**: Save
   * - **Escape**: Cancel
   * @param {KeyboardEvent} e
   */
  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleSave();
    } else if (e.key === 'Escape') {
      this.handleCancel();
    }
  }

  /* --------------------------------------------------------------------- *
   *  Rendering
   * --------------------------------------------------------------------- */

  /**
   * Renders either the **view** or **edit** template based on state.
   * @returns {TemplateResult}
   */
  render() {
    if (this.isEditing) {
      return html`
        <div class="todo-item">
          <input
            class="edit-input"
            type="text"
            .value=${this.editValue}
            @input=${e => (this.editValue = e.target.value)}
            @keydown=${this.handleKeyDown}
            autofocus
          />
          <div class="button-group">
            <button class="save-btn" @click=${this.handleSave}>Save</button>
            <button class="cancel-btn" @click=${this.handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      `;
    }

    return html`
      <div class="todo-item">
        <input
          type="checkbox"
          class="checkbox"
          .checked=${this.todo.completed}
          @change=${this.handleToggle}
          aria-label="Toggle todo"
        />
        <span class="todo-text ${this.todo.completed ? 'completed' : ''}">
          ${this.todo.text}
        </span>
        <div class="button-group">
          <button
            class="edit-btn"
            @click=${this.handleEdit}
            ?disabled=${this.todo.completed}
            aria-label="Edit todo"
          >
            Edit
          </button>
          <button
            class="delete-btn"
            @click=${this.handleDelete}
            aria-label="Delete todo"
          >
            Delete
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('todo-item', TodoItem);
