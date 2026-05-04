// ============================================================
// Problem Solve — Sorting, Searching, Sliding Window, Binary Search
// ============================================================

// ========================
// Two Sum
// ========================

/**
 * Finds two indices whose values sum to the target using a hash map.
 * Time Complexity: O(n)
 * @param {number[]} arr - Input array
 * @param {number} target - Target sum
 * @returns {number[]|false} Pair of indices or false if not found
 */
function twoSum(arr = [], target) {
    const map = {};
    for (let i = 0; i < arr.length; i++) {
        const diff = target - arr[i];
        if (map[arr[i]] !== undefined) {
            return [map[diff], i];
        }
        map[diff] = i;
    }
    return false;
}

/**
 * Brute-force Two Sum for unsorted array.
 * Time Complexity: O(n²)
 * @param {number[]} arr - Input array
 * @param {number} target - Target sum
 * @returns {number[]} Pair of indices
 */
function twoSumBruteForce(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                return [i, j];
            }
        }
    }
}

/**
 * Optimal Two Sum for unsorted array using hash map.
 * Time Complexity: O(n)
 * @param {number[]} arr - Input array
 * @param {number} target - Target sum
 * @returns {number[]} Pair of indices
 */
function twoSumOptimal(arr, target) {
    const map = {};
    for (let i = 0; i < arr.length; i++) {
        const need = target - arr[i];
        if (map[need] !== undefined) {
            return [i, map[need]];
        }
        map[arr[i]] = i;
    }
}

/**
 * Two Sum for sorted array using two-pointer technique.
 * Time Complexity: O(n)
 * @param {number[]} arr - Sorted input array
 * @param {number} target - Target sum
 * @returns {number[]|number} Pair of indices or -1
 */
function twoSumSorted(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const sum = arr[left] + arr[right];
        if (sum === target) return [left, right];
        if (sum < target) left++;
        else right--;
    }
    return -1;
}

// ========================
// Longest Substring Without Repeating Characters
// ========================

/**
 * Returns the length of the longest substring without repeating characters.
 * Recursive approach — returns the substring itself.
 * @param {string} str - Input string
 * @param {string[]} [chars=[]] - Accumulator for current unique chars
 * @returns {string} Longest unique substring found
 */
function longestUniqueSubstringRecursive(str = '', chars = []) {
    if (str.length === 0) return chars.join('');
    const char = str[0];
    if (chars.includes(char)) return chars.join('');
    chars.push(char);
    return longestUniqueSubstringRecursive(str.slice(1), chars);
}

/**
 * Returns the count of unique characters in a string.
 * @param {string} str - Input string
 * @returns {number} Number of unique characters
 */
function countUniqueCharacters(str = '') {
    const map = {};
    for (let i = 0; i < str.length; i++) {
        if (!map[str[i]]) map[str[i]] = true;
    }
    return Object.keys(map).length;
}

/**
 * Returns the length of the longest substring without repeating characters.
 * Uses sliding window + hash map. Time Complexity: O(n)
 * @param {string} str - Input string
 * @returns {number} Length of the longest valid substring
 */
function longestSubstringWithoutRepeating(str = '') {
    let maxLen = 0;
    const map = {};
    let left = 0;
    for (let right = 0; right < str.length; right++) {
        const char = str[right];
        if (map[char] !== undefined && map[char] >= left) {
            left = map[char] + 1;
        }
        map[char] = right;
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}

/**
 * Brute-force approach for longest substring without repeating characters.
 * Time Complexity: O(n³)
 * @param {string} str - Input string
 * @returns {number} Length of the longest valid substring
 */
function longestSubstringWithoutRepeatingBrute(str = '') {
    let maxLen = 0;
    for (let i = 0; i < str.length; i++) {
        for (let j = i; j < str.length; j++) {
            const set = new Set();
            let isValid = true;
            for (let k = i; k <= j; k++) {
                if (set.has(str[k])) { isValid = false; break; }
                set.add(str[k]);
            }
            if (isValid) maxLen = Math.max(maxLen, j - i + 1);
        }
    }
    return maxLen;
}

// ========================
// Product of Array Except Self
// ========================

/**
 * Returns an array where each element is the product of all other elements.
 * No division used. Time Complexity: O(n)
 * @param {number[]} arr - Input array
 * @returns {number[]} Product array
 */
function productExceptSelf(arr = []) {
    const result = new Array(arr.length).fill(1);
    let left = 1;
    for (let i = 1; i < arr.length; i++) {
        result[i] *= left;
        left *= arr[i];
    }
    let right = 1;
    for (let i = arr.length - 1; i >= 0; i--) {
        result[i] *= right;
        right *= arr[i];
    }
    return result;
}

// ========================
// Prefix / Suffix Sum
// ========================

/**
 * Builds a prefix+suffix sum array where each index holds the sum of all other elements.
 * @param {number[]} arr - Input array
 * @returns {number[]} Combined prefix-suffix sum array
 */
function prefixSuffixSum(arr) {
    const result = new Array(arr.length).fill(0);
    for (let i = 1; i < arr.length; i++) {
        result[i] = result[i - 1] + arr[i - 1];
    }
    let suffixSum = 0;
    for (let i = result.length - 1; i >= 0; i--) {
        result[i] += suffixSum;
        suffixSum += arr[i];
    }
    return result;
}

/**
 * Finds the equilibrium index where left sum equals right sum. Brute-force.
 * Time Complexity: O(n²)
 * @param {number[]} arr - Input array
 * @returns {number} Equilibrium index or -1
 */
function findEquilibriumIndexBrute(arr = []) {
    for (let i = 0; i < arr.length; i++) {
        let leftSum = 0, rightSum = 0;
        for (let l = 0; l < i; l++) leftSum += arr[l];
        for (let r = i + 1; r < arr.length; r++) rightSum += arr[r];
        if (leftSum === rightSum) return i;
    }
    return -1;
}

/**
 * Finds the equilibrium index using prefix sum. Time Complexity: O(n)
 * @param {number[]} arr - Input array
 * @returns {number} Equilibrium index or -1
 */
function findEquilibriumIndexOptimal(arr = []) {
    const totalSum = arr.reduce((acc, curr) => acc + curr, 0);
    let leftSum = 0;
    for (let i = 0; i < arr.length; i++) {
        const rightSum = totalSum - leftSum - arr[i];
        if (leftSum === rightSum) return i;
        leftSum += arr[i];
    }
    return -1;
}

// ========================
// Sliding Window
// ========================

/**
 * Finds the maximum sum subarray of size k.
 * @param {number[]} nums - Input array
 * @param {number} k - Window size
 * @returns {number} Maximum subarray sum
 */
function maxSubarraySumOfK(nums = [], k) {
    let sum = 0;
    for (let i = 0; i < k; i++) sum += nums[i];
    let maxSum = sum;
    for (let j = k; j < nums.length; j++) {
        sum = sum - nums[j - k] + nums[j];
        maxSum = Math.max(maxSum, sum);
    }
    return maxSum;
}

/**
 * Finds the minimum length subarray whose sum is >= target. Brute-force.
 * Time Complexity: O(n²)
 * @param {number[]} arr - Input array
 * @param {number} target - Target sum
 * @returns {number} Minimum subarray length
 */
function minSubarrayLengthBrute(arr = [], target) {
    let minLen = Infinity;
    for (let i = 0; i < arr.length; i++) {
        let sum = 0;
        for (let j = i; j < arr.length; j++) {
            sum += arr[j];
            if (sum >= target) {
                minLen = Math.min(minLen, j - i + 1);
                break;
            }
        }
    }
    return minLen;
}

/**
 * Finds the minimum length subarray whose sum is >= target. Sliding window.
 * Time Complexity: O(n)
 * @param {number[]} arr - Input array
 * @param {number} target - Target sum
 * @returns {number} Minimum subarray length
 */
function minSubarrayLengthOptimal(arr = [], target) {
    let left = 0, sum = 0, minLen = Infinity;
    for (let right = 0; right < arr.length; right++) {
        sum += arr[right];
        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= arr[left++];
        }
    }
    return minLen === Infinity ? 0 : minLen;
}

/**
 * Finds the longest subarray with sum <= target. Brute-force.
 * @param {number[]} arr - Input array
 * @param {number} target - Target sum
 * @returns {number} Longest valid subarray length
 */
function longestSubarrayWithSumAtMostBrute(arr, target) {
    let maxLen = 0;
    for (let i = 0; i < arr.length; i++) {
        let current = 0;
        for (let j = i; j < arr.length; j++) {
            current += arr[j];
            if (current <= target) maxLen = Math.max(maxLen, j - i + 1);
        }
    }
    return maxLen;
}

/**
 * Finds the longest subarray with sum <= target. Sliding window.
 * @param {number[]} arr - Input array
 * @param {number} target - Target sum
 * @returns {number} Longest valid subarray length
 */
function longestSubarrayWithSumAtMostOptimal(arr, target) {
    let left = 0, sum = 0, maxLen = 0;
    for (let right = 0; right < arr.length; right++) {
        sum += arr[right];
        while (sum > target) sum -= arr[left++];
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}

/**
 * Finds the maximum score by picking k cards from either end.
 * @param {number[]} cardPoints - Array of card points
 * @param {number} k - Number of cards to pick
 * @returns {number} Maximum score
 */
function maxScore(cardPoints, k) {
    let sum = 0;
    for (let i = 0; i < k; i++) sum += cardPoints[i];
    let maxPoints = sum;
    let rightIndex = cardPoints.length - 1;
    let rightSum = cardPoints[rightIndex];
    for (let j = k - 1; j >= 0; j--) {
        sum -= cardPoints[j];
        maxPoints = Math.max(maxPoints, sum + rightSum);
        rightIndex--;
        rightSum += cardPoints[rightIndex];
    }
    return maxPoints;
}

/**
 * Finds the length of the longest subarray with at most k zeros.
 * @param {number[]} nums - Binary array
 * @param {number} k - Max allowed zeros
 * @returns {number} Longest valid subarray length
 */
function longestOnes(nums = [], k) {
    let left = 0, zeroCount = 0, maxLen = 0;
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) zeroCount++;
        while (zeroCount > k) {
            if (nums[left] === 0) zeroCount--;
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}

/**
 * Brute-force for longest subarray with at most k zeros.
 * @param {number[]} nums - Binary array
 * @param {number} k - Max allowed zeros
 * @returns {number} Longest valid subarray length
 */
function longestOnesBrute(nums = [], k) {
    let maxLen = 0;
    for (let i = 0; i < nums.length; i++) {
        let zeroCount = 0;
        for (let j = i; j < nums.length; j++) {
            if (nums[j] === 0) zeroCount++;
            if (zeroCount > k) break;
            maxLen = Math.max(maxLen, j - i + 1);
        }
    }
    return maxLen;
}

/**
 * Finds the longest substring that can be made of one character after k replacements. Brute-force.
 * @param {string} str - Input string
 * @param {number} k - Max replacements allowed
 * @returns {number} Longest valid substring length
 */
function longestSubstringAfterReplacementBrute(str = '', k) {
    let maxLen = 0;
    for (let i = 0; i < str.length; i++) {
        let count = 0;
        for (let j = i; j < str.length; j++) {
            if (str[j] !== str[i]) count++;
            if (count > k) break;
            maxLen = Math.max(maxLen, j - i + 1);
        }
    }
    return maxLen;
}

/**
 * Finds the longest substring after at most k character replacements. Sliding window.
 * @param {string} str - Input string
 * @param {number} k - Max replacements allowed
 * @returns {number} Longest valid substring length
 */
function longestSubstringAfterReplacementOptimal(str = '', k) {
    let maxLen = 0, maxCount = 0, left = 0;
    const map = {};
    for (let right = 0; right < str.length; right++) {
        map[str[right]] = (map[str[right]] || 0) + 1;
        maxCount = Math.max(maxCount, map[str[right]]);
        while ((right - left + 1) - maxCount > k) {
            map[str[left]]--;
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}

/**
 * Finds the longest subarray with at most k distinct elements. Brute-force.
 * @param {number[]} nums - Input array
 * @param {number} k - Max distinct elements
 * @returns {number} Longest valid subarray length
 */
function longestSubarrayWithAtMostKDistinctBrute(nums, k) {
    let max = 0;
    for (let i = 0; i < nums.length; i++) {
        let count = 0;
        const map = {};
        for (let j = i; j < nums.length; j++) {
            if (map[nums[j]] === undefined) {
                map[nums[j]] = j;
                count++;
            } else {
                map[nums[j]] = j;
            }
            if (count > k) break;
            max = Math.max(max, j - i + 1);
        }
    }
    return max;
}

/**
 * Finds the longest subarray with at most k distinct elements. Sliding window.
 * @param {number[]} nums - Input array
 * @param {number} k - Max distinct elements
 * @returns {number} Longest valid subarray length
 */
function longestSubarrayWithAtMostKDistinctOptimal(nums, k) {
    let max = 0, left = 0;
    const map = {};
    for (let right = 0; right < nums.length; right++) {
        map[nums[right]] = (map[nums[right]] || 0) + 1;
        while (Object.keys(map).length > k) {
            const leftVal = nums[left];
            map[leftVal]--;
            if (map[leftVal] === 0) delete map[leftVal];
            left++;
        }
        max = Math.max(max, right - left + 1);
    }
    return max;
}

/**
 * Finds the longest substring with at most k distinct characters. Sliding window.
 * @param {string} str - Input string
 * @param {number} k - Max distinct characters
 * @returns {number} Longest valid substring length
 */
function longestSubstringWithKDistinct(str = '', k) {
    let left = 0, max = 0;
    const map = {};
    for (let right = 0; right < str.length; right++) {
        const ch = str[right];
        map[ch] = (map[ch] || 0) + 1;
        while (Object.keys(map).length > k) {
            const leftChar = str[left];
            map[leftChar]--;
            if (map[leftChar] === 0) delete map[leftChar];
            left++;
        }
        max = Math.max(max, right - left + 1);
    }
    return max;
}

/**
 * Brute-force for longest substring with at most k distinct characters.
 * @param {string} str - Input string
 * @param {number} k - Max distinct characters
 * @returns {number} Longest valid substring length
 */
function longestSubstringWithKDistinctBrute(str = '', k) {
    let max = 0;
    for (let i = 0; i < str.length; i++) {
        const map = {};
        for (let j = i; j < str.length; j++) {
            const char = str[j];
            map[char] = (map[char] || 0) + 1;
            if (Object.keys(map).length > k) break;
            max = Math.max(max, j - i + 1);
        }
    }
    return max;
}

/**
 * Counts subarrays with exactly k distinct values using atMost trick.
 * @param {number[]} nums - Input array
 * @param {number} k - Exact number of distinct values
 * @returns {number} Count of valid subarrays
 */
function countSubarraysWithExactlyKDistinct(nums, k) {
    return atMostKDistinct(nums, k) - atMostKDistinct(nums, k - 1);
}

/**
 * Helper: counts subarrays with at most k distinct values.
 * @param {number[]} nums - Input array
 * @param {number} k - Max distinct values
 * @returns {number} Count
 */
function atMostKDistinct(nums, k) {
    if (k < 0) return 0;
    let count = 0, left = 0;
    const map = {};
    for (let right = 0; right < nums.length; right++) {
        const current = nums[right];
        map[current] = (map[current] || 0) + 1;
        while (Object.keys(map).length > k) {
            const leftVal = nums[left];
            map[leftVal]--;
            if (map[leftVal] === 0) delete map[leftVal];
            left++;
        }
        count += right - left + 1;
    }
    return count;
}

/**
 * Counts subarrays with exactly k odd numbers. Brute-force.
 * @param {number[]} nums - Input array
 * @param {number} k - Number of odd elements
 * @returns {number} Count of valid subarrays
 */
function countNiceSubarraysBrute(nums, k) {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        let oddCount = 0;
        for (let j = i; j < nums.length; j++) {
            if (nums[j] % 2 === 1) oddCount++;
            if (oddCount === k) count++;
        }
    }
    return count;
}

/**
 * Counts subarrays with at most k odd numbers (helper for atMost pattern).
 * @param {number[]} nums - Binary-like array
 * @param {number} k - Max odd count
 * @returns {number} Count
 */
function atMostOddCount(nums, k) {
    let count = 0, left = 0, oddCount = 0;
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] % 2 === 1) oddCount++;
        while (oddCount > k) {
            if (nums[left] === 1) oddCount--;
            left++;
        }
        count += right - left + 1;
    }
    return count;
}

/**
 * Counts subarrays with binary sum equal to goal.
 * @param {number[]} nums - Binary array
 * @param {number} goal - Target sum
 * @returns {number} Count of valid subarrays
 */
function countSubarraysWithBinarySum(nums, goal) {
    return atMostBinarySum(nums, goal) - atMostBinarySum(nums, goal - 1);
}

/**
 * Helper: counts subarrays with binary sum at most goal.
 * @param {number[]} nums - Binary array
 * @param {number} goal - Max sum
 * @returns {number} Count
 */
function atMostBinarySum(nums, goal) {
    if (goal < 0) return 0;
    let left = 0, sum = 0, count = 0;
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];
        while (sum > goal) sum -= nums[left++];
        count += right - left + 1;
    }
    return count;
}

/**
 * Counts subarrays containing at least one 'a', 'b', and 'c'. Brute-force.
 * @param {string} str - Input string
 * @returns {number} Count of valid substrings
 */
function numberOfSubstringsBrute(str = '') {
    let result = 0;
    for (let i = 0; i < str.length; i++) {
        for (let j = i; j < str.length; j++) {
            const sub = str.substring(i, j + 1);
            if (sub.includes('a') && sub.includes('b') && sub.includes('c')) {
                result += str.length - j;
                break;
            }
        }
    }
    return result;
}

/**
 * Counts substrings containing at least one 'a', 'b', 'c'. Sliding window.
 * @param {string} str - Input string
 * @returns {number} Count of valid substrings
 */
function numberOfSubstrings(str) {
    const count = { a: 0, b: 0, c: 0 };
    let left = 0, result = 0;
    for (let right = 0; right < str.length; right++) {
        count[str[right]]++;
        while (count.a > 0 && count.b > 0 && count.c > 0) {
            result += str.length - right;
            count[str[left]]--;
            left++;
        }
    }
    return result;
}

/**
 * Total Fruit — finds the longest subarray with at most 2 distinct values.
 * @param {number[]} fruits - Array of fruit types
 * @returns {number} Length of the longest valid subarray
 */
function totalFruit(fruits) {
    let left = 0, max = 0;
    const map = {};
    for (let right = 0; right < fruits.length; right++) {
        const current = fruits[right];
        map[current] = (map[current] || 0) + 1;
        while (Object.keys(map).length > 2) {
            const leftFruit = fruits[left];
            map[leftFruit]--;
            if (map[leftFruit] === 0) {
                delete map[leftFruit];
                left++;
            }
        }
        max = Math.max(max, right - left + 1);
    }
    return max;
}

/**
 * Returns max elements of each sliding window of size k. Brute-force.
 * @param {number[]} nums - Input array
 * @param {number} k - Window size
 * @returns {number[]} Array of window maximums
 */
function slidingWindowMaximum(nums = [], k) {
    const result = [];
    const temp = [];
    for (let i = 0; i < nums.length; i++) {
        temp.push(nums[i]);
        if (temp.length === k) {
            result.push(Math.max(...temp));
            temp.shift();
        }
    }
    return result;
}

/**
 * Finds the minimum window substring in s that contains all characters of t.
 * @param {string} s - Source string
 * @param {string} t - Target string
 * @returns {string} Minimum window substring or empty string
 */
function minWindowSubstring(s, t) {
    const map = {};
    for (const char of t) map[char] = (map[char] || 0) + 1;
    let left = 0, start = 0, minLen = Infinity, need = t.length;

    for (let right = 0; right < s.length; right++) {
        const current = s[right];
        if (map[current] !== undefined) {
            if (map[current] > 0) need--;
            map[current]--;
        }
        while (need === 0) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                start = left;
            }
            const leftChar = s[left];
            if (map[leftChar] !== undefined) {
                map[leftChar]++;
                if (map[leftChar] > 0) need++;
            }
            left++;
        }
    }
    return minLen === Infinity ? '' : s.substring(start, start + minLen);
}

// ========================
// Remove Duplicates (Sorted Array)
// ========================

/**
 * Removes duplicates from a sorted array in-place and returns new length.
 * @param {number[]} arr - Sorted array
 * @returns {number} New length after removing duplicates
 */
function removeDuplicatesFromSortedArray(arr) {
    let slow = 0;
    for (let fast = 1; fast < arr.length; fast++) {
        if (arr[slow] !== arr[fast]) {
            slow++;
            arr[slow] = arr[fast];
        }
    }
    return slow;
}

// ========================
// Majority Element
// ========================

/**
 * Finds the majority element (appears > n/2 times) using Boyer-Moore Voting.
 * @param {number[]} arr - Input array
 * @returns {number|string} Majority element
 */
function majorityElementOptimal(arr = []) {
    let candidate = '', count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (count === 0) candidate = arr[i];
        count += (candidate === arr[i]) ? 1 : -1;
    }
    return candidate;
}

/**
 * Finds the majority element using a frequency map. Time Complexity: O(n)
 * @param {number[]} arr - Input array
 * @returns {number} Majority element
 */
function majorityElementWithMap(arr) {
    const map = {};
    for (const char of arr) map[char] = (map[char] || 0) + 1;
    const majority = Math.floor(arr.length / 2);
    for (const key in map) {
        if (map[key] >= majority) return +key;
    }
}

/**
 * Finds all elements appearing more than n/3 times using Boyer-Moore Voting.
 * @param {number[]} arr - Input array
 * @returns {number[]} Array of majority candidates
 */
function majorityElementII(arr) {
    let m1 = null, m2 = null, freq1 = 0, freq2 = 0;

    for (const num of arr) {
        if (m1 === num) freq1++;
        else if (m2 === num) freq2++;
        else if (freq1 === 0) { freq1 = 1; m1 = num; }
        else if (freq2 === 0) { freq2 = 1; m2 = num; }
        else { freq1--; freq2--; }
    }

    freq1 = 0; freq2 = 0;
    for (const num of arr) {
        if (num === m1) freq1++;
        if (num === m2) freq2++;
    }

    const result = [];
    const threshold = Math.floor(arr.length / 3);
    if (freq1 > threshold) result.push(m1);
    if (freq2 > threshold) result.push(m2);
    return result;
}

// ========================
// Prefix Sum — Subarray Sum Equals Target
// ========================

/**
 * Counts subarrays whose sum equals the goal using prefix sum + hash map.
 * @param {number[]} nums - Input array
 * @param {number} goal - Target sum
 * @returns {number} Count of valid subarrays
 */
function countSubarraysWithExactSum(nums, goal) {
    const map = new Map();
    map.set(0, 1);
    let currentSum = 0, total = 0;
    for (const num of nums) {
        currentSum += num;
        const needed = currentSum - goal;
        if (map.has(needed)) total += map.get(needed);
        map.set(currentSum, (map.get(currentSum) || 0) + 1);
    }
    return total;
}

// ========================
// Sorting
// ========================

/**
 * Sorts an array in ascending order using Merge Sort.
 * Time Complexity: O(n log n)
 * @param {number[]} arr - Input array
 * @param {number} [start=0] - Start index
 * @param {number} [end=arr.length-1] - End index
 * @returns {number[]} Sorted array
 */
function mergeSort(arr = [], start = 0, end = arr.length - 1) {
    if (start >= end) return arr;
    const mid = Math.floor(start + (end - start) / 2);
    mergeSort(arr, start, mid);
    mergeSort(arr, mid + 1, end);
    return mergeSortedHalves(arr, start, mid, end);
}

/**
 * Merges two sorted halves of an array in-place.
 * @param {number[]} arr - Input array
 * @param {number} start - Start index
 * @param {number} mid - Mid index
 * @param {number} end - End index
 * @returns {number[]} Merged array
 */
function mergeSortedHalves(arr, start, mid, end) {
    let i = start, j = mid + 1;
    const temp = [];
    while (i <= mid && j <= end) {
        if (arr[i] < arr[j]) temp.push(arr[i++]);
        else temp.push(arr[j++]);
    }
    while (i <= mid) temp.push(arr[i++]);
    while (j <= end) temp.push(arr[j++]);
    for (let k = 0; k < temp.length; k++) arr[start + k] = temp[k];
    return arr;
}

/**
 * Sorts an array using Quick Sort.
 * Average Time Complexity: O(n log n)
 * @param {number[]} arr - Input array
 * @param {number} [start=0] - Start index
 * @param {number} [end=arr.length-1] - End index
 * @returns {number[]} Sorted array
 */
function quickSort(arr, start = 0, end = arr.length - 1) {
    if (start >= end) return arr;
    const pivotIndex = partitionArray(arr, start, end);
    quickSort(arr, start, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, end);
    return arr;
}

/**
 * Partitions the array around a pivot for Quick Sort.
 * @param {number[]} arr - Input array
 * @param {number} start - Start index
 * @param {number} end - End (pivot) index
 * @returns {number} Final pivot index
 */
function partitionArray(arr = [], start, end) {
    const pivot = arr[end];
    let idx = start - 1;
    for (let i = start; i < end; i++) {
        if (arr[i] < pivot) {
            idx++;
            [arr[idx], arr[i]] = [arr[i], arr[idx]];
        }
    }
    idx++;
    [arr[idx], arr[end]] = [arr[end], arr[idx]];
    return idx;
}

// ========================
// Recursion & Backtracking
// ========================

/**
 * Recursively removes all 'a' characters from a string.
 * @param {string} str - Input string
 * @returns {string} String with all 'a' removed
 */
function removeCharA(str = '') {
    if (str.length === 0) return '';
    const first = str[0];
    return first === 'a' ? removeCharA(str.slice(1)) : first + removeCharA(str.slice(1));
}

/**
 * Prints all permutations of a string recursively.
 * @param {string} str - Remaining characters
 * @param {string} current - Currently built permutation
 * @returns {void}
 */
function printPermutations(str, current) {
    if (str.length === 0) {
        console.log(current);
        return;
    }
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const remaining = str.slice(0, i) + str.slice(i + 1);
        printPermutations(remaining, current + char);
    }
}

/**
 * Prints all subsets (power set) of a string recursively.
 * @param {string} str - Remaining characters
 * @param {string} [current=''] - Currently built subset
 * @returns {void}
 */
function printSubsets(str = '', current = '') {
    if (str.length === 0) {
        console.log(current);
        return;
    }
    printSubsets(str.slice(1), current + str[0]); // include
    printSubsets(str.slice(1), current);           // exclude
}

/**
 * Checks if any permutation of string s exists in array a.
 * @param {string} s - String to permute
 * @param {string[]} a - Array to search in
 * @param {string} current - Current permutation being built
 * @returns {boolean} True if a valid permutation is found
 */
function isPermutationInArray(s, a, current) {
    if (s.length === 0) return a.includes(current);
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        const remaining = s.slice(0, i) + s.slice(i + 1);
        if (isPermutationInArray(remaining, a, current + char)) return true;
    }
    return false;
}

/**
 * Generates all permutations of an array using backtracking.
 * @param {number[]} nums - Input array
 * @returns {number[][]} All permutations
 */
function generatePermutations(nums) {
    const result = [];
    function backtrack(path, used) {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            path.push(nums[i]);
            backtrack(path, used);
            used[i] = false;
            path.pop();
        }
    }
    backtrack([], []);
    return result;
}

/**
 * Generates all subsets of an array using backtracking (include/exclude pattern).
 * @param {number[]} nums - Input array
 * @param {number} [index=0] - Current index
 * @param {number[]} [current=[]] - Current subset
 * @param {number[][]} [result=[]] - Accumulated results
 * @returns {void}
 */
function generateSubsets(nums, index = 0, current = [], result = []) {
    if (index === nums.length) {
        result.push([...current]);
        return;
    }
    current.push(nums[index]);
    generateSubsets(nums, index + 1, current, result); // include
    current.pop();
    generateSubsets(nums, index + 1, current, result); // exclude
}

// ========================
// Math / Number Problems
// ========================

/**
 * Checks if a number is odd or even.
 * @param {number} n - Input number
 * @returns {string} 'Odd' or 'Even'
 */
function checkOddOrEven(n) {
    return Math.floor(n / 2) * 2 === n ? 'Even' : 'Odd';
}

/**
 * Finds all divisors of n and returns count and sorted list.
 * @param {number} n - Input number
 * @returns {{count: number, result: number[]}} Divisors info
 */
function getAllDivisors(n) {
    const result = [];
    let count = 0;
    for (let i = 1; i * i <= n; i++) {
        if (n % i === 0) {
            count++;
            result.push(i);
            if (i !== n / i) {
                count++;
                result.push(n / i);
            }
        }
    }
    result.sort((a, b) => a - b);
    return { count, result };
}

/**
 * Finds the GCD (Greatest Common Divisor) of two numbers.
 * @param {number} n - First number
 * @param {number} m - Second number
 * @returns {number} GCD
 */
function findGCD(n, m) {
    let gcd = 0;
    for (let i = 1; i <= Math.min(n, m); i++) {
        if (n % i === 0 && m % i === 0) gcd = i;
    }
    return gcd;
}

/**
 * Returns the floor of the square root of n. Linear scan.
 * @param {number} n - Input number
 * @returns {number} Floor square root
 */
function floorSqrtLinear(n) {
    let ans = 0;
    for (let i = 0; i < n; i++) {
        if (i * i <= n) ans = i;
        else break;
    }
    return ans;
}

/**
 * Returns the floor of the square root of n using binary search.
 * @param {number} n - Input number
 * @returns {number} Floor square root
 */
function floorSqrtBinarySearch(n) {
    let low = 0, high = Math.floor(n / 2);
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (mid * mid <= n) low = mid + 1;
        else high = mid - 1;
    }
    return high;
}

/**
 * Checks if a number is a perfect square using binary search.
 * @param {number} n - Input number
 * @returns {boolean} True if perfect square
 */
function isPerfectSquare(n) {
    let left = 0, right = Math.floor(n / 2);
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        const sq = mid * mid;
        if (sq === n) return true;
        if (sq < n) left = mid + 1;
        else right = mid - 1;
    }
    return false;
}

/**
 * Checks if c can be expressed as sum of two squares.
 * @param {number} c - Input number
 * @returns {boolean} True if c = a² + b²
 */
function judgeSquareSum(c) {
    let left = 0, right = Math.floor(Math.sqrt(c));
    while (left <= right) {
        const sum = left * left + right * right;
        if (sum === c) return true;
        if (sum < c) left++;
        else right--;
    }
    return false;
}

/**
 * Finds the m-th root of n using binary search.
 * @param {number} n - Target value
 * @param {number} m - Root degree
 * @returns {number} m-th root or -1 if not a perfect root
 */
function nthRoot(n, m) {
    let low = 0, high = Math.floor(n / 2);
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        let power = 1;
        for (let i = 0; i < m; i++) {
            power *= mid;
            if (power > n) break;
        }
        if (power === n) return mid;
        if (power < n) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

/**
 * Moves all zeros to the end of the array while preserving order.
 * @param {number[]} arr - Input array
 * @returns {number[]} Modified array
 */
function moveZerosToEnd(arr = []) {
    let left = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) arr[left++] = arr[i];
    }
    while (left < arr.length) arr[left++] = 0;
    return arr;
}

// ========================
// Binary Search (Advanced)
// ========================

/**
 * Returns the first index where arr[i] >= target (lower bound).
 * @param {number[]} arr - Sorted array
 * @param {number} target - Target value
 * @returns {number} Lower bound index
 */
function lowerBound(arr = [], target) {
    let left = 0, right = arr.length;
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (arr[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left;
}

/**
 * Returns the first index where arr[i] > target (upper bound).
 * @param {number[]} arr - Sorted array
 * @param {number} target - Target value
 * @returns {number} Upper bound index
 */
function upperBound(arr = [], target) {
    let left = 0, right = arr.length;
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (arr[mid] <= target) left = mid + 1;
        else right = mid;
    }
    return left;
}

/**
 * Finds the first and last occurrence of target in sorted array.
 * @param {number[]} nums - Sorted array
 * @param {number} target - Target value
 * @returns {number[]} [firstIndex, lastIndex] or [-1, -1]
 */
function searchRange(nums, target) {
    const lb = lowerBound(nums, target);
    const ub = upperBound(nums, target);
    if (lb === nums.length || nums[lb] !== target) return [-1, -1];
    return [lb, ub - 1];
}

/**
 * Finds the minimum value in a rotated sorted array (no duplicates).
 * @param {number[]} arr - Rotated sorted array
 * @returns {number} Minimum value
 */
function findMinInRotatedSortedArray(arr = []) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (arr[mid] > arr[right]) left = mid + 1;
        else right = mid;
    }
    return arr[left];
}

/**
 * Finds the minimum value in a rotated sorted array (with duplicates).
 * @param {number[]} arr - Rotated sorted array
 * @returns {number} Minimum value
 */
function findMinInRotatedSortedArrayWithDuplicates(arr = []) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (arr[left] < arr[right]) return arr[left];
        if (arr[mid] >= arr[left]) left = mid + 1;
        else right = mid;
    }
    return arr[left];
}

/**
 * Finds the maximum element in a rotated sorted array.
 * @param {number[]} arr - Rotated sorted array
 * @returns {number} Maximum value
 */
function findMaxInRotatedSortedArray(arr = []) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (arr[mid] > arr[right]) left = mid + 1;
        else right = mid;
    }
    return arr[(left - 1 + arr.length) % arr.length];
}

/**
 * Finds a peak element index in the array using binary search.
 * @param {number[]} arr - Input array
 * @returns {number} Value of the peak element
 */
function findPeakElement(arr = []) {
    if (arr.length === 1) return arr[0];
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (arr[mid] < arr[mid + 1]) left = mid + 1;
        else right = mid;
    }
    return arr[left];
}

/**
 * Finds the single non-duplicate element in a sorted array where all others appear twice.
 * Uses XOR. Time Complexity: O(n)
 * @param {number[]} arr - Input array
 * @returns {number} Single element
 */
function findSingleElementXOR(arr = []) {
    let single = 0;
    for (const num of arr) single ^= num;
    return single;
}

/**
 * Finds the single non-duplicate element using binary search. Time Complexity: O(log n)
 * @param {number[]} arr - Sorted array
 * @returns {number} Single element
 */
function findSingleElementBinarySearch(arr = []) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        let mid = Math.floor(left + (right - left) / 2);
        if (mid % 2 === 1) mid--;
        if (arr[mid] === arr[mid + 1]) left = mid + 2;
        else right = mid;
    }
    return arr[left];
}

/**
 * Finds the single non-duplicate element using a frequency map. Brute-force.
 * @param {number[]} arr - Input array
 * @returns {number} Single element or -1
 */
function findSingleElementBrute(arr = []) {
    const map = {};
    for (const num of arr) map[num] = (map[num] || 0) + 1;
    for (const key in map) {
        if (map[key] === 1) return +key;
    }
    return -1;
}

// ========================
// Binary Search on Answer
// ========================

/**
 * Finds the minimum eating speed for Koko to eat all bananas within h hours.
 * @param {number[]} piles - Pile sizes
 * @param {number} h - Hour limit
 * @returns {number} Minimum speed
 */
function minBananaEatingSpeed(piles = [], h) {
    let low = 1, high = Math.max(...piles);
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        const hours = piles.reduce((acc, val) => acc + Math.ceil(val / mid), 0);
        if (hours <= h) high = mid - 1;
        else low = mid + 1;
    }
    return low;
}

/**
 * Finds the minimum ship capacity to ship all packages within the given days.
 * @param {number[]} weights - Package weights
 * @param {number} days - Day limit
 * @returns {number} Minimum ship capacity
 */
function minShipCapacity(weights, days) {
    let low = Math.max(...weights);
    let high = weights.reduce((acc, curr) => acc + curr, 0);
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        let dayCount = 1, currentWeight = 0;
        for (const w of weights) {
            if (currentWeight + w > mid) { dayCount++; currentWeight = w; }
            else currentWeight += w;
        }
        if (dayCount <= days) high = mid - 1;
        else low = mid + 1;
    }
    return low;
}

/**
 * Finds the minimum divisor such that the sum of ceil(arr[i]/divisor) <= limit.
 * @param {number[]} arr - Input array
 * @param {number} limit - Max allowed sum
 * @returns {number} Minimum divisor
 */
function findSmallestDivisor(arr, limit) {
    let low = 1, high = Math.max(...arr);
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        let total = 0;
        for (const val of arr) {
            total += Math.ceil(val / mid);
            if (total > limit) break;
        }
        if (total <= limit) high = mid - 1;
        else low = mid + 1;
    }
    return low;
}

/**
 * Finds the minimum day on which m bouquets of k adjacent flowers can be made.
 * Binary search on answer approach.
 * @param {number[]} bloomDay - Days for each flower to bloom
 * @param {number} m - Number of bouquets needed
 * @param {number} k - Flowers per bouquet
 * @returns {number} Minimum day or -1
 */
function minDaysForBouquets(bloomDay = [], m, k) {
    const n = bloomDay.length;
    if (m * k > n) return -1;
    let low = Math.min(...bloomDay);
    let high = Math.max(...bloomDay);
    let ans = -1;

    while (low <= high) {
        const midDay = Math.floor(low + (high - low) / 2);
        if (canMakeBouquets(bloomDay, midDay, m, k)) {
            ans = midDay;
            high = midDay - 1;
        } else {
            low = midDay + 1;
        }
    }
    return ans;
}

/**
 * Helper: checks if m bouquets of k adjacent flowers are possible by a given day.
 * @param {number[]} arr - Bloom days array
 * @param {number} day - Current day check
 * @param {number} m - Required bouquets
 * @param {number} k - Flowers per bouquet
 * @returns {boolean} True if possible
 */
function canMakeBouquets(arr = [], day, m, k) {
    let flowers = 0, bouquets = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= day) {
            flowers++;
            if (flowers === k) { bouquets++; if (bouquets >= m) return true; flowers = 0; }
        } else {
            flowers = 0;
        }
    }
    return bouquets >= m;
}

/**
 * Finds the kth missing positive number using binary search.
 * @param {number[]} arr - Sorted array of positive integers
 * @param {number} k - Missing number position
 * @returns {number} The kth missing number
 */
function kthMissingNumber(arr, k) {
    let left = 0, right = arr.length;
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (arr[mid] - mid - 1 < k) left = mid + 1;
        else right = mid;
    }
    return left + k;
}

/**
 * Finds the maximum minimum distance to place cows in stalls (Aggressive Cows).
 * @param {number[]} stalls - Stall positions
 * @param {number} cows - Number of cows
 * @returns {number} Maximum of minimum distances
 */
function aggressiveCows(stalls, cows) {
    stalls.sort((a, b) => a - b);
    let left = 1, right = stalls[stalls.length - 1] - stalls[0], ans = 0;
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (canPlaceCows(stalls, cows, mid)) { ans = mid; left = mid + 1; }
        else right = mid - 1;
    }
    return ans;
}

/**
 * Helper: checks if cows can be placed with at least minDist apart.
 * @param {number[]} stalls - Sorted stall positions
 * @param {number} cows - Number of cows
 * @param {number} minDist - Minimum required distance
 * @returns {boolean} True if placement is possible
 */
function canPlaceCows(stalls, cows, minDist) {
    let cowCount = 1, lastPos = stalls[0];
    for (let i = 1; i < stalls.length; i++) {
        if (stalls[i] - lastPos >= minDist) {
            cowCount++;
            lastPos = stalls[i];
        }
        if (cowCount === cows) return true;
    }
    return false;
}

/**
 * Book Allocation — finds the minimum max pages that can be assigned to m students.
 * @param {number[]} books - Array of page counts
 * @param {number} m - Number of students
 * @returns {number} Minimum possible max pages or -1
 */
function bookAllocation(books, m) {
    if (m > books.length) return -1;
    let low = Math.max(...books);
    let high = books.reduce((acc, curr) => acc + curr, 0);
    let ans = -1;
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (canAllocateBooks(books, m, mid)) { ans = mid; high = mid - 1; }
        else low = mid + 1;
    }
    return ans;
}

/**
 * Helper: checks if books can be allocated to m students with max pages = limit.
 * @param {number[]} books - Array of page counts
 * @param {number} m - Number of students
 * @param {number} limit - Max pages per student
 * @returns {boolean} True if allocation is possible
 */
function canAllocateBooks(books, m, limit) {
    let studentCount = 1, totalPages = 0;
    for (const pages of books) {
        if (pages + totalPages > limit) {
            studentCount++;
            totalPages = pages;
            if (studentCount > m) return false;
        } else {
            totalPages += pages;
        }
    }
    return true;
}

/**
 * Finds the smallest maximum distance between gas stations after adding k stations.
 * @param {number[]} stations - Sorted station positions
 * @param {number} k - Number of new stations to add
 * @returns {number} Minimum possible maximum distance
 */
function findSmallestMaxGasStationDistance(stations, k) {
    let low = 0, high = 0;
    for (let i = 0; i < stations.length - 1; i++) {
        high = Math.max(high, stations[i + 1] - stations[i]);
    }
    while (high - low > 1e-6) {
        const mid = (low + high) / 2.0;
        const stationsNeeded = countRequiredGasStations(stations, mid);
        if (stationsNeeded > k) low = mid;
        else high = mid;
    }
    return low;
}

/**
 * Helper: counts how many new gas stations are needed to keep gap <= dist.
 * @param {number[]} stations - Sorted station positions
 * @param {number} dist - Maximum allowed distance
 * @returns {number} Number of additional stations needed
 */
function countRequiredGasStations(stations, dist) {
    let count = 0;
    for (let i = 1; i < stations.length; i++) {
        const gap = stations[i] - stations[i - 1];
        count += Math.floor(gap / dist);
    }
    return count;
}

/**
 * Finds the median of two sorted arrays by merging them.
 * Time Complexity: O(m+n)
 * @param {number[]} arr1 - First sorted array
 * @param {number[]} arr2 - Second sorted array
 * @returns {number} Median element
 */
function medianOfTwoSortedArrays(arr1, arr2) {
    const merged = [];
    let i = 0, j = 0;
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) merged.push(arr1[i++]);
        else merged.push(arr2[j++]);
    }
    while (i < arr1.length) merged.push(arr1[i++]);
    while (j < arr2.length) merged.push(arr2[j++]);
    return merged[Math.floor(merged.length / 2)];
}

/**
 * Finds the last occurrence of target in a sorted array.
 * @param {number[]} arr - Sorted array
 * @param {number} target - Target value
 * @returns {number} Last occurrence index
 */
function findLastOccurrence(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (arr[mid] > target) right = mid;
        else left = mid + 1;
    }
    return left - 1;
}

// ========================
// Pyramid
// ========================

/**
 * Prints a pyramid pattern of n rows to the console.
 * @param {number} n - Number of rows
 * @returns {void}
 */
function printPyramid(n) {
    for (let i = 0; i < n; i++) {
        let row = '';
        for (let j = n - i; j >= 0; j--) row += ' ';
        for (let j = 0; j < i + 1; j++) row += '*';
        for (let j = 1; j < i + 1; j++) row += '*';
        console.log(row);
    }
}