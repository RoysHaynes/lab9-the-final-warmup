/**
 * StorageService – a **namespaced wrapper** around `localStorage`.
 *
 * All keys are prefixed with `storageKey_` to avoid collisions with other apps.
 * Errors are caught and logged; methods never throw.
 * @example
 * // Default usage (prefix: "todos")
 * const storage = new StorageService();
 * storage.save('items', [{ id: 1, text: 'Buy milk' }]);
 * const todos = storage.load('items', []); // → array or default
 * @example
 * // Custom namespace
 * const userStorage = new StorageService('myapp_user');
 * userStorage.save('profile', { name: 'Roy' });
 */
export class StorageService {
  /**
   * @param {string} [storageKey] - Prefix for all stored keys.
   */
  constructor(storageKey = 'todos') {
    /**
     * The namespace prefix used for all keys.
     * @private
     */
    this.storageKey = storageKey;
  }

  /**
   * Persists a JSON-serializable value under a logical key.
   * @param {string} key - Logical identifier (e.g., `'items'`, `'settings'`).
   * @param {any} data - Value to store. Must be JSON-serializable.
   * @example
   * storage.save('nextId', 42);
   */
  save(key, data) {
    try {
      const fullKey = `${this.storageKey}_${key}`;
      localStorage.setItem(fullKey, JSON.stringify(data));
    } catch (error) {
      console.error('StorageService.save() failed:', { key, error });
    }
  }

  /**
   * Retrieves and parses a value.
   * @param {string} key - Logical key.
   * @param {any} [defaultValue] - Fallback if key missing or corrupted.
   * @returns {any} Parsed value or `defaultValue`.
   * @example
   * const todos = storage.load('items', []); // [] if nothing stored
   */
  load(key, defaultValue = null) {
    try {
      const fullKey = `${this.storageKey}_${key}`;
      const item = localStorage.getItem(fullKey);
      return item !== null ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('StorageService.load() failed:', { key, error });
      return defaultValue;
    }
  }

  /**
   * Deletes a single namespaced entry.
   * @param {string} key - Logical key to remove.
   * @example
   * storage.remove('items'); // deletes "todos_items"
   */
  remove(key) {
    try {
      const fullKey = `${this.storageKey}_${key}`;
      localStorage.removeItem(fullKey);
    } catch (error) {
      console.error('StorageService.remove() failed:', { key, error });
    }
  }

  /**
   * Removes **all** keys belonging to this service.
   * @example
   * storage.clear(); // wipes todos_items, todos_nextId, etc.
   */
  clear() {
    try {
      const prefix = this.storageKey;
      const keysToRemove = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch (error) {
      console.error('StorageService.clear() failed:', error);
    }
  }
}
