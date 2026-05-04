/**
 * ================================
 * UTILS
 * ================================
 */

/**
 * Calculate middle index safely (avoids overflow)
 * @param {number} left
 * @param {number} right
 * @returns {number}
 */
const findMid = (left, right) => Math.floor(left + (right - left) / 2);


/**
 * ================================
 * LINEAR SEARCH
 * ================================
 */

/**
 * Find two indices such that their values sum to target
 * Time Complexity: O(n^2)
 * @param {number[]} arr
 * @param {number} target
 * @returns {number[]|number} indices or -1 if not found
 */
function twoSum(arr = [], target) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) { // fixed duplicate bug
            if (arr[i] + arr[j] === target) {
                return [i, j];
            }
        }
    }
    return -1;
}

/**
 * Find index of target using linear search
 * Time Complexity: O(n)
 * @param {number[]} arr
 * @param {number} target
 * @returns {number} index or -1 if not found
 */
function findTarget(arr = [], target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}


/**
 * ================================
 * BINARY SEARCH
 * ================================
 */

/**
 * Find target index in sorted array using binary search
 * Time Complexity: O(log n)
 * @param {number[]} arr - sorted array
 * @param {number} target
 * @returns {number} index or -1
 */
const findTargetB = (arr = [], target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = findMid(left, right);

        if (arr[mid] === target) return mid;

        if (target > arr[mid]) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
};


/**
 * Find first and last position of target in sorted array
 * Time Complexity: O(log n)
 * @param {number[]} arr
 * @param {number} target
 * @returns {[number, number]}
 */
const positionOfTarget = (arr = [], target) => {

    /**
     * Find first occurrence
     */
    function firstIndex(arr, target) {
        let left = 0;
        let right = arr.length - 1;
        let firstIdx = -1;

        while (left <= right) {
            const mid = findMid(left, right);

            if (arr[mid] === target) {
                firstIdx = mid;
                right = mid - 1;
            } else if (target > arr[mid]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return firstIdx;
    }

    /**
     * Find last occurrence
     */
    function lastIndex(arr, target) {
        let left = 0;
        let right = arr.length - 1;
        let lastIdx = -1;

        while (left <= right) {
            const mid = findMid(left, right);

            if (arr[mid] === target) {
                lastIdx = mid;
                left = mid + 1;
            } else if (target > arr[mid]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return lastIdx;
    }

    const first = firstIndex(arr, target);
    if (first === -1) return [-1, -1];

    const last = lastIndex(arr, target);

    return [first, last];
};


/**
 * Find first and last position using linear scan
 * Time Complexity: O(n)
 * @param {number[]} arr
 * @param {number} target
 * @returns {[number, number]}
 */
const positionOfTargetLinear = (arr = [], target) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            let count = 1;

            while (arr[i + count] === target) {
                count++;
            }

            return [i, i + count - 1];
        }
    }
    return [-1, -1];
};


/**
 * Count occurrences of target in array
 * @param {number[]} arr
 * @param {number} target
 * @returns {number}
 */
const countTargetElementInArray = (arr = [], target) => {
    const [start, end] = positionOfTargetLinear(arr, target);

    if (start === -1) return 0;

    return end - start + 1;
};


/**
 * ================================
 * ARRAY UTILITIES
 * ================================
 */

/**
 * Find maximum (peak) value in array
 * Time Complexity: O(n)
 * @param {number[]} arr
 * @returns {number}
 */
function findPeak(arr = []) {
    let max = -Infinity;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    return max;
}