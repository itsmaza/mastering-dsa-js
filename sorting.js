// ========================
// Sorting Algorithms
// ========================

/**
 * Sorts an array in ascending order using Bubble Sort.
 * Optimized with early exit if no swaps occur in a pass.
 * @param {number[]} arr - The input array to sort
 * @returns {number[]} The sorted array
 */
const bubbleSort = (arr = []) => {
    for (let i = 0; i < arr.length - 1; i++) {
        let isSwapped = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                isSwapped = true;
            }
        }
        if (!isSwapped) return arr;
    }
    return arr;
};

/**
 * Sorts an array in ascending order using Selection Sort.
 * Finds the minimum element in each pass and swaps it to the correct position.
 * @param {number[]} arr - The input array to sort
 * @returns {number[]} The sorted array
 */
const selectionSort = (arr = []) => {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
};

/**
 * Sorts an array in ascending order using Insertion Sort.
 * Builds the sorted array one element at a time.
 * @param {number[]} arr - The input array to sort
 * @returns {number[]} The sorted array
 */
const insertionSort = (arr = []) => {
    for (let i = 1; i < arr.length; i++) {
        const current = arr[i];
        let prev = i - 1;
        while (prev >= 0 && arr[prev] > current) {
            arr[prev + 1] = arr[prev];
            prev--;
        }
        arr[prev + 1] = current;
    }
    return arr;
};

/**
 * Sorts an array of strings by their character length using Bubble Sort.
 * @param {string[]} arr - The input array of strings
 * @returns {string[]} The sorted array ordered by string length
 */
const sortByWordLength = (arr = []) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j].length > arr[j + 1].length) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
};

/**
 * Sorts an array containing only 0s, 1s, and 2s in-place using the Dutch National Flag algorithm.
 * Time Complexity: O(n), Space Complexity: O(1)
 * @param {number[]} arr - Array containing only 0, 1, and 2
 * @returns {number[]} The sorted array
 */
const dutchNationalFlag = (arr = []) => {
    let low = 0;
    let high = arr.length - 1;
    let mid = 0;

    while (mid <= high) {
        if (arr[mid] === 0) {
            [arr[mid], arr[low]] = [arr[low], arr[mid]];
            low++;
            mid++;
        } else if (arr[mid] === 1) {
            mid++;
        } else {
            [arr[mid], arr[high]] = [arr[high], arr[mid]];
            high--;
        }
    }
    return arr;
};

/**
 * Sorts an array of 0s, 1s, and 2s by counting occurrences (Count Sort approach).
 * @param {number[]} arr - Array containing only 0, 1, and 2
 * @returns {number[]} The sorted array
 */
const sortColors = (arr = []) => {
    let count0 = 0, count1 = 0, count2 = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0) count0++;
        else if (arr[i] === 1) count1++;
        else count2++;
    }

    let currentIndex = 0;
    for (let i = 0; i < count0; i++) arr[currentIndex++] = 0;
    for (let i = 0; i < count1; i++) arr[currentIndex++] = 1;
    for (let i = 0; i < count2; i++) arr[currentIndex++] = 2;

    return arr;
};

/**
 * Sorts even-indexed positions with even numbers and odd-indexed positions with odd numbers.
 * Uses a two-pointer approach for in-place sorting.
 * @param {number[]} nums - The input array
 * @returns {number[]} The rearranged array
 */
const sortArrayByParityII = (nums = []) => {
    let even = 0, odd = 1;
    const n = nums.length;

    while (even < n && odd < n) {
        if (nums[even] % 2 === 0) {
            even += 2;
        } else if (nums[odd] % 2 === 1) {
            odd += 2;
        } else {
            [nums[even], nums[odd]] = [nums[odd], nums[even]];
            even += 2;
            odd += 2;
        }
    }
    return nums;
};

/**
 * Moves all even numbers before odd numbers in the array.
 * Uses Dutch National Flag two-pointer technique.
 * @param {number[]} nums - The input array
 * @returns {number[]} Array with evens first, odds last
 */
const sortArrayByParity = (nums = []) => {
    let low = 0, mid = 0, high = nums.length - 1;

    while (mid <= high) {
        if (nums[mid] % 2 === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else {
            mid++;
        }
    }
    return nums;
};

/**
 * Sorts characters in a string by their frequency in descending order.
 * @param {string} str - The input string
 * @returns {string} A new string with characters sorted by frequency
 */
const sortCharactersByFrequency = (str = '') => {
    let result = '';
    const freqMap = {};

    for (const char of str) {
        freqMap[char] = (freqMap[char] || 0) + 1;
    }

    const sorted = Object.entries(freqMap).sort((a, b) => b[1] - a[1]);

    for (const [char, freq] of sorted) {
        result += char.repeat(freq);
    }
    return result;
};

// ========================
// Quick Sort
// ========================

/**
 * Partitions the array around a pivot element (last element).
 * Elements smaller than pivot go left, larger go right.
 * @param {number[]} arr - The array to partition
 * @param {number} start - Start index
 * @param {number} end - End index (pivot position)
 * @returns {number} The final index of the pivot
 */
function partition(arr, start, end) {
    let pivotIndex = start - 1;
    const pivot = arr[end];

    for (let i = start; i < end; i++) {
        if (arr[i] < pivot) {
            pivotIndex++;
            [arr[pivotIndex], arr[i]] = [arr[i], arr[pivotIndex]];
        }
    }
    pivotIndex++;
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    return pivotIndex;
}

/**
 * Sorts an array using the Quick Sort algorithm.
 * Average Time Complexity: O(n log n)
 * @param {number[]} arr - The input array to sort
 * @param {number} [start=0] - Start index
 * @param {number} [end=arr.length-1] - End index
 * @returns {number[]} The sorted array
 */
function quickSort(arr, start = 0, end = arr.length - 1) {
    if (start < end) {
        const pivotIndex = partition(arr, start, end);
        quickSort(arr, start, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, end);
    }
    return arr;
}

// ========================
// Merge Two Sorted Arrays
// ========================

/**
 * Merges two sorted arrays nums1 and nums2 into nums1 in-place.
 * nums1 has extra space at the end to accommodate nums2 elements.
 * @param {number[]} nums1 - First sorted array with extra space (size m + n)
 * @param {number} m - Number of valid elements in nums1
 * @param {number[]} nums2 - Second sorted array
 * @param {number} n - Number of elements in nums2
 * @returns {number[]} The merged sorted array (nums1 modified in-place)
 */
const mergeTwoSortedArrays = (nums1, m, nums2, n) => {
    let idx = m + n - 1;
    let i = m - 1;
    let j = n - 1;

    while (i >= 0 && j >= 0) {
        if (nums1[i] >= nums2[j]) {
            nums1[idx--] = nums1[i--];
        } else {
            nums1[idx--] = nums2[j--];
        }
    }
    while (j >= 0) {
        nums1[idx--] = nums2[j--];
    }
    return nums1;
};

// ========================
// Binary Search Variants
// ========================

/**
 * Searches for a target in a rotated sorted array (no duplicates).
 * Returns the index of the target, or -1 if not found.
 * Time Complexity: O(log n)
 * @param {number[]} arr - Rotated sorted array with unique values
 * @param {number} target - The value to search for
 * @returns {number} Index of target, or -1 if not found
 */
const searchInRotatedSortedArray = (arr = [], target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (arr[mid] === target) return mid;

        if (arr[mid] >= arr[left]) {
            if (arr[left] <= target && target < arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (arr[mid] < target && target <= arr[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
};

/**
 * Searches for a target in a rotated sorted array that may contain duplicates.
 * Returns true if found, false otherwise.
 * Time Complexity: O(log n) average, O(n) worst case
 * @param {number[]} arr - Rotated sorted array (may have duplicates)
 * @param {number} target - The value to search for
 * @returns {boolean} True if target exists, false otherwise
 */
const searchInRotatedSortedArrayWithDuplicates = (arr = [], target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (arr[mid] === target) return true;

        if (arr[left] === arr[mid] && arr[mid] === arr[right]) {
            left++;
            right--;
            continue;
        }

        if (arr[left] <= arr[mid]) {
            if (arr[left] <= target && target < arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (arr[mid] < target && target <= arr[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return false;
};

/**
 * Finds the minimum element in a rotated sorted array.
 * Time Complexity: O(log n)
 * @param {number[]} arr - A rotated sorted array
 * @returns {number} The minimum value in the array
 */
const findMinimumInRotatedArray = (arr = []) => {
    let start = 0;
    let end = arr.length - 1;

    while (start < end) {
        const mid = Math.floor(start + (end - start) / 2);
        if (arr[mid] > arr[end]) {
            start = mid + 1;
        } else {
            end = mid;
        }
    }
    return arr[end];
};

/**
 * Finds the index where target should be inserted in a sorted array.
 * If target exists, returns its index.
 * Time Complexity: O(log n)
 * @param {number[]} arr - A sorted array of distinct integers
 * @param {number} target - The target value
 * @returns {number} Index of target or insertion position
 */
const searchInsertPosition = (arr = [], target) => {
    let start = 0, end = arr.length - 1;

    while (start <= end) {
        const mid = Math.floor(start + (end - start) / 2);
        if (arr[mid] === target) return mid;
        if (target > arr[mid]) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return start;
};

// ========================
// Array Problems
// ========================

/**
 * Increments a large number represented as an array of digits by one.
 * @param {number[]} digits - Array of digits representing a non-negative integer
 * @returns {number[]} The incremented number as a digit array
 */
const plusOne = (digits) => {
    for (let i = digits.length - 1; i >= 0; i--) {
        digits[i]++;
        if (digits[i] < 10) return digits;
        digits[i] = 0;
    }
    digits.unshift(1);
    return digits;
};

/**
 * Checks if the array contains any duplicate values.
 * @param {number[]} nums - The input array
 * @returns {boolean} True if no duplicates found, false if duplicates exist
 */
const containsDuplicate = (nums) => {
    return nums.filter((val, i) => nums.indexOf(val) !== i).length === 0;
};

/**
 * Checks if the array has any duplicate values using linear scan.
 * @param {number[]} nums - The input array
 * @returns {boolean} True if a duplicate exists, false otherwise
 */
const hasDuplicate = (nums = []) => {
    for (let i = 0; i < nums.length; i++) {
        const temp = nums.slice(i + 1);
        if (temp.includes(nums[i])) return true;
    }
    return false;
};

// ========================
// String Problems
// ========================

/**
 * Checks if two strings are anagrams of each other.
 * Uses a frequency map for O(n) time complexity.
 * @param {string} s - First string
 * @param {string} t - Second string
 * @returns {boolean} True if s and t are anagrams, false otherwise
 */
const isAnagram = (s, t) => {
    if (s.length !== t.length) return false;

    const freqMap = {};
    for (let i = 0; i < s.length; i++) {
        freqMap[s[i]] = (freqMap[s[i]] || 0) + 1;
    }

    for (const char of t) {
        if (freqMap[char] && freqMap[char] > 0) {
            freqMap[char]--;
        } else {
            return false;
        }
    }
    return true;
};

// ========================
// Recursion
// ========================

/**
 * Solves the Tower of Hanoi puzzle recursively.
 * Moves n disks from source peg to destination peg using an auxiliary peg.
 * @param {number} n - Number of disks
 * @param {string} source - The source peg name
 * @param {string} destination - The destination peg name
 * @param {string} auxiliary - The auxiliary peg name
 * @returns {void}
 */
function towerOfHanoi(n, source, destination, auxiliary) {
    if (n === 1) {
        console.log(`Move disk 1 from ${source} to ${destination}`);
        return;
    }
    towerOfHanoi(n - 1, source, auxiliary, destination);
    console.log(`Move disk ${n} from ${source} to ${destination}`);
    towerOfHanoi(n - 1, auxiliary, destination, source);
}