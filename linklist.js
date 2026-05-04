// =============================================================================
// Node & LinkedList Core Classes
// =============================================================================

/**
 * Represents a single node in a singly linked list.
 */
class Node {
    /**
     * @param {*} value - The value stored in this node.
     */
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

/**
 * Singly Linked List with head, tail tracking.
 */
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // ─────────────────────────────────────────
    // INSERT
    // ─────────────────────────────────────────

    /**
     * Inserts a new node at the front of the list.
     * @param {*} value
     */
    pushFront(value) {
        const newNode = new Node(value);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.size++;
    }

    /**
     * Inserts a new node at the back of the list.
     * @param {*} value
     */
    pushBack(value) {
        const newNode = new Node(value);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }

    /**
     * Builds the list by pushing each element of an array to the back.
     * @param {Array} arr
     */
    pushBackFromArray(arr) {
        for (let i = 0; i < arr.length; i++) {
            this.pushBack(arr[i]);
        }
    }

    // ─────────────────────────────────────────
    // REMOVE
    // ─────────────────────────────────────────

    /**
     * Removes and returns the value of the first node.
     * @returns {*|false} Removed value, or false if list is empty.
     */
    popFront() {
        if (this.head === null) return false;

        const removedNode = this.head;
        this.head = this.head.next;

        if (this.head === null) {
            this.tail = null;
        }

        removedNode.next = null;
        this.size--;
        return removedNode.value;
    }

    /**
     * Removes and returns the value of the last node.
     * @returns {*|false} Removed value, or false if list is empty.
     */
    popBack() {
        if (this.head === null) return false;

        if (this.head === this.tail) {
            const val = this.head.value;
            this.head = null;
            this.tail = null;
            this.size--;
            return val;
        }

        let temp = this.head;
        while (temp.next !== this.tail) {
            temp = temp.next;
        }

        const val = this.tail.value;
        temp.next = null;
        this.tail = temp;
        this.size--;
        return val;
    }

    /**
     * Removes the node at a given 1-based position.
     * @param {number} position - 1-based index.
     * @returns {boolean}
     */
    popAt(position) {
        if (this.head === null) return false;
        if (position < 1 || position > this.size) return false;

        if (position === 1) {
            this.head = this.head.next;
            if (this.head === null) this.tail = null;
            this.size--;
            return true;
        }

        let curr = this.head;
        let prev = null;
        let count = 1;

        while (curr !== null && count < position) {
            prev = curr;
            curr = curr.next;
            count++;
        }

        prev.next = curr.next;
        if (curr === this.tail) {
            this.tail = prev;
        }
        curr.next = null;
        this.size--;
        return true;
    }

    /**
     * Removes every Nth node from the list (1-based counting).
     * @param {number} k - Remove every k-th node.
     * @returns {Node|null} New head of the list.
     */
    removeEveryNthNode(k) {
        if (k <= 0 || this.head === null) return null;

        if (k === 1) {
            this.head = null;
            this.tail = null;
            this.size = 0;
            return null;
        }

        let curr = this.head;
        let prev = null;
        let count = 1;

        while (curr !== null) {
            if (count === k) {
                prev.next = curr.next;
                if (curr === this.tail) {
                    this.tail = prev;
                }
                curr.next = null;
                curr = prev.next;
                count = 1;
                this.size--;
            } else {
                prev = curr;
                curr = curr.next;
                count++;
            }
        }

        return this.head;
    }

    /**
     * Removes the Nth node from the end of the list.
     * @param {number} n - Position from the end (1-based).
     * @returns {*|null} Removed value, or null if invalid.
     */
    removeNthFromEnd(n) {
        if (this.head === null) return null;

        let count = 0;
        let temp = this.head;
        while (temp !== null) {
            count++;
            temp = temp.next;
        }

        if (n > count) return null;

        const targetPos = count - n;
        let prev = null;
        let curr = this.head;
        let steps = targetPos;

        while (steps-- > 0) {
            prev = curr;
            curr = curr.next;
        }

        if (prev === null) {
            // Removing the head
            this.head = curr.next;
            if (this.head === null) this.tail = null;
        } else {
            prev.next = curr.next;
            if (curr === this.tail) {
                this.tail = prev;
            }
        }

        curr.next = null;
        this.size--;
        return curr.value;
    }

    // ─────────────────────────────────────────
    // PEEK
    // ─────────────────────────────────────────

    /**
     * Returns the value of the first node without removing it.
     * @returns {*|null}
     */
    peekFront() {
        return this.head ? this.head.value : null;
    }

    /**
     * Returns the value of the last node without removing it.
     * @returns {*|null}
     */
    peekBack() {
        return this.tail ? this.tail.value : null;
    }

    /**
     * Returns the middle node using the slow/fast pointer technique.
     * For even-length lists, returns the second middle node.
     * @returns {Node|null}
     */
    peekMiddle() {
        let slow = this.head;
        let fast = this.head;
        while (fast !== null && fast.next !== null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    // ─────────────────────────────────────────
    // REVERSE
    // ─────────────────────────────────────────

    /**
     * Reverses the linked list in place by relinking nodes.
     */
    reverse() {
        let prev = null;
        let curr = this.head;
        const oldHead = this.head;

        while (curr !== null) {
            const next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }

        this.head = prev;
        this.tail = oldHead;
    }

    /**
     * Reverses the first k nodes of the list, keeping the rest intact.
     * @param {number} k - Number of nodes from the front to reverse.
     */
    reverseFirstKNodes(k) {
        if (this.head === null || this.size < k) return;

        let curr = this.head;
        let prev = null;
        const oldHead = this.head;
        let remaining = k;

        while (curr !== null && remaining > 0) {
            const next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
            remaining--;
        }

        oldHead.next = curr;
        this.head = prev;

        if (k === this.size) {
            this.tail = oldHead;
        }
    }

    /**
     * Reverses the list in groups of size k (in-place).
     * @param {number} k - Group size.
     */
    reverseInGroupsOfK(k) {
        if (this.head === null || k <= 1) return;

        let curr = this.head;
        let prevGroupTail = null;
        this.head = null;

        while (curr !== null) {
            const groupHead = curr;
            let prev = null;
            let count = 0;

            while (curr !== null && count < k) {
                const next = curr.next;
                curr.next = prev;
                prev = curr;
                curr = next;
                count++;
            }

            // prev is now the new head of the reversed group
            if (this.head === null) {
                this.head = prev;
            }

            if (prevGroupTail !== null) {
                prevGroupTail.next = prev;
            }

            groupHead.next = curr;
            prevGroupTail = groupHead;
        }

        this.tail = prevGroupTail;
    }

    // ─────────────────────────────────────────
    // CYCLE DETECTION
    // ─────────────────────────────────────────

    /**
     * Detects whether the list contains a cycle using Floyd's algorithm.
     * @returns {boolean}
     */
    hasCycle() {
        let slow = this.head;
        let fast = this.head;

        while (fast !== null && fast.next !== null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow === fast) return true;
        }

        return false;
    }

    /**
     * Returns the length of the cycle if one exists.
     * Uses a HashMap to record first-visit index of each node.
     * Time: O(n), Space: O(n)
     * @returns {number} Cycle length, or 0 if no cycle.
     */
    cycleLength() {
        const visitMap = new Map();
        let temp = this.head;
        let count = 0;

        while (temp !== null) {
            if (visitMap.has(temp)) {
                return count - visitMap.get(temp);
            }
            visitMap.set(temp, count);
            count++;
            temp = temp.next;
        }

        return 0;
    }

    /**
     * Detects and removes a cycle from the list if one exists.
     * Uses Floyd's cycle detection + entry-point finding.
     * Time: O(n), Space: O(1)
     */
    removeCycle() {
        let slow = this.head;
        let fast = this.head;

        while (fast !== null && fast.next !== null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow === fast) break;
        }

        if (fast === null || fast.next === null) return; // No cycle

        slow = this.head;
        let prev = null;

        while (slow !== fast) {
            prev = fast;
            slow = slow.next;
            fast = fast.next;
        }

        prev.next = null;
    }

    // ─────────────────────────────────────────
    // DUPLICATE REMOVAL
    // ─────────────────────────────────────────

    /**
     * Removes duplicate values using a HashSet.
     * Preserves first occurrence. Time: O(n), Space: O(n)
     */
    removeDuplicatesWithHashSet() {
        let curr = this.head;
        let prev = null;
        const seen = new Set();

        while (curr !== null) {
            if (seen.has(curr.value)) {
                prev.next = curr.next;
                if (curr === this.tail) this.tail = prev;
                this.size--;
            } else {
                seen.add(curr.value);
                prev = curr;
            }
            curr = curr.next;
        }
    }

    /**
     * Removes duplicate values without extra memory using nested traversal.
     * Time: O(n²), Space: O(1)
     */
    removeDuplicatesInPlace() {
        let curr = this.head;

        while (curr !== null) {
            let runner = curr;
            while (runner.next !== null) {
                if (runner.next.value === curr.value) {
                    runner.next = runner.next.next;
                    this.size--;
                } else {
                    runner = runner.next;
                }
            }
            curr = curr.next;
        }

        // Re-sync tail
        let temp = this.head;
        while (temp !== null && temp.next !== null) {
            temp = temp.next;
        }
        this.tail = temp;
    }

    // ─────────────────────────────────────────
    // DISPLAY
    // ─────────────────────────────────────────

    /**
     * Returns a string representation of the list.
     * @returns {string} e.g. "1-->2-->3-->null"
     */
    toString() {
        let result = '';
        let temp = this.head;
        while (temp !== null) {
            result += temp.value + '-->';
            temp = temp.next;
        }
        return result + 'null';
    }
}

// =============================================================================
// Doubly Linked List
// =============================================================================

/**
 * Represents a single node in a doubly linked list.
 */
class DoublyNode {
    /**
     * @param {*} value
     */
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

/**
 * Doubly Linked List with head, tail, and size tracking.
 */
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    /**
     * Inserts a new node at the front.
     * @param {*} value
     * @returns {DoublyNode}
     */
    pushFront(value) {
        const newNode = new DoublyNode(value);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
        return newNode;
    }

    /**
     * Inserts a new node at the back.
     * @param {*} value
     * @returns {DoublyNode}
     */
    pushBack(value) {
        const newNode = new DoublyNode(value);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
        return newNode;
    }

    /**
     * Removes and returns the first node.
     * @returns {DoublyNode|undefined}
     */
    popFront() {
        if (this.head === null) return undefined;

        const removedNode = this.head;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
            removedNode.next = null;
        }

        this.size--;
        return removedNode;
    }

    /**
     * Removes and returns the last node.
     * @returns {DoublyNode|undefined}
     */
    popBack() {
        if (this.head === null) return undefined;

        const removedNode = this.tail;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = removedNode.prev;
            removedNode.prev = null;
            this.tail.next = null;
        }

        this.size--;
        return removedNode;
    }

    /**
     * Removes the node at a given 1-based position.
     * @param {number} position
     * @returns {DoublyNode|null}
     */
    popAt(position) {
        if (this.size === 0) return null;
        if (position < 1 || position > this.size) return null;

        if (position === 1) return this.popFront();
        if (position === this.size) return this.popBack();

        let curr = this.head;
        let count = 1;
        while (curr !== null && count < position) {
            curr = curr.next;
            count++;
        }

        curr.prev.next = curr.next;
        curr.next.prev = curr.prev;
        curr.next = null;
        curr.prev = null;
        this.size--;
        return curr;
    }
}

// =============================================================================
// Standalone Utility Functions
// =============================================================================

/**
 * Finds the intersection node value of two singly linked lists.
 * Uses length-difference technique. Time: O(n+m), Space: O(1)
 * @param {Node} head1
 * @param {Node} head2
 * @returns {*} Intersecting node's value, or -1 if no intersection.
 */
function findIntersectionValue(head1, head2) {
    let count1 = 0;
    let count2 = 0;
    let temp1 = head1;
    let temp2 = head2;

    while (temp1 !== null) { count1++; temp1 = temp1.next; }
    while (temp2 !== null) { count2++; temp2 = temp2.next; }

    let pointer1 = head1;
    let pointer2 = head2;
    let diff = Math.abs(count1 - count2);

    if (count1 > count2) {
        while (diff-- > 0) pointer1 = pointer1.next;
    } else {
        while (diff-- > 0) pointer2 = pointer2.next;
    }

    while (pointer1 !== pointer2) {
        pointer1 = pointer1.next;
        pointer2 = pointer2.next;
    }

    return pointer1 === null ? -1 : pointer1.value;
}

/**
 * Merges two sorted linked lists into one sorted list.
 * Uses a dummy head to simplify edge cases. Time: O(n+m)
 * @param {Node} list1 - Head of the first sorted list.
 * @param {Node} list2 - Head of the second sorted list.
 * @returns {Node} Head of the merged sorted list.
 */
function mergeSortedLists(list1, list2) {
    const dummy = new Node(-1);
    let tail = dummy;

    while (list1 !== null && list2 !== null) {
        if (list1.value <= list2.value) {
            tail.next = list1;
            list1 = list1.next;
        } else {
            tail.next = list2;
            list2 = list2.next;
        }
        tail = tail.next;
    }

    tail.next = list1 !== null ? list1 : list2;
    return dummy.next;
}

/**
 * Removes duplicate values from a sorted linked list (keeps one copy).
 * @param {Node} head
 * @returns {Node} Head of the deduplicated list.
 */
function removeDuplicatesFromSortedList(head) {
    let curr = head;
    while (curr !== null && curr.next !== null) {
        if (curr.value === curr.next.value) {
            curr.next = curr.next.next;
        } else {
            curr = curr.next;
        }
    }
    return head;
}

/**
 * Removes ALL nodes that have duplicate values in a sorted list
 * (keeps no copies at all).
 * @param {Node} head
 * @returns {Node} Head of the cleaned list.
 */
function removeAllDuplicatesFromSortedList(head) {
    const dummy = new Node(-1);
    dummy.next = head;
    let prev = dummy;
    let curr = head;

    while (curr !== null) {
        if (curr.next !== null && curr.value === curr.next.value) {
            const dupValue = curr.value;
            while (curr !== null && curr.value === dupValue) {
                curr = curr.next;
            }
            prev.next = curr;
        } else {
            prev = curr;
            curr = curr.next;
        }
    }

    return dummy.next;
}

/**
 * Reorders list so all odd-indexed nodes come before even-indexed nodes.
 * Indices are 1-based (first node = odd). Time: O(n), Space: O(1)
 * @param {Node} head
 * @returns {Node} Reordered list head.
 */
function oddEvenReorder(head) {
    if (head === null) return null;

    let odd = head;
    let even = head.next;
    const evenHead = even;

    while (even !== null && even.next !== null) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
    }

    odd.next = evenHead;
    return head;
}

/**
 * Finds the minimum ship capacity to deliver all packages within given days.
 * Uses binary search. Time: O(n log(sum)), Space: O(1)
 * @param {number[]} weights - Array of package weights.
 * @param {number} days - Number of days available.
 * @returns {number} Minimum required capacity.
 */
function minShipCapacity(weights, days) {
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
}

/**
 * Checks whether all packages can be shipped within the given days
 * using a specific weight limit per day.
 * @param {number[]} weights
 * @param {number} limit - Max weight per day.
 * @param {number} days - Max allowed days.
 * @returns {boolean}
 */
function canShipInDays(weights, limit, days) {
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
}