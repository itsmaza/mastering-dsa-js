// ============================================================
// Stack (Linked List) + Algorithm Problems — JavaScript
// ============================================================

// ─── Node ────────────────────────────────────────────────────

/**
 * Singly linked list node used by the Stack.
 */
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// ─── Stack ───────────────────────────────────────────────────

/**
 * Stack data structure implemented using a singly linked list.
 * LIFO — Last In, First Out.
 *
 * @example
 * const stack = new Stack();
 * stack.push(1).push(2).push(3);
 * stack.peek();  // 3
 * stack.pop();   // 3
 * stack.print(); // "2 -> 1"
 */
class Stack {
    constructor() {
        this.top = null;
        this.size = 0;
    }

    /**
     * Checks whether the stack is empty.
     * @returns {boolean} True if empty
     */
    isEmpty() {
        return this.size === 0;
    }

    /**
     * Pushes a new value onto the top of the stack.
     * @param {*} value - Value to push
     * @returns {Stack} The stack itself (enables chaining)
     */
    push(value) {
        const newNode = new Node(value);
        newNode.next = this.top;
        this.top = newNode;
        this.size++;
        return this;
    }

    /**
     * Removes and returns the top value from the stack.
     * @returns {*|null} Popped value, or null if stack is empty
     */
    pop() {
        if (this.isEmpty()) return null;
        const poppedNode = this.top;
        this.top = this.top.next;
        this.size--;
        return poppedNode.value;
    }

    /**
     * Returns the top value without removing it.
     * @returns {*|null} Top value, or null if stack is empty
     */
    peek() {
        return this.top ? this.top.value : null;
    }

    /**
     * Prints all stack values from top to bottom.
     * Useful for debugging.
     */
    print() {
        let current = this.top;
        const values = [];
        while (current) {
            values.push(current.value);
            current = current.next;
        }
        console.log(values.join(' -> '));
    }
}

// ─── Array Utilities ─────────────────────────────────────────

/**
 * Reverses an array in-place using a stack.
 * Time: O(n)  Space: O(n)
 * @param {Array} arr - Input array
 * @returns {Array} Reversed array
 */
function reverseArray(arr) {
    const stack = [];
    for (let i = 0; i < arr.length; i++) {
        stack.push(arr[i]);
    }

    let index = 0;
    while (stack.length) {
        arr[index] = stack.pop();
        index++;
    }
    return arr;
}

/**
 * Inserts a value at the bottom of a stack (non-destructive).
 * Time: O(n)  Space: O(n)
 * @param {*} val - Value to insert at the bottom
 * @param {Array} stack - Stack represented as a plain array
 * @returns {Array} Updated stack with val at the bottom
 */
function insertAtBottomOfStack(val, stack) {
    const temp = [];
    while (stack.length) {
        temp.push(stack.pop());
    }

    stack[0] = val;
    let index = 1;
    while (temp.length) {
        stack[index++] = temp.pop();
    }
    return stack;
}

// ─── String / Parentheses ────────────────────────────────────

/**
 * Validates that all brackets in a string are properly matched and closed.
 * Handles: ( ) { } [ ]
 * Time: O(n)  Space: O(n)
 * @param {string} s - Input string containing brackets
 * @returns {boolean} True if all brackets are valid
 */
function isValidParentheses(s) {
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '[',
    };

    const stack = [];
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.length === 0) return false;
            const top = stack.pop();
            if (top !== pairs[char]) return false;
        }
    }
    return stack.length === 0;
}

/**
 * Finds the length of the longest substring without repeating characters.
 * Uses a sliding window + hash map approach.
 * Time: O(n)  Space: O(n)
 * @param {string} str - Input string
 * @returns {number} Length of the longest unique-character substring
 */
function longestSubstringWithoutRepeating(str) {
    let maxLen = 0;
    const lastSeen = {};
    let left = 0;

    for (let i = 0; i < str.length; i++) {
        const curr = str[i];
        if (lastSeen[curr] !== undefined && lastSeen[curr] >= left) {
            left = lastSeen[curr] + 1;
        }
        lastSeen[curr] = i;
        maxLen = Math.max(maxLen, i - left + 1);
    }
    return maxLen;
}

// ─── Binary Search Problems ───────────────────────────────────

/**
 * Helper — checks whether an array can be split into at most m subarrays
 * where each subarray's sum does not exceed `limit`.
 * @param {number[]} arr - Input array
 * @param {number} limit - Max allowed subarray sum
 * @param {number} m - Max number of subarrays (splits)
 * @returns {boolean} True if feasible
 */
function isValidSplit(arr, limit, m) {
    let count = 1;
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] + sum <= limit) {
            sum += arr[i];
        } else {
            sum = arr[i];
            count++;
        }
    }
    return count <= m;
}

/**
 * Finds the minimum largest subarray sum when splitting array into at most m parts.
 * Uses binary search on the answer.
 * Time: O(n log(sum))  Space: O(1)
 * @param {number[]} array - Input array of non-negative integers
 * @param {number} m - Maximum number of subarrays
 * @returns {number} Minimum possible value of the largest subarray sum
 */
function splitArray(array = [], m) {
    let left = Math.max(...array);
    let right = array.reduce((acc, curr) => acc + curr, 0);
    let result = 0;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (isValidSplit(array, mid, m)) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return result;
}

/**
 * Finds the peak element index in an array using binary search.
 * A peak element is greater than both its neighbors.
 * Time: O(log n)  Space: O(1)
 * @param {number[]} arr - Input array
 * @returns {number} Index of a peak element
 */
function peakElement(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (arr[mid] > arr[mid + 1] && arr[mid - 1] < arr[mid]) {
            return mid;
        } else if (arr[mid] < arr[right]) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left;
}

/**
 * Searches for a target value in a rotated sorted array.
 * Time: O(log n)  Space: O(1)
 * @param {number[]} arr - Rotated sorted array
 * @param {number} target - Value to search for
 * @returns {number} Index of target, or -1 if not found
 */
function findTargetInRotatedArray(arr = [], target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (arr[mid] === target) return mid;

        if (arr[mid] >= arr[left]) {
            // Left half is sorted
            if (target < arr[mid] && arr[left] <= target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (arr[right] >= target && arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}

// ─── Recursion ────────────────────────────────────────────────

/**
 * Recursively computes and prints the cumulative sum from 1 to n.
 * At each step, prints the running total before returning it.
 * @param {number} n - Upper bound
 * @returns {number} Sum of 1 + 2 + ... + n
 *
 * @example
 * printCumulativeSum(3);
 * // logs: 1 → 3 → 6
 * // returns: 6
 */
function printCumulativeSum(n) {
    if (n === 0) return 0;
    const res = printCumulativeSum(n - 1) + n;
    console.log(res);
    return res;
}