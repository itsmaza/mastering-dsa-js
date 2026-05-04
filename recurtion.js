// =============================================================================
// Recursion & Algorithm Practice
// =============================================================================

// ─────────────────────────────────────────────
// BASIC RECURSION
// ─────────────────────────────────────────────

/**
 * Prints numbers from 1 to N recursively.
 * @param {number} n - Upper bound.
 * @param {number} current - Current number (used internally).
 */
const printOneToN = (n, current = 1) => {
    if (current > n) return;
    console.log(current);
    printOneToN(n, current + 1);
};

/**
 * Prints numbers from N down to 1 recursively.
 * @param {number} n
 */
const printNToOne = (n) => {
    if (n <= 0) return;
    console.log(n);
    printNToOne(n - 1);
};

/**
 * Calculates the sum of the first N natural numbers recursively.
 * @param {number} n
 * @returns {number}
 */
const sumOfN = (n) => {
    if (n <= 0) return 0;
    return n + sumOfN(n - 1);
};

/**
 * Calculates the factorial of N recursively.
 * @param {number} n
 * @returns {number}
 */
const factorial = (n) => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
};

// ─────────────────────────────────────────────
// FIBONACCI
// ─────────────────────────────────────────────

/**
 * Calculates the Nth Fibonacci number using recursion with memoization.
 * Time: O(n), Space: O(n)
 * @param {number} n
 * @param {Object} memo - Cache object (used internally).
 * @returns {number}
 */
const fibonacciMemo = (n, memo = {}) => {
    if (n <= 1) return n;
    if (memo[n] !== undefined) return memo[n];
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
};

/**
 * Calculates the Nth Fibonacci number iteratively.
 * Time: O(n), Space: O(1)
 * @param {number} n
 * @returns {number}
 */
const fibonacciIterative = (n) => {
    if (n <= 1) return n;
    let prev = 0;
    let curr = 1;
    for (let i = 2; i <= n; i++) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }
    return curr;
};

// ─────────────────────────────────────────────
// STRING OPERATIONS
// ─────────────────────────────────────────────

/**
 * Reverses a string recursively.
 * @param {string} str
 * @returns {string}
 */
const reverseString = (str = '') => {
    if (str.length <= 1) return str;
    return reverseString(str.slice(1)) + str[0];
};

/**
 * Checks if a string is a palindrome recursively.
 * @param {string} str
 * @returns {boolean}
 */
const isPalindrome = (str = '') => {
    if (str.length <= 1) return true;
    if (str[0] !== str[str.length - 1]) return false;
    return isPalindrome(str.slice(1, -1));
};

/**
 * Counts the frequency of each character in a string recursively.
 * @param {string} str
 * @param {Object} result - Accumulator (used internally).
 * @returns {Object} Map of character to count.
 */
const characterCount = (str = '', result = {}) => {
    if (str.length === 0) return result;
    const cleaned = str.replace(' ', '');
    result[cleaned[0]] = (result[cleaned[0]] || 0) + 1;
    return characterCount(cleaned.slice(1), result);
};

/**
 * Removes all occurrences of the letter 'a' from a string recursively.
 * @param {string} str
 * @returns {string}
 */
const removeLetterA = (str = '') => {
    if (str === '') return '';
    return str[0] !== 'a'
        ? str[0] + removeLetterA(str.slice(1))
        : removeLetterA(str.slice(1));
};

// ─────────────────────────────────────────────
// ARRAY OPERATIONS
// ─────────────────────────────────────────────

/**
 * Calculates the sum of all elements in an array recursively.
 * @param {number[]} arr
 * @param {number} index - Current index (used internally).
 * @returns {number}
 */
const sumOfArray = (arr = [], index = 0) => {
    if (index === arr.length) return 0;
    return arr[index] + sumOfArray(arr, index + 1);
};

/**
 * Finds the maximum element in an array recursively.
 * @param {number[]} arr
 * @param {number} max - Running maximum (used internally).
 * @returns {number}
 */
const maxElement = (arr = [], max = -Infinity) => {
    if (arr.length === 0) return max;
    const newMax = arr[0] > max ? arr[0] : max;
    return maxElement(arr.slice(1), newMax);
};

/**
 * Reverses an array in place using recursion (two-pointer swap).
 * @param {Array} arr
 * @param {number} left - Left index (used internally).
 * @param {number} right - Right index (used internally).
 * @returns {Array}
 */
const reverseArray = (arr = [], left = 0, right = arr.length - 1) => {
    if (left >= right) return arr;
    [arr[left], arr[right]] = [arr[right], arr[left]];
    return reverseArray(arr, left + 1, right - 1);
};

/**
 * Calculates the sum of all digits of a number recursively.
 * @param {number} n
 * @returns {number}
 */
const sumOfDigits = (n) => {
    if (n < 10) return n;
    return (n % 10) + sumOfDigits(Math.floor(n / 10));
};

/**
 * Counts the number of ways to climb N stairs
 * (can take 1 or 2 steps at a time) recursively.
 * @param {number} n
 * @returns {number}
 */
const countClimbingWays = (n) => {
    if (n <= 2) return n;
    return countClimbingWays(n - 1) + countClimbingWays(n - 2);
};

// ─────────────────────────────────────────────
// SUBSETS & COMBINATIONS
// ─────────────────────────────────────────────

/**
 * Generates all contiguous subarrays of an array recursively.
 * @param {Array} arr
 * @param {number} start - Start index (used internally).
 * @param {Array} result - Accumulator (used internally).
 * @returns {Array[]}
 */
const generateSubarrays = (arr = [], start = 0, result = []) => {
    if (start === arr.length) return result;
    for (let end = start; end < arr.length; end++) {
        result.push(arr.slice(start, end + 1));
    }
    return generateSubarrays(arr, start + 1, result);
};

/**
 * Generates all contiguous substrings of a string recursively.
 * Skips duplicates.
 * @param {string} str
 * @param {number} start - Start index (used internally).
 * @param {Array} result - Accumulator (used internally).
 * @returns {string[]}
 */
const generateSubstrings = (str = '', start = 0, result = []) => {
    if (start === str.length) return result;
    for (let i = start; i < str.length; i++) {
        const sub = str.slice(start, i + 1);
        if (!result.includes(sub)) result.push(sub);
    }
    return generateSubstrings(str, start + 1, result);
};

/**
 * Generates all contiguous subsets with their sums from an array recursively.
 * @param {number[]} arr
 * @param {number} start - Start index (used internally).
 * @param {Array} result - Accumulator (used internally).
 * @returns {{ items: number[], sum: number }[]}
 */
const generateSubsetSums = (arr = [], start = 0, result = []) => {
    if (start === arr.length) return result;
    for (let end = start; end < arr.length; end++) {
        const items = arr.slice(start, end + 1);
        result.push({ items, sum: items.reduce((a, b) => a + b, 0) });
    }
    return generateSubsetSums(arr, start + 1, result);
};

// ─────────────────────────────────────────────
// SEARCH
// ─────────────────────────────────────────────

/**
 * Searches for a target in an array using linear search recursively.
 * @param {Array} arr
 * @param {*} target
 * @param {number} index - Current index (used internally).
 * @returns {boolean}
 */
const linearSearch = (arr = [], target, index = 0) => {
    if (index === arr.length) return false;
    if (arr[index] === target) return true;
    return linearSearch(arr, target, index + 1);
};

/**
 * Searches for a target in a sorted array using binary search recursively.
 * @param {number[]} arr - Sorted array.
 * @param {number} target
 * @param {number} left - Left bound (used internally).
 * @param {number} right - Right bound (used internally).
 * @returns {boolean}
 */
const binarySearchRecursive = (arr = [], target, left = 0, right = arr.length - 1) => {
    if (left > right) return false;
    const mid = Math.floor(left + (right - left) / 2);
    if (arr[mid] === target) return true;
    if (arr[mid] > target) return binarySearchRecursive(arr, target, left, mid - 1);
    return binarySearchRecursive(arr, target, mid + 1, right);
};

/**
 * Searches for a target in a sorted array using binary search iteratively.
 * @param {number[]} arr - Sorted array.
 * @param {number} target
 * @returns {number} Index of target, or -1 if not found.
 */
const binarySearchIterative = (arr = [], target) => {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
};

// ─────────────────────────────────────────────
// TWO SUM
// ─────────────────────────────────────────────

/**
 * Finds two indices whose values sum to target using recursion.
 * @param {number[]} arr
 * @param {number} target
 * @param {number} start - Start index (used internally).
 * @returns {number[]|null} Pair of indices, or null if not found.
 */
const twoSumRecursive = (arr = [], target, start = 0) => {
    if (start >= arr.length) return null;
    for (let end = start + 1; end < arr.length; end++) {
        if (arr[start] + arr[end] === target) return [start, end];
    }
    return twoSumRecursive(arr, target, start + 1);
};

/**
 * Finds two indices whose values sum to target using a HashMap.
 * Time: O(n), Space: O(n)
 * @param {number[]} arr
 * @param {number} target
 * @returns {number[]|null}
 */
const twoSumHashMap = (arr = [], target) => {
    const seen = {};
    for (let i = 0; i < arr.length; i++) {
        const complement = target - arr[i];
        if (seen[complement] !== undefined) return [seen[complement], i];
        seen[arr[i]] = i;
    }
    return null;
};

// ─────────────────────────────────────────────
// SORTING
// ─────────────────────────────────────────────

/**
 * Sorts an array using Selection Sort.
 * Time: O(n²), Space: O(1)
 * @param {number[]} arr
 * @returns {number[]}
 */
const selectionSort = (arr = []) => {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) minIndex = j;
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
};

/**
 * Sorts an array using Bubble Sort (optimized with early exit).
 * Time: O(n²) worst, O(n) best, Space: O(1)
 * @param {number[]} arr
 * @returns {number[]}
 */
const bubbleSort = (arr = []) => {
    for (let i = 0; i < arr.length; i++) {
        let swapped = false;
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
};

/**
 * Sorts an array using Bubble Sort recursively.
 * @param {number[]} arr
 * @param {number} n - Number of elements to consider (used internally).
 */
const bubbleSortRecursive = (arr = [], n = arr.length) => {
    if (n === 1) return;
    for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        }
    }
    bubbleSortRecursive(arr, n - 1);
};

/**
 * Sorts an array using Merge Sort (returns new array).
 * Time: O(n log n), Space: O(n)
 * @param {number[]} arr
 * @returns {number[]}
 */
const mergeSort = (arr = []) => {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return mergeSortedArrays(left, right);
};

/**
 * Merges two sorted arrays into one sorted array.
 * Helper for mergeSort.
 * @param {number[]} left
 * @param {number[]} right
 * @returns {number[]}
 */
const mergeSortedArrays = (left = [], right = []) => {
    const result = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    while (i < left.length) result.push(left[i++]);
    while (j < right.length) result.push(right[j++]);
    return result;
};

/**
 * Sorts an array using Quick Sort (returns new array).
 * Time: O(n log n) average, O(n²) worst, Space: O(n)
 * @param {number[]} arr
 * @returns {number[]}
 */
const quickSort = (arr = []) => {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) left.push(arr[i]);
        else right.push(arr[i]);
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
};

/**
 * Sorts an array using Quick Sort in-place.
 * Time: O(n log n) average, Space: O(log n)
 * @param {number[]} arr
 * @param {number} low - Left bound (used internally).
 * @param {number} high - Right bound (used internally).
 * @returns {number[]}
 */
const quickSortInPlace = (arr = [], low = 0, high = arr.length - 1) => {
    if (low < high) {
        const pivotIndex = partitionForQuickSort(arr, low, high);
        quickSortInPlace(arr, low, pivotIndex - 1);
        quickSortInPlace(arr, pivotIndex + 1, high);
    }
    return arr;
};

/**
 * Partitions the array around a pivot for in-place Quick Sort.
 * @param {number[]} arr
 * @param {number} low
 * @param {number} high
 * @returns {number} Final pivot index.
 */
const partitionForQuickSort = (arr = [], low, high) => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
};

// ─────────────────────────────────────────────
// SLIDING WINDOW
// ─────────────────────────────────────────────

/**
 * Finds the minimum window substring in `str` that contains all chars of `t`.
 * Uses the sliding window technique. Time: O(n), Space: O(k)
 * @param {string} str - The source string.
 * @param {string} t - The target characters string.
 * @returns {string} Minimum window, or '' if not found.
 */
const minimumWindowSubstring = (str = '', t = '') => {
    if (str.length === 0 || t.length === 0) return '';

    const charCount = {};
    for (const char of t) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    let left = 0;
    let needed = t.length;
    let start = 0;
    let minLen = Infinity;

    for (let right = 0; right < str.length; right++) {
        const rightChar = str[right];
        if (charCount[rightChar] !== undefined) {
            if (charCount[rightChar] > 0) needed--;
            charCount[rightChar]--;
        }

        while (needed === 0) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                start = left;
            }
            const leftChar = str[left];
            if (charCount[leftChar] !== undefined) {
                charCount[leftChar]++;
                if (charCount[leftChar] > 0) needed++;
            }
            left++;
        }
    }

    return minLen === Infinity ? '' : str.substring(start, start + minLen);
};

/**
 * Finds the length of the longest substring with at most K distinct characters.
 * Uses the sliding window technique. Time: O(n), Space: O(k)
 * @param {string} str
 * @param {number} k - Max number of distinct characters allowed.
 * @returns {number}
 */
const longestSubstringWithKDistinct = (str = '', k = 0) => {
    const charMap = {};
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < str.length; right++) {
        const curr = str[right];
        charMap[curr] = (charMap[curr] || 0) + 1;

        while (Object.keys(charMap).length > k) {
            const leftChar = str[left];
            charMap[leftChar]--;
            if (charMap[leftChar] === 0) delete charMap[leftChar];
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};

// ─────────────────────────────────────────────
// SUBARRAY SUM (KADANE'S ALGORITHM)
// ─────────────────────────────────────────────

/**
 * Finds the maximum sum of any contiguous subarray using Kadane's algorithm.
 * Time: O(n), Space: O(1)
 * @param {number[]} arr
 * @returns {number}
 */
const maxSubarraySum = (arr = []) => {
    let currentSum = arr[0];
    let maxSum = arr[0];

    for (let i = 1; i < arr.length; i++) {
        currentSum = Math.max(arr[i], currentSum + arr[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
};

/**
 * Finds the maximum sum of any contiguous subarray using brute force.
 * Time: O(n²), Space: O(1)
 * @param {number[]} arr
 * @returns {number}
 */
const maxSubarraySumBrute = (arr = []) => {
    let maxSum = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        let currSum = 0;
        for (let j = i; j < arr.length; j++) {
            currSum += arr[j];
            if (currSum > maxSum) maxSum = currSum;
        }
    }
    return maxSum;
};

// ─────────────────────────────────────────────
// DEEP OBJECT SUM
// ─────────────────────────────────────────────

/**
 * Recursively sums all numeric values in a deeply nested object.
 * @param {Object} obj
 * @returns {number}
 */
const deepObjectSum = (obj) => {
    return Object.values(obj).reduce((acc, curr) => {
        if (typeof curr === 'number') return acc + curr;
        if (typeof curr === 'object' && curr !== null) return acc + deepObjectSum(curr);
        return acc;
    }, 0);
};

// ─────────────────────────────────────────────
// SHIP CAPACITY (BINARY SEARCH ON ANSWER)
// ─────────────────────────────────────────────

/**
 * Finds the minimum ship capacity to deliver all packages within given days.
 * Uses binary search on the answer. Time: O(n log(sum)), Space: O(1)
 * @param {number[]} weights
 * @param {number} days
 * @returns {number}
 */
const minShipCapacity = (weights = [], days = 0) => {
    let low = Math.max(...weights);
    let high = weights.reduce((acc, curr) => acc + curr, 0);
    let answer = low;

    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (canShipInDays(weights, mid, days)) {
            answer = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return answer;
};

/**
 * Checks if all packages can be shipped within `days` with given `limit` per day.
 * @param {number[]} weights
 * @param {number} limit
 * @param {number} days
 * @returns {boolean}
 */
const canShipInDays = (weights = [], limit, days) => {
    let dayCount = 1;
    let total = 0;
    for (let i = 0; i < weights.length; i++) {
        if (total + weights[i] > limit) {
            dayCount++;
            total = weights[i];
        } else {
            total += weights[i];
        }
    }
    return dayCount <= days;
};