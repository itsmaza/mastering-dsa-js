// ============================================================
// DSA Practice - JavaScript
// Clean, documented, duplicate-free reference
// ============================================================

// ─── Decimal ↔ Binary ───────────────────────────────────────

/**
 * Converts a decimal number to its binary string (iterative).
 * @param {number} num - Positive integer to convert
 * @returns {string} Binary string representation
 */
function decimalToBinary(num) {
    let result = '';
    while (num > 0) {
        result = (num % 2) + result;
        num = Math.floor(num / 2);
    }
    return result;
}

/**
 * Converts a decimal number to its binary string (recursive).
 * @param {number} num - Positive integer to convert
 * @returns {string} Binary string representation
 */
function decimalToBinaryRecursive(num) {
    if (num < 1) return '';
    return decimalToBinaryRecursive(Math.floor(num / 2)) + (num % 2);
}

/**
 * Converts a binary number (e.g. 1010) to its decimal value (iterative).
 * @param {number} binary - Binary number as integer digits
 * @returns {number} Decimal equivalent
 */
function binaryToDecimal(binary) {
    let pow = 0;
    let decimal = 0;
    const base = 2;
    while (binary > 0) {
        decimal = (binary % 2) * base ** pow + decimal;
        binary = Math.floor(binary / 10);
        pow++;
    }
    return decimal;
}

/**
 * Converts a binary number to its decimal value (recursive).
 * @param {number} binary - Binary number as integer digits
 * @param {number} [pow=0] - Current power of 2 (used internally)
 * @returns {number} Decimal equivalent
 */
function binaryToDecimalRecursive(binary, pow = 0) {
    if (binary < 1) return 0;
    return binaryToDecimalRecursive(Math.floor(binary / 10), pow + 1) + (binary % 2) * 2 ** pow;
}

// ─── Array Utilities ─────────────────────────────────────────

/**
 * Separates an array into unique (linear) and duplicate elements.
 * @param {Array} arr - Input array
 * @returns {{ linear: Array, duplicate: Array }}
 */
function findDuplicateAndLinear(arr = []) {
    const linear = [];
    const duplicate = [];

    for (let i = 0; i < arr.length; i++) {
        if (linear.includes(arr[i])) {
            duplicate.push(arr[i]);
        } else {
            linear.push(arr[i]);
        }
    }
    return { linear, duplicate };
}

/**
 * Removes all duplicate elements, keeping only the first occurrence.
 * @param {Array} arr - Input array
 * @returns {Array} Array with duplicates removed
 */
function removeDuplicateElement(arr = []) {
    return arr.filter((item, i, self) => self.indexOf(item) === i);
}

/**
 * Extracts all elements that appear more than once (includes every repeat).
 * @param {Array} arr - Input array
 * @returns {Array} Duplicate elements
 */
function extractDuplicateElement(arr = []) {
    return arr.filter((item, i, self) => self.indexOf(item) !== i);
}

/**
 * Extracts unique duplicate values — each duplicate counted once.
 * @param {Array} arr - Input array
 * @returns {Array} Unique duplicate values
 */
function extractUniqueDuplicateElement(arr = []) {
    return arr
        .filter((item, i, self) => self.indexOf(item) !== i)
        .filter((value, j, self) => self.indexOf(value) === j);
}

/**
 * Keeps only elements that appear exactly once; removes all others.
 * Time: O(n)  Space: O(n)
 * @param {Array} arr - Input array
 * @returns {Array} Truly unique elements
 */
function removeDuplicateValue(arr = []) {
    const freq = {};
    for (let num of arr) {
        freq[num] = (freq[num] || 0) + 1;
    }
    return arr.filter((item) => freq[item] === 1);
}

/**
 * Keeps only elements that appear exactly once (recursive version).
 * @param {Array} arr - Input array
 * @param {number} [start=0] - Current index (used internally)
 * @param {Array} [result=[]] - Accumulated result (used internally)
 * @returns {Array} Truly unique elements
 */
function removeDuplicateValueRecursive(arr = [], start = 0, result = []) {
    if (arr.length === start) return result;
    if (!result.includes(arr[start])) result.push(arr[start]);
    return removeDuplicateValueRecursive(arr, start + 1, result);
}

/**
 * Removes duplicates from a sorted array in-place.
 * Returns the count of unique elements.
 * @param {number[]} nums - Sorted input array
 * @returns {number} Count of unique elements
 */
function removeDuplicatesInPlace(nums) {
    if (nums.length === 0) return 0;

    let i = 0;
    for (let j = 1; j < nums.length; j++) {
        if (nums[j] !== nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1;
}

// ─── Single Number ────────────────────────────────────────────

/**
 * Finds the element that appears only once using a frequency map.
 * Time: O(n)  Space: O(n)
 * @param {number[]} arr - Every element appears twice except one
 * @returns {number|string} The single number
 */
function singleNumber(arr = []) {
    const freq = {};
    for (let i = 0; i < arr.length; i++) {
        freq[arr[i]] = (freq[arr[i]] || 0) + 1;
    }
    for (let num in freq) {
        if (freq[num] === 1) return +num;
    }
    return '';
}

/**
 * Finds the element that appears only once using XOR.
 * Time: O(n)  Space: O(1)
 * @param {number[]} arr - Every element appears twice except one
 * @returns {number} The single number, or -1 if all appear twice
 */
function singleNumberXOR(arr = []) {
    let result = 0;
    for (let num of arr) result ^= num;
    return result === 0 ? -1 : result;
}

/**
 * Finds the element that appears only once using XOR (recursive).
 * @param {number[]} arr - Every element appears twice except one
 * @param {number} [index=0] - Current index (used internally)
 * @returns {number} The single number
 */
function singleNumberRecursive(arr = [], index = 0) {
    if (index === arr.length) return 0;
    return arr[index] ^ singleNumberRecursive(arr, index + 1);
}

/**
 * Finds the single non-duplicate in a sorted array using binary search.
 * Time: O(log n)  Space: O(1)
 * Array must be sorted with all duplicates adjacent.
 * @param {number[]} arr - Sorted input array
 * @returns {number} The single number
 */
function singleNumberBinarySearch(arr = []) {
    let start = 0;
    let end = arr.length - 1;

    while (start < end) {
        let mid = Math.floor(start + (end - start) / 2);
        if (mid % 2 === 1) mid--;
        if (arr[mid] === arr[mid + 1]) start = mid + 2;
        else end = mid;
    }
    return arr[start];
}

// ─── Subarray Problems ────────────────────────────────────────

/**
 * Finds the maximum subarray sum (brute-force recursive).
 * Time: O(n²)  — prefer kadane() for O(n).
 * @param {number[]} arr - Input array
 * @param {number} [start=0] - Current start index (used internally)
 * @param {number} [maxSum=-Infinity] - Current best sum (used internally)
 * @returns {number} Maximum subarray sum
 */
function maxSubarraySum(arr = [], start = 0, maxSum = -Infinity) {
    if (start === arr.length) return maxSum;

    for (let i = start; i < arr.length; i++) {
        const current = arr.slice(start, i + 1).reduce((acc, curr) => acc + curr, 0);
        if (current > maxSum) maxSum = current;
    }
    return maxSubarraySum(arr, start + 1, maxSum);
}

/**
 * Finds the maximum subarray sum using Kadane's algorithm.
 * Time: O(n)  Space: O(1)
 * @param {number[]} arr - Input array
 * @returns {number} Maximum subarray sum
 */
function kadane(arr) {
    let maxSoFar = arr[0];
    let current = arr[0];

    for (let i = 1; i < arr.length; i++) {
        current = Math.max(arr[i], current + arr[i]);
        maxSoFar = Math.max(maxSoFar, current);
    }
    return maxSoFar;
}

/**
 * Finds start and end indices of a subarray whose sum equals k.
 * Time: O(n²)
 * @param {number[]} arr - Input array
 * @param {number} k - Target sum
 * @returns {Array} [startIndex, '--->', endIndex] or empty array
 */
function subarraySum(arr = [], k) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            const sum = arr.slice(i, j + 1).reduce((acc, curr) => acc + curr, 0);
            if (sum === k) return [i, '--->', j];
        }
    }
    return [];
}

/**
 * Finds the maximum sum of any contiguous subarray of size k (sliding window).
 * Time: O(n)  Space: O(1)
 * @param {number[]} arr - Input array
 * @param {number} k - Window size
 * @returns {number} Maximum k-length subarray sum
 */
function maxSumOfK(arr, k) {
    let sum = 0;
    let maxSum = -Infinity;

    for (let i = 0; i < k; i++) sum += arr[i];
    maxSum = Math.max(maxSum, sum);

    for (let i = k; i < arr.length; i++) {
        sum += arr[i] - arr[i - k];
        maxSum = Math.max(sum, maxSum);
    }
    return maxSum;
}

// ─── String Utilities ─────────────────────────────────────────

/**
 * Returns the first non-repeating character in a string.
 * Time: O(n)  Space: O(n)
 * @param {string} str - Input string
 * @returns {string} First unique char, or '_' if none found
 */
function returnFirstUniqueChar(str = '') {
    const freq = {};
    for (let char of str) freq[char] = (freq[char] || 0) + 1;
    for (let char of str) {
        if (freq[char] === 1) return char;
    }
    return '_';
}

/**
 * Returns the first non-repeating character by scanning with slice.
 * @param {string} str - Input string
 * @returns {string|number} First non-repeating char, or -1 if none
 */
function firstNonRepeatingSlice(str = '') {
    while (str.length > 0) {
        const head = str[0];
        if (!str.slice(1).includes(head)) return head;
        str = str.slice(1);
    }
    return -1;
}

/**
 * Groups anagram strings together (iterative, plain object).
 * @param {string[]} arr - Array of strings
 * @returns {string[][]} Grouped anagram arrays
 */
function groupAnagramsIterative(arr = []) {
    const obj = {};
    for (let i = 0; i < arr.length; i++) {
        const key = arr[i].split('').sort().join('');
        if (!obj[key]) obj[key] = [arr[i]];
        else obj[key] = [...obj[key], arr[i]];
    }
    return Object.values(obj);
}

/**
 * Groups anagram strings together using a Map (optimized).
 * Time: O(n * k log k) where k = max word length
 * @param {string[]} arr - Array of strings
 * @returns {string[][]} Grouped anagram arrays
 */
function groupAnagrams(arr = []) {
    const map = new Map();
    for (const word of arr) {
        const key = word.split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(word);
    }
    return Array.from(map.values());
}

/**
 * Checks if two strings are anagrams of each other.
 * Time: O(n)  Space: O(n)
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {boolean} True if anagrams
 */
function isAnagram(a, b) {
    if (a.length !== b.length) return false;
    const freq = {};
    for (let char of a) freq[char] = (freq[char] || 0) + 1;
    for (let char of b) {
        if (!(char in freq)) return false;
        freq[char]--;
    }
    return true;
}

/**
 * Checks if a string is a palindrome using two pointers (recursive).
 * @param {string} str - Input string
 * @param {number} [left=0] - Left pointer (used internally)
 * @param {number} [right=str.length-1] - Right pointer (used internally)
 * @returns {boolean} True if palindrome
 */
function isPalindrome(str = '', left = 0, right = str.length - 1) {
    if (left > right) return true;
    if (str[left] !== str[right]) return false;
    return isPalindrome(str, left + 1, right - 1);
}

/**
 * Reverses a string using recursion.
 * @param {string} str - Input string
 * @returns {string} Reversed string
 */
function reverseString(str = '') {
    if (str.length === 0) return '';
    return reverseString(str.slice(1)) + str.charAt(0);
}

/**
 * Returns the length of the last word in a string, ignoring trailing spaces.
 * @param {string} s - Input string
 * @returns {number} Length of the last word
 */
function lengthOfLastWord(s) {
    let last = s.length - 1;
    let len = 0;

    while (last >= 0) {
        if (s[last] !== ' ') len++;
        last--;
        if (len > 0 && s[last] === ' ') break;
    }
    return len;
}

/**
 * Finds the first occurrence index of a substring in a string.
 * @param {string} str - Source string
 * @param {string} occ - Substring to find
 * @returns {number} Index of first occurrence, or -1 if not found
 */
function findFirstOccurrence(str = '', occ) {
    for (let i = 0; i < str.length; i++) {
        if (str.startsWith(occ, i)) return i;
    }
    return -1;
}

/**
 * Returns all indices where removing one character from str1 yields str2.
 * @param {string} str1 - Longer string
 * @param {string} str2 - Shorter target string
 * @returns {number[]} Valid removal indices, or [-1] if none
 */
function getRemovableIndices(str1 = '', str2 = '') {
    const result = [];
    for (let i = 0; i < str1.length; i++) {
        const modified = str1.slice(0, i) + str1.slice(i + 1);
        if (modified === str2) result.push(i);
    }
    return result.length > 0 ? result : [-1];
}

/**
 * Generates an array of ASCII codes for each character (recursive).
 * @param {string} str - Input string
 * @param {number[]} [result=[]] - Accumulated result (used internally)
 * @returns {number[]} Array of ASCII codes
 */
function generateAsciiCode(str = '', result = []) {
    if (str.length === 0) return result;
    result.push(str[0].charCodeAt(0));
    return generateAsciiCode(str.slice(1), result);
}

// ─── Two Sum / Pair Sum ───────────────────────────────────────

/**
 * Returns indices of two numbers that add up to target (hash map).
 * Time: O(n)  Space: O(n)
 * @param {number[]} arr - Input array
 * @param {number} target - Target sum
 * @returns {number[]|null} Pair of indices, or null if not found
 */
function twoSum(arr = [], target) {
    const seen = {};
    for (let i = 0; i < arr.length; i++) {
        const diff = target - arr[i];
        if (seen[diff] !== undefined) return [seen[diff], i];
        seen[arr[i]] = i;
    }
    return null;
}

/**
 * Finds a pair of values that sum to target (brute force).
 * Time: O(n²)
 * @param {number[]} arr - Input array
 * @param {number} target - Target sum
 * @returns {number[]|number} Pair of values, or -1 if not found
 */
function pairSum(arr = [], target) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) return [arr[i], arr[j]];
        }
    }
    return -1;
}

/**
 * Finds a pair of indices summing to target using two pointers (recursive).
 * Array must be sorted.
 * Time: O(n)
 * @param {number[]} arr - Sorted input array
 * @param {number} target - Target sum
 * @param {number} [start=0] - Left pointer (used internally)
 * @param {number} [end=arr.length-1] - Right pointer (used internally)
 * @param {number[]} [result=[]] - Accumulated result (used internally)
 * @returns {number[]|number} Pair of indices, or -1 if not found
 */
function pairSumTwoPointer(arr = [], target, start = 0, end = arr.length - 1, result = []) {
    if (start > end) return -1;
    if (arr[start] + arr[end] === target) {
        result.push(start, end);
        return result;
    } else if (target > arr[start] + arr[end]) {
        return pairSumTwoPointer(arr, target, start + 1, end, result);
    } else {
        return pairSumTwoPointer(arr, target, start, end - 1, result);
    }
}

// ─── Majority Element ─────────────────────────────────────────

/**
 * Finds the majority element using Boyer-Moore Voting Algorithm.
 * Time: O(n)  Space: O(1)
 * @param {number[]} arr - Input array (majority appears > n/2 times)
 * @returns {number} Majority element candidate
 */
function majorityElement(arr = []) {
    let candidate = 0;
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (count === 0) candidate = arr[i];
        if (candidate === arr[i]) count++;
        else count--;
    }
    return candidate;
}

/**
 * Finds the majority element using a frequency map.
 * Time: O(n)  Space: O(n)
 * @param {number[]} arr - Input array
 * @returns {number} Majority element, or -1 if none found
 */
function majorityElementFrequency(arr = []) {
    const freq = {};
    const majority = Math.floor(arr.length / 2);

    for (let i = 0; i < arr.length; i++) {
        freq[arr[i]] = (freq[arr[i]] || 0) + 1;
    }
    for (let key in freq) {
        if (freq[key] >= majority) return +key;
    }
    return -1;
}

// ─── Number Utilities ─────────────────────────────────────────

/**
 * Reverses the digits of an integer (recursive).
 * @param {number} x - Input integer
 * @param {number} [reversed=0] - Accumulated reversed value (used internally)
 * @returns {number} Integer with digits reversed
 */
function reverseInteger(x, reversed = 0) {
    if (x === 0) return reversed;
    const digit = x % 10;
    reversed = reversed * 10 + digit;
    return reverseInteger(Math.floor(x / 10), reversed);
}

/**
 * Reverses the digits of a number via string accumulation (recursive).
 * @param {number} n - Input number
 * @param {string} [ans=''] - Accumulated string (used internally)
 * @returns {number} Integer with digits reversed
 */
function reverseDigit(n, ans = '') {
    if (n === 0) return +ans;
    ans += n % 10;
    return reverseDigit(Math.floor(n / 10), ans);
}

/**
 * Returns the sum of 1 to n (iterative).
 * @param {number} n - Upper bound
 * @returns {number} Sum from 1 to n
 */
function sumOneToN(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) sum += i;
    return sum;
}

/**
 * Returns the sum of 1 to n using the arithmetic formula.
 * Time: O(1)
 * @param {number} n - Upper bound
 * @returns {number} Sum from 1 to n
 */
function sumOneToNFormula(n) {
    return (n * (n + 1)) / 2;
}

/**
 * Calculates base raised to the power of exp (iterative).
 * @param {number} base - Base value
 * @param {number} exp - Exponent
 * @returns {number} base^exp
 */
function powerCalculate(base, exp) {
    let result = 1;
    for (let i = 0; i < exp; i++) result *= base;
    return result;
}

/**
 * Calculates the factorial of n (recursive).
 * @param {number} n - Non-negative integer
 * @returns {number} n!
 */
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

/**
 * Returns the nth Fibonacci number (recursive).
 * Note: Exponential time — use memoization for large n.
 * @param {number} n - Position in Fibonacci sequence (0-indexed)
 * @returns {number} nth Fibonacci number
 */
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

/**
 * Generates a random numeric OTP string of given length (iterative).
 * @param {number} len - Desired OTP length
 * @returns {string} Random numeric OTP
 */
function otpIterative(len) {
    let otp = '';
    for (let i = 0; i < len; i++) otp += Math.floor(Math.random() * 10);
    return otp;
}

/**
 * Generates a random numeric OTP string of given length (recursive).
 * @param {number} len - Desired OTP length
 * @returns {string} Random numeric OTP
 */
function otpRecursive(len) {
    if (len === 0) return '';
    return Math.floor(Math.random() * 10) + otpRecursive(len - 1);
}

// ─── Product Except Self ──────────────────────────────────────

/**
 * Returns a product array where each index holds the product of all
 * other elements (brute force).
 * Time: O(n²)
 * @param {number[]} arr - Input array
 * @returns {number[]} Product array
 */
function productExceptSelfBrute(arr = []) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        let product = 1;
        for (let j = 0; j < arr.length; j++) {
            if (i !== j) product *= arr[j];
        }
        result.push(product);
    }
    return result;
}

/**
 * Returns a product array using prefix/suffix multiplication.
 * Time: O(n)  Space: O(n)
 * @param {number[]} nums - Input array
 * @returns {number[]} Product array
 */
function productExceptSelf(nums) {
    const n = nums.length;
    const result = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }

    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }
    return result;
}

// ─── Dutch National Flag ──────────────────────────────────────

/**
 * Sorts an array of 0s, 1s, and 2s in-place (Dutch National Flag).
 * Time: O(n)  Space: O(1)
 * @param {number[]} arr - Array containing only 0, 1, 2
 * @returns {number[]} Sorted array
 */
function dutchNationalFlag(arr = []) {
    let left = 0;
    let mid = 0;
    let right = arr.length - 1;

    while (mid <= right) {
        if (arr[mid] === 0) {
            [arr[mid], arr[left]] = [arr[left], arr[mid]];
            mid++;
            left++;
        } else if (arr[mid] === 1) {
            mid++;
        } else {
            [arr[mid], arr[right]] = [arr[right], arr[mid]];
            right--;
        }
    }
    return arr;
}

// ─── Next Permutation ─────────────────────────────────────────

/**
 * Generates the next lexicographic permutation of nums in-place.
 * If already the largest, wraps to the smallest (sorted) permutation.
 * @param {number[]} nums - Input array
 * @returns {number[]} Modified array with next permutation
 */
function nextPermutation(nums = []) {
    let pivot = nums.length - 2;
    while (pivot >= 0 && nums[pivot] >= nums[pivot + 1]) pivot--;

    if (pivot < 0) {
        nums.reverse();
        return nums;
    }

    let j = nums.length - 1;
    while (pivot < j && nums[j] > nums[pivot]) {
        [nums[j], nums[pivot]] = [nums[pivot], nums[j]];
        break;
    }

    let left = pivot + 1;
    let right = nums.length - 1;
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }
    return nums;
}

// ─── Water Container ──────────────────────────────────────────

/**
 * Finds the maximum water container area (brute force).
 * Time: O(n²)
 * @param {number[]} arr - Array of heights
 * @returns {number} Maximum water area
 */
function maxWaterBrute(arr = []) {
    let maxArea = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            const area = Math.min(arr[i], arr[j]) * (j - i);
            maxArea = Math.max(maxArea, area);
        }
    }
    return maxArea;
}

/**
 * Finds the maximum water container area using two pointers (optimized).
 * Time: O(n)  Space: O(1)
 * @param {number[]} heights - Array of heights
 * @returns {number} Maximum water area
 */
function maxWater(heights) {
    let left = 0;
    let right = heights.length - 1;
    let maxArea = 0;

    while (left < right) {
        const leftHeight = heights[left];
        const rightHeight = heights[right];
        const area = Math.min(leftHeight, rightHeight) * (right - left);
        if (area > maxArea) maxArea = area;

        if (leftHeight < rightHeight) {
            left++;
            while (left < right && heights[left] <= leftHeight) left++;
        } else {
            right--;
            while (left < right && heights[right] <= rightHeight) right--;
        }
    }
    return maxArea;
}

/**
 * Finds the minimum water container area (brute force).
 * @param {number[]} arr - Array of heights
 * @returns {number} Minimum water area
 */
function minWaterBrute(arr = []) {
    let minArea = Infinity;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            const area = Math.min(arr[i], arr[j]) * (j - i);
            if (area < minArea) minArea = area;
        }
    }
    return minArea;
}

/**
 * Finds the minimum water container area using two pointers.
 * @param {number[]} arr - Array of heights
 * @returns {number} Minimum water area
 */
function minWaterTwoPointer(arr = []) {
    if (arr.length < 2) return 0;
    let left = 0;
    let right = arr.length - 1;
    let minArea = Infinity;

    while (left < right) {
        const area = Math.min(arr[left], arr[right]) * (right - left);
        minArea = Math.min(minArea, area);
        if (arr[left] > arr[right]) left++;
        else right--;
    }
    return minArea;
}

// ─── Search Algorithms ────────────────────────────────────────

/**
 * Binary search on a sorted array (recursive).
 * Time: O(log n)
 * @param {number[]} arr - Sorted input array
 * @param {number} target - Value to search
 * @param {number} [left=0] - Left boundary (used internally)
 * @param {number} [right=arr.length-1] - Right boundary (used internally)
 * @returns {number} Index of target, or -1 if not found
 */
function binarySearch(arr = [], target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (target > arr[mid]) return binarySearch(arr, target, mid + 1, right);
    return binarySearch(arr, target, left, mid - 1);
}

/**
 * Searches for a target in a rotated sorted array.
 * Time: O(log n)
 * @param {number[]} arr - Rotated sorted array
 * @param {number} target - Value to search
 * @returns {number} Index of target, or -1 if not found
 */
function rotatedSearch(arr = [], target) {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        if (arr[mid] === target) return mid;

        if (arr[start] <= arr[mid]) {
            if (arr[start] <= target && target < arr[mid]) end = mid - 1;
            else start = mid + 1;
        } else {
            if (arr[mid] < target && target <= arr[end]) start = mid + 1;
            else end = mid - 1;
        }
    }
    return -1;
}

/**
 * Finds the peak element in an array using binary search.
 * @param {number[]} arr - Input array
 * @returns {number} Peak element value, or -1 if not found
 */
function peakIndex(arr = []) {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        const mid = Math.floor(start + (end - start) / 2);
        if (arr[mid] > arr[mid - 1] && arr[mid] > arr[mid + 1]) return arr[mid];
        if (arr[mid + 1] > arr[mid]) start = mid + 1;
        else end = mid - 1;
    }
    return -1;
}

/**
 * Finds the minimum element in a rotated sorted array.
 * Time: O(log n)
 * @param {number[]} arr - Rotated sorted array
 * @returns {number} Minimum element value
 */
function findMinimumInRotatedSortedArray(arr = []) {
    let low = 0;
    let high = arr.length - 1;

    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (arr[mid] > arr[high]) low = mid + 1;
        else high = mid;
    }
    return arr[low];
}

/**
 * Finds target in a rotated sorted array (full two-half logic).
 * Time: O(log n)
 * @param {number[]} arr - Rotated sorted array
 * @param {number} target - Value to search
 * @returns {number} Index of target, or -1 if not found
 */
function findTargetInRotatedSortedArray(arr = [], target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (arr[mid] === target) return mid;

        if (arr[left] <= arr[mid]) {
            if (arr[left] <= target && target < arr[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            if (arr[mid] < target && target <= arr[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}

// ─── Book Allocation ──────────────────────────────────────────

/**
 * Checks if books can be allocated so no student reads more than maxAllow pages.
 * @param {number[]} books - Pages per book
 * @param {number} k - Number of students
 * @param {number} maxAllow - Max pages per student
 * @returns {boolean} True if valid allocation exists
 */
function isValidAllocation(books, k, maxAllow) {
    let student = 1;
    let pages = 0;

    for (let i = 0; i < books.length; i++) {
        if (books[i] > maxAllow) return false;
        if (books[i] + pages <= maxAllow) {
            pages += books[i];
        } else {
            student++;
            pages = books[i];
        }
    }
    return student <= k;
}

/**
 * Finds the minimum possible maximum pages assigned per student (binary search).
 * Time: O(n log(sum))  Space: O(1)
 * @param {number[]} books - Pages per book (must be sorted)
 * @param {number} k - Number of students
 * @returns {number|boolean} Minimum of maximum pages, or false if k > books
 */
function bookAllocation(books = [], k) {
    if (k > books.length) return false;

    let start = 0;
    let end = books.reduce((acc, curr) => acc + curr, 0);
    let ans = 0;

    while (start <= end) {
        const mid = Math.floor(start + (end - start) / 2);
        if (isValidAllocation(books, k, mid)) {
            ans = mid;
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return ans;
}

// ─── Sorting Algorithms ───────────────────────────────────────

/**
 * Sorts an array using Bubble Sort (recursive).
 * Time: O(n²)  Space: O(n) recursive stack
 * @param {number[]} arr - Input array (modified in place)
 * @param {number} r - Number of remaining passes
 * @param {number} c - Current comparison index
 * @returns {number[]} Sorted array
 */
function bubbleSort(arr, r, c) {
    if (r === 0) return arr;
    if (c < r) {
        if (arr[c] > arr[c + 1]) [arr[c], arr[c + 1]] = [arr[c + 1], arr[c]];
        return bubbleSort(arr, r, c + 1);
    }
    return bubbleSort(arr, r - 1, 0);
}

/**
 * Sorts an array using Quick Sort (simple, extra space).
 * Time: O(n log n) avg, O(n²) worst  Space: O(n)
 * @param {number[]} arr - Input array
 * @returns {number[]} Sorted array
 */
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) left.push(arr[i]);
        else right.push(arr[i]);
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}

/**
 * Sorts an array using Quick Sort in-place (Lomuto partition).
 * Time: O(n log n) avg  Space: O(log n)
 * @param {number[]} arr - Input array (modified in place)
 * @param {number} [start=0] - Start index (used internally)
 * @param {number} [end=arr.length-1] - End index (used internally)
 * @returns {number[]} Sorted array
 */
function quickSortInPlace(arr, start = 0, end = arr.length - 1) {
    if (start < end) {
        const pivotIdx = partition(arr, start, end);
        quickSortInPlace(arr, start, pivotIdx - 1);
        quickSortInPlace(arr, pivotIdx + 1, end);
    }
    return arr;
}

/**
 * Lomuto partition helper for in-place Quick Sort.
 * @param {number[]} arr - Input array
 * @param {number} start - Start index
 * @param {number} end - End index (pivot position)
 * @returns {number} Final pivot index
 */
function partition(arr, start, end) {
    let idx = start - 1;
    const pivot = arr[end];

    for (let i = start; i < end; i++) {
        if (arr[i] < pivot) {
            idx++;
            [arr[i], arr[idx]] = [arr[idx], arr[i]];
        }
    }
    idx++;
    [arr[end], arr[idx]] = [arr[idx], arr[end]];
    return idx;
}

/**
 * Sorts an array using Merge Sort (returns new sorted array).
 * Time: O(n log n)  Space: O(n)
 * @param {number[]} arr - Input array
 * @param {number} [start=0] - Start index (used internally)
 * @param {number} [end=arr.length-1] - End index (used internally)
 * @returns {number[]} Sorted array
 */
function mergeSort(arr, start = 0, end = arr.length - 1) {
    if (start === end) return [arr[start]];
    const mid = Math.floor(start + (end - start) / 2);
    const left = mergeSort(arr, start, mid);
    const right = mergeSort(arr, mid + 1, end);
    return mergeSorted(left, right);
}

/**
 * Merges two sorted arrays into one sorted array.
 * @param {number[]} left - Sorted left half
 * @param {number[]} right - Sorted right half
 * @returns {number[]} Merged sorted array
 */
function mergeSorted(left = [], right = []) {
    let i = 0, j = 0;
    const result = [];

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }

    while (i < left.length) result.push(left[i++]);
    while (j < right.length) result.push(right[j++]);
    return result;
}

/**
 * Sorts an array using Merge Sort in-place (modifies original array).
 * Time: O(n log n)  Space: O(n) for temp array
 * @param {number[]} arr - Input array
 * @param {number} [start=0] - Start index (used internally)
 * @param {number} [end=arr.length-1] - End index (used internally)
 * @returns {number[]} Sorted array
 */
function mergeSortInPlace(arr, start = 0, end = arr.length - 1) {
    if (start >= end) return arr;
    const mid = Math.floor(start + (end - start) / 2);
    mergeSortInPlace(arr, start, mid);
    mergeSortInPlace(arr, mid + 1, end);
    return mergeInPlace(arr, start, mid, end);
}

/**
 * Merges two adjacent sorted partitions in place using a temp array.
 * @param {number[]} arr - Input array
 * @param {number} start - Start of left partition
 * @param {number} mid - End of left partition
 * @param {number} end - End of right partition
 * @returns {number[]} Array with merged partitions
 */
function mergeInPlace(arr = [], start, mid, end) {
    const temp = [];
    let i = start, j = mid + 1, k = 0;

    while (i <= mid && j <= end) {
        if (arr[i] < arr[j]) temp[k] = arr[i++];
        else temp[k] = arr[j++];
        k++;
    }

    while (i <= mid) temp[k++] = arr[i++];
    while (j <= end) temp[k++] = arr[j++];

    for (let t = 0; t < temp.length; t++) arr[start + t] = temp[t];
    return arr;
}

// ─── Recursion Patterns ───────────────────────────────────────

/**
 * Prints numbers from 1 to n recursively.
 * @param {number} n - Upper bound
 * @param {number} [current=1] - Current number (used internally)
 */
function printOneToN(n, current = 1) {
    if (current > n) return;
    console.log(current);
    printOneToN(n, current + 1);
}

/**
 * Builds an array [1, 2, ..., n] recursively.
 * @param {number} n - Upper bound
 * @returns {number[]} Array from 1 to n
 */
function buildArray(n) {
    if (n === 0) return [];
    const prev = buildArray(n - 1);
    prev.push(n);
    return prev;
}

/**
 * Prints a right-aligned star triangle pattern of n rows recursively.
 * @param {number} n - Number of rows
 */
function printPattern(n) {
    if (n === 0) return;

    let row = '';
    function buildRow(m) {
        if (m === 0) return;
        row += '*';
        buildRow(m - 1);
    }
    buildRow(n);
    console.log(row);
    printPattern(n - 1);
}

/**
 * Checks if an array is sorted in non-decreasing order (recursive).
 * @param {number[]} arr - Input array
 * @param {number} [i=0] - Current index (used internally)
 * @returns {boolean} True if sorted
 */
function isSorted(arr, i = 0) {
    if (i === arr.length - 1) return true;
    return arr[i] <= arr[i + 1] && isSorted(arr, i + 1);
}

/**
 * Computes the sum of an array using two-pointer recursion.
 * @param {number[]} arr - Input array
 * @param {number} [result=0] - Accumulated sum (used internally)
 * @param {number} [left=0] - Left pointer (used internally)
 * @param {number} [right=arr.length-1] - Right pointer (used internally)
 * @returns {number} Total array sum
 */
function sumOfArray(arr = [], result = 0, left = 0, right = arr.length - 1) {
    if (left <= right) {
        result += arr[left] + (left === right ? 0 : arr[right]);
        return sumOfArray(arr, result, left + 1, right - 1);
    }
    return result;
}

// ─── Data Structures ──────────────────────────────────────────

/**
 * Validates matching brackets/parentheses using a stack.
 * Time: O(n)  Space: O(n)
 * @param {string} s - Input string of brackets
 * @returns {boolean} True if all brackets are properly matched
 */
function isValidParentheses(s) {
    const stack = [];
    const pairs = { '(': ')', '{': '}', '[': ']' };

    for (let char of s) {
        if (char in pairs) {
            stack.push(pairs[char]);
        } else {
            if (stack.length && stack[stack.length - 1] === char) stack.pop();
            else return false;
        }
    }
    return stack.length === 0;
}

// ─── Roman Numerals ───────────────────────────────────────────

/**
 * Converts a Roman numeral string to its integer value.
 * Time: O(n)
 * @param {string} s - Roman numeral string (e.g. "XIV")
 * @returns {number} Integer value
 */
function romanToInt(s) {
    const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let sum = 0;

    for (let i = 0; i < s.length; i++) {
        if (map[s[i]] < map[s[i + 1]]) {
            sum += map[s[i + 1]] - map[s[i]];
            i++;
        } else {
            sum += map[s[i]];
        }
    }
    return sum;
}

// ─── Async Utilities ──────────────────────────────────────────

/**
 * Animates text to stdout character by character with a configurable delay.
 * @param {string} [text=''] - Text to animate
 * @param {number} [delayMs=100] - Delay in milliseconds between characters
 * @returns {Promise<void>}
 */
async function animateText(text = '', delayMs = 100) {
    for (let i = 0; i < text.length; i++) {
        process.stdout.write(text[i]);
        await new Promise((res) => setTimeout(res, delayMs));
    }
}