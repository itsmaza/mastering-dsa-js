/**
 * Custom Array Prototype Methods
 * Reimplementations of built-in array methods for learning purposes.
 */

// ─────────────────────────────────────────────
// PUSH
// ─────────────────────────────────────────────

/**
 * Appends one or more elements to the end of the array.
 * @param {...*} args - Elements to add.
 * @returns {number} The new length of the array.
 */
Array.prototype.myPush = function (...args) {
    for (let i = 0; i < args.length; i++) {
        this[this.length] = args[i];
    }
    return this.length;
};

// ─────────────────────────────────────────────
// POP
// ─────────────────────────────────────────────

/**
 * Removes and returns the last element of the array.
 * @returns {*} The removed element, or undefined if the array is empty.
 */
Array.prototype.myPop = function () {
    if (this.length === 0) return undefined;

    const lastItem = this[this.length - 1];
    delete this[this.length - 1];
    this.length--;

    return lastItem;
};

// ─────────────────────────────────────────────
// SHIFT
// ─────────────────────────────────────────────

/**
 * Removes and returns the first element of the array,
 * shifting all remaining elements one position to the left.
 * @returns {*} The removed first element.
 */
Array.prototype.myShift = function () {
    if (this.length === 0) return undefined;

    const firstItem = this[0];

    for (let i = 1; i < this.length; i++) {
        this[i - 1] = this[i];
    }
    this.length--;

    return firstItem;
};

// ─────────────────────────────────────────────
// UNSHIFT
// ─────────────────────────────────────────────

/**
 * Inserts one or more elements at the beginning of the array.
 * @param {...*} args - Elements to insert at the front.
 * @returns {number} The new length of the array.
 */
Array.prototype.myUnshift = function (...args) {
    for (let i = this.length - 1; i >= 0; i--) {
        this[i + args.length] = this[i];
    }

    for (let i = 0; i < args.length; i++) {
        this[i] = args[i];
    }

    return this.length;
};

// ─────────────────────────────────────────────
// INDEX OF
// ─────────────────────────────────────────────

/**
 * Returns the index of the first occurrence of a value using linear search.
 * @param {*} value - The value to search for.
 * @returns {number} Index of the value, or -1 if not found.
 */
Array.prototype.myIndexOf = function (value) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === value) return i;
    }
    return -1;
};

// ─────────────────────────────────────────────
// INDEX OF (SORTED) — Binary Search
// ─────────────────────────────────────────────

/**
 * Returns the index of a value in a sorted array using binary search.
 * Only use this on arrays that are already sorted in ascending order.
 * @param {number} value - The value to search for.
 * @returns {number} Index of the value, or -1 if not found.
 */
Array.prototype.myIndexOfSorted = function (value) {
    let left = 0;
    let right = this.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (this[mid] === value) return mid;
        if (this[mid] > value) right = mid - 1;
        else left = mid + 1;
    }

    return -1;
};

// ─────────────────────────────────────────────
// FOR EACH
// ─────────────────────────────────────────────

/**
 * Executes a callback function for each element in the array.
 * Skips empty (sparse) slots.
 * @param {function(*, number, Array): void} callback - Function to call per element.
 */
Array.prototype.myForEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (i in this) {
            callback(this[i], i, this);
        }
    }
};

// ─────────────────────────────────────────────
// MAP
// ─────────────────────────────────────────────

/**
 * Creates a new array with the results of calling a callback on every element.
 * Skips empty (sparse) slots.
 * @param {function(*, number, Array): *} callback - Function that returns a new value.
 * @returns {Array} New transformed array.
 */
Array.prototype.myMap = function (callback) {
    const result = [];

    for (let i = 0; i < this.length; i++) {
        if (i in this) {
            result.push(callback(this[i], i, this));
        }
    }

    return result;
};

// ─────────────────────────────────────────────
// SORT (Bubble Sort)
// ─────────────────────────────────────────────

/**
 * Sorts the array in place using bubble sort in ascending order.
 * Optimized with an early exit if no swaps occur in a pass.
 * @returns {Array} The sorted array.
 */
Array.prototype.mySort = function () {
    for (let i = 0; i < this.length; i++) {
        let swapped = false;

        for (let j = 0; j < this.length - i - 1; j++) {
            if (this[j] > this[j + 1]) {
                [this[j], this[j + 1]] = [this[j + 1], this[j]];
                swapped = true;
            }
        }

        if (!swapped) break;
    }

    return this;
};

// ─────────────────────────────────────────────
// FILL
// ─────────────────────────────────────────────

/**
 * Fills a portion of the array with a static value.
 * @param {*} value - The value to fill with.
 * @param {number} [start=0] - Start index (inclusive).
 * @param {number} [end=this.length] - End index (exclusive).
 * @returns {Array} The modified array.
 */
Array.prototype.myFill = function (value, start = 0, end = this.length) {
    for (let i = start; i < end; i++) {
        this[i] = value;
    }
    return this;
};

// ─────────────────────────────────────────────
// EVERY
// ─────────────────────────────────────────────

/**
 * Tests whether all elements pass the provided callback function.
 * @param {function(*, number, Array): boolean} callback - Test function.
 * @returns {boolean} True if all elements pass, false otherwise.
 */
Array.prototype.myEvery = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (!callback(this[i], i, this)) return false;
    }
    return true;
};

// ─────────────────────────────────────────────
// SOME
// ─────────────────────────────────────────────

/**
 * Tests whether at least one element passes the provided callback function.
 * @param {function(*, number, Array): boolean} callback - Test function.
 * @returns {boolean} True if any element passes, false otherwise.
 */
Array.prototype.mySome = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) return true;
    }
    return false;
};

// ─────────────────────────────────────────────
// REDUCE
// ─────────────────────────────────────────────

/**
 * Reduces the array to a single value by applying a callback cumulatively.
 * If no initial value is provided, the first element is used as the accumulator.
 * @param {function(*, *, number, Array): *} callback - Reducer function.
 * @param {*} [initialValue] - Optional starting accumulator value.
 * @returns {*} The final accumulated result.
 */
Array.prototype.myReduce = function (callback, initialValue) {
    let accumulator;
    let startIndex;

    if (initialValue !== undefined) {
        accumulator = initialValue;
        startIndex = 0;
    } else {
        accumulator = this[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
};