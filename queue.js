// ============================================================
// Queue — FIFO (First In, First Out)
// Implemented using a Singly Linked List
// ============================================================

// ─── Node ────────────────────────────────────────────────────

/**
 * Singly linked list node used by the Queue.
 */
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// ─── Queue ───────────────────────────────────────────────────

/**
 * Queue data structure implemented using a singly linked list.
 * FIFO — First In, First Out.
 *
 * @example
 * const q = new Queue(1);
 * q.enqueue(2).enqueue(3);
 * q.peek();    // 1
 * q.dequeue(); // 1
 * q.print();   // "2 -> 3"
 */
class Queue {
    /**
     * Creates a Queue with one initial value.
     * @param {*} value - The first element in the queue
     */
    constructor(value) {
        const newNode = new Node(value);
        this.first = newNode;
        this.last = newNode;
        this.length = 1;
    }

    /**
     * Adds a new value to the back of the queue.
     * Time: O(1)
     * @param {*} value - Value to add
     * @returns {Queue} The queue itself (enables chaining)
     */
    enqueue(value) {
        const newNode = new Node(value);
        if (this.length === 0) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        this.length++;
        return this;
    }

    /**
     * Removes and returns the value from the front of the queue.
     * Time: O(1)
     * @returns {*|undefined} The removed front value, or undefined if queue is empty
     */
    dequeue() {
        if (this.length === 0) return undefined;

        const temp = this.first;

        if (this.length === 1) {
            this.first = null;
            this.last = null;
        } else {
            this.first = this.first.next;
            temp.next = null; // disconnect removed node
        }

        this.length--;
        return temp.value;
    }

    /**
     * Returns the front value without removing it.
     * Time: O(1)
     * @returns {*|null} Front value, or null if queue is empty
     */
    peek() {
        return this.first ? this.first.value : null;
    }

    /**
     * Prints all queue values from front to back.
     * Useful for debugging.
     */
    print() {
        let current = this.first;
        const values = [];
        while (current) {
            values.push(current.value);
            current = current.next;
        }
        console.log(values.join(' -> '));
    }
}