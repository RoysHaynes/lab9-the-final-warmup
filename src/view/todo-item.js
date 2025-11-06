import { LitElement, html, css } from 'lit';

/**
 * `<todo-item>` – Represents a single todo item.
 *
 * Lets the user:
 * - Check/uncheck to mark the todo as completed
 * - Edit text (Enter/Esc)
 * - Delete with confirmation
 * - Trigger confetti when completed
 */
export class TodoItem extends LitElement {
    /**
     * Reactive properties of the component.
     * @type {{todo: object, isEditing: boolean, editValue: string}}
     */
  static properties = {
    todo: { type: Object },
    isEditing: { state: true },
    editValue: { state: true },
  };

    /**
     * Styles for the todo item component.
     * @type {CSSResult}
     */
  static styles = css`
    :host {
      display: block;
    }

    .todo-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: white;
      border-radius: 0.5rem;
      margin-bottom: 0.5rem;
      transition:
        transform 0.2s,
        box-shadow 0.2s;
    }

    .todo-item:hover {
      transform: translateX(0.25rem);
      box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
    }

    .checkbox {
      width: 1.25rem;
      height: 1.25rem;
      cursor: pointer;
    }
    .todo-text {
      flex: 1;
      font-size: 1rem;
      color: #333;
      word-break: break-word;
    }
    .todo-text.completed {
      text-decoration: line-through;
      color: #999;
    }

    .edit-input {
      flex: 1;
      padding: 0.5rem;
      font-size: 1rem;
      border: 0.125rem solid #667eea;
      border-radius: 0.25rem;
      outline: none;
    }

    .button-group {
      display: flex;
      gap: 0.5rem;
    }
    button {
      padding: 0.375rem 0.75rem;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
      font-size: 0.875rem;
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
  `;

  /**
   *
   */
  constructor() {
    super();
    this.isEditing = false;
    this.editValue = '';
  }

    /**
     * Handles toggling the todo completion state.
     * Dispatches a custom event to notify the parent component of the toggle.
     * If the todo is newly marked as complete, launches confetti.
     *
     * @param {Event} e The change event from the checkbox.
     */
  handleToggle(e) {
    const wasCompleted = this.todo.completed;
    this.dispatchEvent(
      new CustomEvent('toggle-todo', {
        detail: { id: this.todo.id },
        bubbles: true,
        composed: true,
      })
    );

    // YOUR FLARE: Confetti only when *completing* (not unchecking)
    if (!wasCompleted && e.target.checked) {
      this.launchConfetti();
    }
  }

    /**
     * Handles deleting the todo.
     * Shows a confirmation dialog before dispatching a delete event.
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
     * Enables editing mode for the todo item.
     * Sets up the input value for the user to edit the todo's text.
     */
  handleEdit() {
    this.isEditing = true;
    this.editValue = this.todo.text;
  }


    /**
     * Saves the edited todo text.
     * Dispatches an update event with the new text.
     */
  handleSave() {
    const text = this.editValue.trim();
    if (text) {
      this.dispatchEvent(
        new CustomEvent('update-todo', {
          detail: { id: this.todo.id, text },
          bubbles: true,
          composed: true,
        })
      );
      this.isEditing = false;
    }
  }

    /**
     * Cancels editing and resets the input field.
     */
  handleCancel() {
    this.isEditing = false;
    this.editValue = '';
  }

    /**
     * Handles keyboard events during editing.
     * Saves the todo on Enter or cancels the edit on Escape.
     *
     * @param {KeyboardEvent} e The keyboard event triggered during editing.
     */
  handleKeyDown(e) {
    if (e.key === 'Enter') this.handleSave();
    else if (e.key === 'Escape') this.handleCancel();
  }

    /**
     * Launches a confetti animation when the todo is marked as complete.
     * Creates a celebratory confetti effect for 1 second.
     */
  launchConfetti() {
    const duration = 1000;
    const end = Date.now() + duration;

    const frame = () => {
      window.confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      window.confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }

    /**
     * Renders the todo item component based on the current state.
     * Shows an editable input field if the todo is being edited.
     *
     * @returns {TemplateResult} The HTML template for the todo item.
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
