import { LitElement, html, css } from 'lit';
/**
 * @class TodoForm
 * @augments LitElement
 * @description
 * A reusable input form component for adding new todos.
 * Captures user input, validates it, and dispatches an `add-todo`
 * custom event to the parent component (`todo-app`) when submitted.
 */

/**
 *
 */
export class TodoForm extends LitElement {
  /**
   * Reactive properties used by the component.
   */
  static properties = {
    /**
     * The current text entered in the input field.
     * @type {boolean}
     */
    inputValue: { state: true },
  };

  /**
   * CSS styles for the component.
   */
  static styles = css`
    :host {
      display: block;
      margin-bottom: 1.25rem;
    }

    form {
      display: flex;
      gap: 0.5rem;
    }

    input {
      flex: 1;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      border: 0.125rem solid #e0e0e0;
      border-radius: 0.5rem;
      outline: none;
      transition: border-color 0.3s;
    }

    input:focus {
      border-color: #667eea;
    }

    button {
      padding: 0.75rem 1.5rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }

    button:hover {
      background: #5568d3;
    }

    button:active {
      transform: translateY(0.0625rem);
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `;

  /**
   * Creates a new TodoForm instance and initializes its state.
   */
  constructor() {
    super();
    this.inputValue = '';
  }
  /**
   * Handles form submission.
   * Prevents the default form submission behavior,
   * validates the input, and dispatches a custom `add-todo` event.
   * @param {SubmitEvent} e - The form submission event.
   * @fires TodoForm#add-todo
   * @example
   * todoForm.addEventListener('add-todo', (e) => {
   *   console.log(e.detail.text); // new todo text
   * });
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
   * Updates the input value as the user types.
   * @param {InputEvent} e - The input event triggered when typing in the text field.
   */
  handleInput(e) {
    this.inputValue = e.target.value;
  }

  /**
   * Renders the todo input form.
   * @returns {import('lit').TemplateResult} The rendered HTML template.
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
