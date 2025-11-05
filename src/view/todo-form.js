import { LitElement, html, css } from 'lit';

/**
 * `<todo-form>` – Input component for creating new todo items.
 *
 * Renders a single-line form with a text field and an "Add" button.
 * Emits a custom `add-todo` event when the user submits a non-empty value.
 * @fires TodoForm#add-todo - Dispatched on form submission with the trimmed text.
 *   ```js
 *   { detail: { text: string } }
 *   ```
 * @example
 * <todo-form @add-todo=${e => model.addTodo(e.detail.text)}></todo-form>
 */
export class TodoForm extends LitElement {
  /**
   * Reactive state for the text input.
   * @type {string}
   * @private
   */
  static properties = {
    inputValue: { state: true },
  };

  /**
   * Component styling – scoped to the Shadow DOM.
   * @type {CSSResult}
   */
  static styles = css`
    :host {
      display: block;
      margin-bottom: 20px;
    }

    form {
      display: flex;
      gap: 8px;
    }

    input {
      flex: 1;
      padding: 12px 16px;
      font-size: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      outline: none;
      transition: border-color 0.3s;
    }

    input:focus {
      border-color: #667eea;
    }

    button {
      padding: 12px 24px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }

    button:hover {
      background: #5568d3;
    }

    button:active {
      transform: translateY(1px);
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `;

  /**
   * Initializes component state.
   */
  constructor() {
    super();
    /** @private */
    this.inputValue = '';
  }

  /**
   * Handles form submission.
   *
   * Prevents default behavior, validates input, dispatches the custom event,
   * and resets the field.
   * @param {Event} e - Native submit event.
   * @fires TodoForm#add-todo
   */
  handleSubmit(e) {
    e.preventDefault();
    const text = this.inputValue.trim();

    if (text) {
      this.dispatchEvent(
        new CustomEvent('add-todo', {
          detail: { text },
          bubbles: true,
          composed: true,
        })
      );
      this.inputValue = '';
    }
  }

  /**
   * Syncs the reactive `inputValue` with the `<input>` element.
   * @param {InputEvent} e - Input event from the text field.
   */
  handleInput(e) {
    this.inputValue = e.target.value;
  }

  /**
   * Renders the form markup.
   * @returns {TemplateResult}
   */
  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <input
          type="text"
          placeholder="What needs to be done?"
          .value=${this.inputValue}
          @input=${this.handleInput}
          aria-label="New todo"
          autofocus
        />
        <button type="submit" ?disabled=${!this.inputValue.trim()}>Add</button>
      </form>
    `;
  }
}

customElements.define('todo-form', TodoForm);
