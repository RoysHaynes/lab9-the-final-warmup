/**
 * @class StorageService
 * @description
 * A utility class for managing application data in `localStorage`.
 * Provides methods to save, load, remove, and clear data, with
 * error handling and namespacing via a configurable storage key prefix.
 */
export class StorageService {
  /**
   * Creates a new StorageService instance.
   * @param {string} [storageKey] - The base key prefix used to namespace stored items.
   */
  constructor(storageKey = 'todos') {
    /** @type {string} */
    this.storageKey = storageKey;
  }

  /**
   * Saves data to `localStorage` under a namespaced key.
   * Automatically converts the data to a JSON string.
   * @param {string} k - The specific key to store the data under (suffix of the storage key).
   * @param {*} d - The data to store (will be serialized with `JSON.stringify`).
   * @example
   * storage.save('list', [{ text: 'Do homework' }]);
   */
  save(k, d) {
    try {
      const fk = `${this.storageKey}_${k}`;
      localStorage.setItem(fk, JSON.stringify(d));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  /**
   * Loads and parses data from `localStorage`.
   * @param {string} key - The specific key to load data from (suffix of the storage key).
   * @param {*} [defaultValue] - The value to return if no data is found or parsing fails.
   * @returns {*} The parsed data from storage, or the provided `defaultValue` if unavailable.
   * @example
   * const todos = storage.load('list', []);
   */
  load(key, defaultValue = null) {
    try {
      const fullKey = `${this.storageKey}_${key}`;
      const item = localStorage.getItem(fullKey);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return defaultValue;
    }
  }

  /**
   * Removes a specific item from `localStorage`.
   * @param {string} k - The specific key to remove (suffix of the storage key).
   * @example
   * storage.remove('list');
   */
  remove(k) {
    try {
      const fullK = `${this.storageKey}_${k}`;
      localStorage.removeItem(fullK);
    } catch (e) {
      console.error('Failed to remove from localStorage:', e);
    }
  }

  /**
   * Clears all keys in `localStorage` that match the current storage prefix.
   * Useful for resetting app data without affecting unrelated storage entries.
   * @example
   * storage.clear();
   */
  clear() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.storageKey)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
}
