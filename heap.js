// ============================================================
//  Heap Data Structure & Related Problems
//  Max-Heap implementation + standalone utility functions
// ============================================================

// ─────────────────────────────────────────────────────────────
//  Section 1 — Heap Class (OOP style)
// ─────────────────────────────────────────────────────────────

class Heap {
  /**
   * Creates a new Max-Heap with a fixed capacity.
   * @param {number} maxSize - Maximum number of elements the heap can hold.
   */
  constructor(maxSize) {
    this.heap = [];
    this.size = 0;
    this.maxSize = maxSize;
  }

  // ── Index Helpers ──────────────────────────────────────────

  /**
   * Returns the index of the parent node.
   * @param {number} index - Index of the current node.
   * @returns {number} Parent index.
   */
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  /**
   * Returns the index of the left child, or -1 if it doesn't exist.
   * @param {number} index - Index of the current node.
   * @returns {number} Left child index, or -1.
   */
  getLeftChildIndex(index) {
    const left = 2 * index + 1;
    return left >= this.size ? -1 : left;
  }

  /**
   * Returns the index of the right child, or -1 if it doesn't exist.
   * @param {number} index - Index of the current node.
   * @returns {number} Right child index, or -1.
   */
  getRightChildIndex(index) {
    const right = 2 * index + 2;
    return right >= this.size ? -1 : right;
  }

  // ── Core Operations ────────────────────────────────────────

  /**
   * Returns the maximum element (root) without removing it.
   * @returns {number|null} The max element, or null if the heap is empty.
   */
  getMax() {
    return this.size === 0 ? null : this.heap[0];
  }

  /**
   * Inserts a new value into the heap.
   * @param {number} value - The value to insert.
   * @returns {number|string} The inserted value, or 'Heap Overflow' if full.
   */
  insert(value) {
    if (this.size >= this.maxSize) return "Heap Overflow";

    this.heap.push(value);
    this.size++;
    this._heapifyUp();
    return value;
  }

  /**
   * Removes and returns the maximum element (root) from the heap.
   * @returns {number} The removed max element, or -1 if heap is empty.
   */
  delete() {
    if (this.heap.length === 0) return -1;

    if (this.heap.length === 1) {
      this.size--;
      return this.heap.pop();
    }

    const max = this.heap[0];
    this.heap[0] = this.heap[this.size - 1];
    this.heap.pop();
    this.size--;
    this._heapifyDown();
    return max;
  }

  // ── Heapify Helpers ────────────────────────────────────────

  /**
   * Bubbles up the last inserted element to restore heap property.
   * @private
   */
  _heapifyUp() {
    let index = this.size - 1;

    while (index > 0) {
      const parentIndex = this.getParentIndex(index);

      if (this.heap[parentIndex] >= this.heap[index]) break;

      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];

      index = parentIndex;
    }
  }

  /**
   * Pushes the root element down to restore heap property after deletion.
   * @private
   * @param {number} [index=0] - Starting index (default is root).
   */
  _heapifyDown(index = 0) {
    let largest = index;
    const left = this.getLeftChildIndex(index);
    const right = this.getRightChildIndex(index);

    if (left !== -1 && this.heap[left] > this.heap[largest]) largest = left;
    if (right !== -1 && this.heap[right] > this.heap[largest]) largest = right;

    if (largest !== index) {
      [this.heap[index], this.heap[largest]] = [
        this.heap[largest],
        this.heap[index],
      ];
      this._heapifyDown(largest);
    }
  }

  // ── Build Helpers ──────────────────────────────────────────

  /**
   * Builds the heap by inserting elements one by one. O(n log n).
   * @param {number[]} arr - Array of values to insert.
   */
  buildHeap(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.insert(arr[i]);
    }
  }

  /**
   * Builds the heap in-place using Floyd's algorithm. O(n).
   * Note: Requires this.heap to already be populated with arr values.
   * @param {number[]} arr - Array to heapify in place.
   */
  buildHeapOptimized(arr) {
    this.heap = [...arr];
    this.size = arr.length;
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this._heapifyDown(i);
    }
  }

  /**
   * Prints the current heap array to the console.
   */
  print() {
    console.log(this.heap);
  }
}

// ─────────────────────────────────────────────────────────────
//  Section 2 — Standalone Heap Utilities (array-based)
// ─────────────────────────────────────────────────────────────

/**
 * Pushes an element down the heap to restore max-heap property.
 * Operates directly on the given array.
 * @param {number} index - Starting index for the heapify operation.
 * @param {number[]} arr - The heap array to operate on.
 */
function heapifyDown(index = 0, arr = []) {
  const size = arr.length;

  while (true) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let largest = index;

    if (left < size && arr[left] > arr[largest]) largest = left;
    if (right < size && arr[right] > arr[largest]) largest = right;

    if (largest === index) break;

    [arr[largest], arr[index]] = [arr[index], arr[largest]];
    index = largest;
  }
}

/**
 * Sorts an array in ascending order using the Heap Sort algorithm.
 * Time: O(n log n) | Space: O(n) (uses a copy).
 * @param {number[]} arr - The array to sort.
 * @returns {number[]} A new sorted array in ascending order.
 */
function heapSort(arr = []) {
  const newArr = [...arr];

  // Step 1: Build max-heap (Floyd's algorithm)
  const n = newArr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    _heapifyDownWithSize(i, n, newArr);
  }

  // Step 2: Extract elements from heap one by one
  for (let i = newArr.length - 1; i > 0; i--) {
    [newArr[i], newArr[0]] = [newArr[0], newArr[i]];
    _heapifyDownWithSize(0, i, newArr);
  }

  return newArr;
}

/**
 * Internal heapify used during heap sort with an explicit size boundary.
 * @private
 * @param {number} index - Starting index.
 * @param {number} size - Boundary of the heap within the array.
 * @param {number[]} arr - The array to operate on.
 */
function _heapifyDownWithSize(index, size, arr) {
  while (true) {
    let largest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    if (left < size && arr[left] > arr[largest]) largest = left;
    if (right < size && arr[right] > arr[largest]) largest = right;

    if (largest === index) break;

    [arr[largest], arr[index]] = [arr[index], arr[largest]];
    index = largest;
  }
}

// ─────────────────────────────────────────────────────────────
//  Section 3 — Heap Problem Solutions
// ─────────────────────────────────────────────────────────────

/**
 * Builds a max-heap in-place from a given array using Floyd's algorithm.
 * @param {number[]} arr - The array to convert into a max-heap.
 */
function buildMaxHeap(arr = []) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    stepDown(arr, i);
  }
}

/**
 * Sifts an element down within a max-heap to restore heap property.
 * @param {number[]} arr - The heap array.
 * @param {number} i - Index of the element to sift down.
 */
function stepDown(arr, i) {
  const size = arr.length;

  while (true) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;

    if (left < size && arr[left] > arr[largest]) largest = left;
    if (right < size && arr[right] > arr[largest]) largest = right; // Bug fix: was checking `left` instead of `right`

    if (i === largest) break;

    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    i = largest;
  }
}

/**
 * Removes and returns the maximum element from a max-heap array.
 * @param {number[]} arr - The heap array.
 * @returns {number} The removed maximum element, or 0 if heap is empty.
 */
function deleteFromMaxHeap(arr = []) {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr.pop();

  const max = arr[0];
  arr[0] = arr.pop();
  stepDown(arr, 0);
  return max;
}

/**
 * Inserts a value into a max-heap array and restores heap property.
 * @param {number[]} arr - The heap array.
 * @param {number} value - The value to insert.
 */
function insertIntoMaxHeap(arr = [], value) {
  arr.push(value);
  stepUp(arr, arr.length - 1);
}

/**
 * Bubbles an element up the heap to restore max-heap property after insertion.
 * @param {number[]} arr - The heap array.
 * @param {number} index - Index of the newly inserted element.
 */
function stepUp(arr = [], index) {
  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);

    if (arr[parent] < arr[index]) {
      [arr[parent], arr[index]] = [arr[index], arr[parent]];
      index = parent;
    } else {
      break;
    }
  }
}

// ─────────────────────────────────────────────────────────────
//  Problem 1: Maximum Chocolates
// ─────────────────────────────────────────────────────────────

/**
 * Finds the maximum total chocolates collectible in `a` turns.
 * Each turn: take the max pile, eat it, put back floor(max/2).
 *
 * @param {number} a - Number of turns.
 * @param {number[]} bag - Initial chocolate piles.
 * @returns {number} Total chocolates collected.
 *
 * @example
 * maxChocolates(3, [6, 5]) // => 14  (6 + 5 + 3)
 */
function maxChocolates(a, bag = []) {
  buildMaxHeap(bag);
  let total = 0;

  for (let i = 0; i < a; i++) {
    const max = deleteFromMaxHeap(bag);
    total += max;
    insertIntoMaxHeap(bag, Math.floor(max / 2));
  }

  return total;
}

// ─────────────────────────────────────────────────────────────
//  Problem 2: Last Stone Weight
// ─────────────────────────────────────────────────────────────

/**
 * Simulates smashing stones: repeatedly take the two heaviest,
 * smash them — if different, put the difference back.
 * Returns the weight of the last remaining stone (or 0).
 *
 * LeetCode #1046 — Last Stone Weight
 *
 * @param {number[]} arr - Array of stone weights.
 * @returns {number} Weight of the last stone, or 0 if none remain.
 *
 * @example
 * lastStoneWeight([2, 7, 4, 1, 8, 1]) // => 1
 */
function lastStoneWeight(arr) {
  buildMaxHeap(arr);

  while (arr.length > 1) {
    const stone1 = deleteFromMaxHeap(arr);
    const stone2 = deleteFromMaxHeap(arr);
    if (stone1 !== stone2) {
      insertIntoMaxHeap(arr, stone1 - stone2);
    }
  }

  return arr.length ? arr[0] : 0;
}

// ─────────────────────────────────────────────────────────────
//  Problem 3: Kth Smallest Element
// ─────────────────────────────────────────────────────────────

/**
 * Returns the kth smallest element using sort. O(n log n).
 * @param {number[]} arr - Input array.
 * @param {number} k - Rank (1-based).
 * @returns {number} The kth smallest element.
 *
 * @example
 * kthSmallest([7, 10, 4, 3, 20, 15], 3) // => 7
 */
function kthSmallest(arr = [], k) {
  arr.sort((a, b) => a - b);
  return arr[k - 1];
}

/**
 * Returns the kth smallest element by maintaining a sorted window.
 * More manual approach — useful for understanding the concept.
 * @param {number[]} arr - Input array.
 * @param {number} k - Rank (1-based).
 * @returns {number} The kth smallest element.
 *
 * @example
 * kthSmallestManual([7, 10, 4, 3, 20, 15], 3) // => 7
 */
function kthSmallestManual(arr = [], k) {
  const window = arr.slice(0, k).sort((a, b) => a - b);

  for (let i = k; i < arr.length; i++) {
    if (window[k - 1] <= arr[i]) continue;

    let j = k - 1;
    while (j > 0 && window[j - 1] > arr[i]) {
      j--;
    }
    window[j] = arr[i];
    window.sort((a, b) => a - b); // keep window sorted
  }

  return window[k - 1];
}

// ─────────────────────────────────────────────────────────────
//  Problem 4: Range Sum of Sorted Array (k1 to k2)
// ─────────────────────────────────────────────────────────────

/**
 * Returns the sum of elements with ranks between k1 and k2 (exclusive).
 * Translated from Java PriorityQueue (max-heap) approach.
 *
 * @param {number[]} nums - Input array.
 * @param {number} k1 - Lower rank bound (exclusive).
 * @param {number} k2 - Upper rank bound (exclusive).
 * @returns {number} Sum of elements between rank k1 and k2.
 *
 * @example
 * rangeSum([1, 3, 12, 5, 15, 11], 3, 6) // => 23  (5 + 7 + 11 → check sorted)
 */
function rangeSum(nums, k1, k2) {
  const maxHeap = [];

  for (const num of nums) {
    insertIntoMaxHeap(maxHeap, num);
    if (maxHeap.length >= k2) {
      deleteFromMaxHeap(maxHeap);
    }
  }

  let sum = 0;
  for (let i = 0; i < k2 - k1 - 1; i++) {
    sum += deleteFromMaxHeap(maxHeap);
  }

  return sum;
}

// ─────────────────────────────────────────────────────────────
//  Section 4 — Tree-Based Heap Problems
// ─────────────────────────────────────────────────────────────

/**
 * Checks whether a binary tree is a valid Max-Heap.
 * Validates both completeness and max-heap property.
 *
 * @param {TreeNode|null} root - Root of the binary tree.
 * @returns {boolean} True if the tree is a valid max-heap.
 */
function isValidMaxHeap(root) {
  if (!root) return true;
  const totalNodes = countNodes(root);
  return isCompleteTree(root, 0, totalNodes) && hasMaxHeapProperty(root);
}

/**
 * Counts the total number of nodes in a binary tree.
 * @param {TreeNode|null} root - Root of the binary tree.
 * @returns {number} Total node count.
 */
function countNodes(root) {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}

/**
 * Checks if a binary tree is a complete binary tree.
 * @param {TreeNode|null} node - Current node.
 * @param {number} index - Index of the current node (root = 0).
 * @param {number} total - Total number of nodes in the tree.
 * @returns {boolean} True if the subtree is complete.
 */
function isCompleteTree(node, index, total) {
  if (!node) return true;
  if (index >= total) return false;

  return (
    isCompleteTree(node.left, 2 * index + 1, total) &&
    isCompleteTree(node.right, 2 * index + 2, total)
  );
}

/**
 * Checks if a binary tree satisfies the max-heap property
 * (every node is >= its children).
 * @param {TreeNode|null} root - Root of the binary tree.
 * @returns {boolean} True if max-heap property holds throughout.
 */
function hasMaxHeapProperty(root) {
  if (!root) return true;
  if (root.left && root.val < root.left.val) return false;
  if (root.right && root.val < root.right.val) return false;
  return hasMaxHeapProperty(root.left) && hasMaxHeapProperty(root.right);
}

/**
 * Converts a Binary Search Tree (BST) into a Max-Heap
 * while preserving the complete binary tree structure.
 *
 * Strategy:
 *  1. Inorder traversal of BST → sorted values (ascending)
 *  2. Postorder traversal → assign values in ascending order
 *     so that parents always receive larger values than children.
 *
 * @param {TreeNode|null} root - Root of the BST.
 * @returns {TreeNode|null} Root of the modified tree (now a max-heap).
 */
function convertBSTtoMaxHeap(root) {
  const values = [];

  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    values.push(node.val);
    inorder(node.right);
  }

  let index = 0;
  function postorder(node) {
    if (!node) return;
    postorder(node.left);
    postorder(node.right);
    node.val = values[index++];
  }

  inorder(root);
  postorder(root);
  return root;
}

/**
 * Validates whether a binary tree is a valid Binary Search Tree (BST).
 * Uses min/max boundary approach.
 *
 * @param {TreeNode|null} root - Root of the binary tree.
 * @returns {boolean} True if the tree is a valid BST.
 *
 * @example
 * isBST(root) // => true or false
 */
function isBST(root) {
  function dfs(node, min, max) {
    if (!node) return true;
    if (node.val >= max || node.val <= min) return false;
    return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);
  }

  return dfs(root, -Infinity, Infinity);
}