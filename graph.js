class Graph {
    constructor(n) {
        this.list = Array.from({ length: n }, () => []);
    }

    BFS(graph, src) {
        const result = [];
        const visitred = new Array(n).fill(false);
        visitred[0] = true;
        const queue = [src];
        while (queue.length) {
            const node = queue.shift();
            result.push(node);
            for (const nei of graph[node]) {
                if (!visitred[nei]) {
                    visitred[nei] = true;
                    queue.push(nei);
                }
            }
        }
        return result;
    }
    DFS(edges, src, n) {
        const graph = Array.from({ length: n }, () => []);

        for (const [u, v] of graph) {
            graph[u].push(v);
            graph[v].push(u);
        }

        const visitred = new Array(n).fill(false);
        const result = [];
        function dfsFun(node) {
            result.push(node);
            for (const nei of graph[node]) {
                if (!visitred[nei]) {
                    visitred[nei] = true;
                    dfsFun(nei);
                }
            }
        }
        for (let i = 0; i < graph.length; i++) {
            if (!visitred[i]) {
                visitred[i] = true;
                dfsFun(i);
            }
        }
    }

    kanthAlgoritm(edges, n) {
        const graph = Array.from({ length: n }, () => []);
        const inDegree = new Array(n).fill(0);
        const queue = [];
        const result = [];
        for (const [u, v] of edges) {
            // build directed graphj from edges list
            graph[u].push(v);
            inDegree[v]++;
        }

        for (let i = 0; i < inDegree.length; i++) {
            if (inDegree[i] == 0) {
                queue.push(i);
            }
        }
        let index = 0;
        while (queue.length) {
            const node = queue[index++];
            result.push(node);
            for (const nei of graph[node]) {
                inDegree[nei]--;
                if (inDegree[nei] == 0) {
                    queue.push(nei);
                }
            }
        }

        if (result.length != n) {
            return [];
        }
        return result;
    }
}

function numberOfilandDFS(grid, n, m) {
    let count = 0;

    const direction = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    function dfs(row, col) {
        if (row < 0 || col < 0 || row >= n || col >= m || grid[row][col] !== '1') {
            return;
        }

        grid[row][col] = '0';

        for (const [newRow, newCal] of direction) {
            dfs(row + newRow, col + newCal);
        }
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] == '1') {
                count++;
                dfs(i, j);
            }
        }
    }
}

function numberOfIslandBFS(grid, n, m) {
    let count = 0;

    const direction = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === '1') {
                // নতুন island
                count++;

                // starting cell visited
                grid[i][j] = '0';

                let queue = [[i, j]];
                let index = 0;

                while (index < queue.length) {
                    const [r, c] = queue[index++];

                    for (const [newRow, newCol] of direction) {
                        const makeRow = r + newRow;
                        const makeCol = c + newCol;

                        if (
                            makeRow >= 0 &&
                            makeRow < n &&
                            makeCol >= 0 &&
                            makeCol < m &&
                            grid[makeRow][makeCol] === '1'
                        ) {
                            // visited
                            grid[makeRow][makeCol] = '0';

                            // queue-তে রাখো
                            queue.push([makeRow, makeCol]);
                        }
                    }
                }
            }
        }
    }

    return count;
}

function rotateOrrange(grid = []) {
    // this is wrong approch
    const rows = grid.length;
    const cols = grid[0].length;
    const queue = [];
    let times = 0;
    const direction = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    let fresh = 0;

    // inital data queue
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] == '2') {
                queue.push([row, col]);
            } else if (grid[row][col] == '1') fresh++;
        }
    }

    let index = 0;

    while (index < queue.length && fresh > 0) {
        let size = queue.length - index;

        for (let i = 0; i < size; i++) {
            let [r, c] = queue[index++];
            for (let [dr, dc] of direction) {
                let nr = dr + r;
                let nc = dc + c;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == '1') {
                    grid[nr][nc] = '2';
                    fresh--;
                    queue.push([nr, nc]);
                }
            }
        }
        times++;
    }
    return fresh !== 0 ? -1 : times;
}

function cycleDirectDFS(graph, n) {
    const path = new Array(n).fill(false);
    const visited = new Array(n).fill(false);
    function dfs(node) {
        visited[node] = true;
        path[node] = true;

        for (const nei of graph[node]) {
            if (!visited[nei]) {
                if (dfs(nei)) {
                    return true;
                }
            } else if (path[nei]) {
                return true;
            }
        }
        path[node] = false;
        return false;
    }

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            if (dfs(i)) {
                return true;
            }
        }
    }
    return false;
}

function cycleUndirectDFS(graph = [], n) {
    const visited = new Array(n).fill(false);
    function dfs(node, parent) {
        visited[node] = true;

        for (const nei of graph[node]) {
            if (!visited[node]) {
                if (dfs(nei, node)) {
                    return true;
                }
            } else if (nei != parent) {
                return true;
            }
        }
        return false;
    }

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            if (dfs(i, -1)) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    let length = 0;

    let temp = head;
    while (temp) {
        count++;
        temp = temp.next;
    }

    if (count < n) return -1;
    if (n == length) return head.next;

    let removeIndex = count - n - 1;
    temp = head;
    while (removeIndex--) {
        temp = temp.next;
    }
    temp.next = temp.next.next;

    return head;
};

var removeNthFromEndBest = function (head, n) {
    let dummy = new ListNode(0, head);
    let fast = dummy;
    let slow = dummy;
    for (let i = 0; i < n; i++) {
        fast = fast.next;
    }

    while (fast.next) {
        fast = fast.next;
        slow = slow.next;
    }

    slow.next = slow.next.next;

    return head;
};

class MaxHeap {
    constructor() {
        this.heap = [];
        this.size = this.heap.length;
    }

    heapify_up(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);

            if (this.heap[index] <= this.heap[parent]) {
                break;
            }

            [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];

            index = parent;
        }
    }

    heapify_down(index) {
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let largest = index;

            if (left < this.size && this.heap[left] > this.heap[largest]) {
                largest = left;
            }

            if (right < this.size && this.heap[right] > this.heap[largest]) {
                largest = right;
            }

            if (largest === index) {
                break;
            }

            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];

            index = largest;
        }
    }

    push(value) {
        if (this.size == 0) {
            this.heap.push(value);
            return value;
        }

        this.heap.push(value);
        this.heapify_up(this.size - 1);
        return value;
    }
}

function topologicalSortDFS(edges, n) {
    const graph = Array.from({ length: n }, () => []);
    const visited = new Array(n).fill(false);
    const stack = [];
    for (const [u, v] of edges) {
        graph[u].push(v);
    }

    function dfs(node) {
        visited[node] = true;
        for (const nei of graph[node]) {
            if (!visited[nei]) {
                dfs(nei);
            }
        }
        stack.push(node);
    }

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i);
        }
    }

    const result = [];
    while (stack) {
        result.push(stack.pop());
    }
    return result;
}

function courseSeduleDFS(prereq = [], n) {
    const graph = Array.from({ length: n }, () => []);

    for (const [u, v] of prereq) {
        graph[u].push(v);
    }

    const path = new Array(n).fill(false);
    const visited = new Array(n).fill(false);

    function dfs(node) {
        visited[node] = true;
        path[node] = true;

        for (const nei of graph[node]) {
            if (!visited[nei]) {
                if (dfs(nei)) {
                    return true;
                }
            } else if (path[nei]) {
                return true;
            }
        }
        path[node] = false;
        return false;
    }

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            if (dfs(i)) {
                return false;
            }
        }
    }
    return true;
}

function canFinishBFS(numCourses, graph) {
    const inDegree = new Array(numCourses).fill(0);

    for (let i = 0; i < numCourses; i++) {
        for (let j = 0; j < graph[i].length; j++) {
            inDegree[graph[i][j]]++;
        }
    }

    const queue = [];
    for (let i = 0; i < inDegree.length; i++) {
        if (inDegree[i] == 0) {
            queue.push(i);
        }
    }
    let index = 0;
    while (queue.length > index) {
        const node = queue[index++];
        for (const nei of graph[node]) {
            inDegree[nei]--;
            if (inDegree[nei] == 0) {
                queue.push(nei);
            }
        }
    }
    return queue.length == numCourses ? true : false;
}

var rotateRight = function (head, k) {
    if (!head || !head.next || k === 0) {
        return head;
    }

    // 1. Find the length of the linked list
    let temp = head;
    let length = 0;

    while (temp) {
        length++;
        temp = temp.next;
    }

    // 2. Reduce k because rotating length times gives the same list
    k = k % length;

    if (k === 0) {
        return head;
    }

    // 3. Create a dummy node before the head
    const dummy = new ListNode(0, head);

    let slow = dummy;
    let fast = dummy;

    // 4. Move fast pointer k steps forward
    for (let i = 0; i < k; i++) {
        fast = fast.next;
    }

    // 5. Move both pointers until fast reaches the last node
    while (fast.next) {
        fast = fast.next;
        slow = slow.next;
    }

    const newHead = slow.next;
    slow.next = null;
    fast.next = head;
    return newHead;
};

var deleteDuplicates = function (head) {
    const dummy = new ListNode(0, head);

    let prev = dummy;
    let temp = head;

    while (temp) {
        // Check if current node has duplicates
        if (temp.next && temp.val === temp.next.val) {
            const duplicate = temp.val;

            // Skip all nodes with the duplicate value
            while (temp && temp.val === duplicate) {
                temp = temp.next;
            }

            // Remove the duplicate group
            prev.next = temp;
        } else {
            // Current node is unique
            prev = temp;
            temp = temp.next;
        }
    }

    return dummy.next;
};

function CourseSedule(numCourses, prerequisites) {
    const graph = Array.from({ length: numCourses }, () => []);
    const inDegree = new Array(numCourses).fill(0);

    for (const [course, prerequisite] of prerequisites) {
        graph[prerequisite].push(course);
        inDegree[course]++;
    }

    const queue = [];
    for (let i = 0; i < inDegree.length; i++) {
        if (inDegree[i] == 0) {
            queue.push(i);
        }
    }
    let index = 0;
    const result = [];
    while (queue.length > index) {
        const node = queue[index++];
        result.push(node);
        for (const nei of graph[node]) {
            inDegree[nei]--;
            if (inDegree[nei] == 0) {
                queue.push(nei);
            }
        }
    }
    return result.length === numCourses ? result : [];
}

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
    const graph = Array.from({ length: numCourses }, () => []);
    const path = new Array(numCourses).fill(false);
    const visited = new Array(numCourses).fill(false);
    const result = [];

    for (const [u, v] of prerequisites) {
        graph[u].push(v);
    }

    function dfs(node) {
        visited[node] = true;
        path[node] = true;
        result.push(node);
        for (const nei of graph[node]) {
            if (!visited[nei]) {
                if (dfs(nei)) {
                    return true;
                }
            } else if (path[nei]) {
                return true;
            }
        }
        path[node] = false;
        return false;
    }

    for (let i = 0; i < numCourses; i++) {
        if (!visited[i]) {
            if (dfs(i)) {
                return [];
            }
        }
    }

    return result;
};

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, color) {
    const rlen = image.length;
    const clen = image[0].length;
    const oldColor = image[sr][sc];
    if (oldColor == color) {
        return image;
    }
    const direction = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    function dfs(r, c) {
        if (r >= 0 && r < rlen && c >= 0 && c < clen && image[r][c] == oldColor) {
            image[r][c] = color;
            for (const [nr, nc] of direction) {
                const mr = nr + r;
                const mc = nc + c;
                dfs(mr, mc);
            }
        }
    }

    dfs(sr, sc);

    return image;
};

class Node {
    constructor(key, value, next) {
        this.key = key;
        this.val = value;
        this.next = next;
    }
}

class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null);
    }
    _hash(key) {
        let hash = 0;
        const str = String(key);
        const PRIME = 31;
        for (let i = 0; i < str.length; i++) {
            hash = (hash * PRIME + str.charCodeAt(i)) % this.capacity;
        }
        return Math.abs(hash);
    }
    set(key, value) {
        const index = this._hash(key);
        const head = this.buckets[index];
        let currentHead = this.buckets[index];
        while (currentHead) {
            if (currentHead.key == key) {
                currentHead.val = value;
                return currentHead;
            }
            currentHead = currentHead.next;
        }
        const newNode = new Node(key, value, head);
        this.buckets[index] = newNode;
        this.size++;

        if (this.size / this.capacity >= this.loadFactor) {
            this._resize(this.capacity * 2);
        }
        return newNode;
    }

    get(key) {
        const index = this._hash(key);
        let current = this.buckets[index];
        while (current) {
            if (current.key == key) {
                return current;
            }
            current = current.next;
        }
        return undefined;
    }

    delete(key) {
        const index = this._hash(key);
        let current = this.buckets[index];
        let prev = null;
        if (current == null) return undefined;

        while (current != null) {
            if (current.key == key) {
                let deletedItem = current.val;
                if (prev == null) {
                    this.buckets[index] = current.next;
                } else {
                    prev.next = current.next;
                }

                return deletedItem;
            }
            prev = current;
            current = current.next;
        }

        return undefined;
    }
    _resize(newCapacity) {
        let oldBuckets = this.buckets;
        this.buckets = new Array(newCapacity).fill(null);
        this.capacity = newCapacity;
        this.size = 0;

        for (let i = 0; i < oldBuckets.length; i++) {
            let current = oldBuckets[i];
            while (current !== null) {
                this.set(current.key, current.val);
                current = current.next;
            }
        }
    }
}

function dijkstra(n, edges, src) {
    const graph = Array.from({ length: n }, () => []);

    // Undirected graph
    for (const [u, v, weight] of edges) {
        graph[u].push([v, weight]);
        graph[v].push([u, weight]);
    }

    const distance = new Array(n).fill(Infinity);
    const visited = new Array(n).fill(false);

    distance[src] = 0;

    for (let i = 0; i < n; i++) {
        // Find minimum unvisited node
        let node = -1;

        for (let j = 0; j < n; j++) {
            if (!visited[j] && (node === -1 || distance[j] < distance[node])) {
                node = j;
            }
        }

        // No reachable node left
        if (node === -1 || distance[node] === Infinity) {
            break;
        }

        visited[node] = true;

        // Relax neighbors
        for (const [nei, weight] of graph[node]) {
            const newDistance = distance[node] + weight;

            if (newDistance < distance[nei]) {
                distance[nei] = newDistance;
            }
        }
    }

    return distance;
}

/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {
    const graph = Array.from({ length: n + 1 }, () => []);
    const visited = new Array(n + 1).fill(false);
    const distance = new Array(n + 1).fill(Infinity);

    // make graph
    for (const [u, v, w] of times) {
        graph[u].push([v, w]);
    }

    distance[k] = 0;
    for (let i = 1; i <= n; i++) {
        let minNode = -1;
        for (let j = 1; j <= n; j++) {
            if (!visited[j] && (minNode == -1 || distance[minNode] > distance[j])) {
                minNode = j;
            }
        }

        if (minNode == -1 || distance[minNode] == Infinity) {
            break;
        }

        visited[minNode] = true;
        for (const [nei, weight] of graph[minNode]) {
            const newWeight = distance[minNode] + weight;
            if (newWeight < distance[nei]) {
                distance[nei] = newWeight;
            }
        }
    }

    let maxTime = 0;
    for (let i = 1; i <= n; i++) {
        if (distance[i] === Infinity) return -1;
        maxTime = Math.max(maxTime, distance[i]);
    }
    return maxTime;
};

function solve(board) {
    const rows = board.length;
    const cols = board[0].length;
    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== '0') {
            return;
        }

        //safe wall
        board[r][c] = '#';
        dfs(r - 1, c); //top
        dfs(r + 1, c); // bottom
        dfs(r, c - 1); //left
        dfs(r, c + 1); // right
    }

    //top bottom check
    for (let top = 0; top < cols; top++) {
        if (board[0][top] == '0') {
            dfs(0, top);
        }
        if (board[rows - 0][top] == '0') {
            dfs(rows - 1, top);
        }
    }
    //left  right check
    for (let i = 0; i < rows; i++) {
        if (board[i][0] == '0') {
            dfs(i, 0);
        }
        if (board[i][cols - 1] == '0') {
            dfs(i, cols - 1);
        }
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] == '0') {
                board[i][j] = 'X';
            }
            if (board[i][j] == '#') {
                board[i][j] = '0';
            }
        }
    }
}

function solveWithBFS(board) {
    const rows = board.length;
    const cols = board[0].length;

    const queue = [];
    const direction = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    const index = 0;

    //top bottom check
    for (let top = 0; top < cols; top++) {
        if (board[0][top] == '0') {
            board[r][j] = '#';
            queue.push([0, top]);
        }
        if (board[rows - 0][top] == '0') {
            board[r][j] = '#';
            queue.push([rows - 1, top]);
        }
    }
    //left  right check
    for (let i = 0; i < rows; i++) {
        if (board[i][0] == '0') {
            board[r][j] = '#';
            queue.push([i, 0]);
        }
        if (board[i][cols - 1] == '0') {
            board[r][j] = '#';
            queue.push([i, cols - 1]);
        }
    }

    while (index < queue.length) {
        const [r, c] = queue[index++];

        for (const [nr, nc] of direction) {
            const mr = nr + r;
            const mc = nc + c;
            if (mr <= 0 && mr < rows && mc <= 0 && mc < cols && board[mr][mc] == '0') {
                queue.push([mr, mc]);
            }
        }
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] == '0') {
                board[i][j] = 'X';
            }
            if (board[i][j] == '#') {
                board[i][j] = '0';
            }
        }
    }
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
    const dummy = new ListNode(0, head);
    let prev = dummy;

    while (prev.next && prev.next.next) {
        let first = prev.next;
        let second = first.next;

        prev.next = second;
        first.next = second.next;
        second.next = first;
        prev = first;
    }
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
    const smallList = new ListNode(0);
    const bigList = new ListNode(0);

    let small = smallList;
    let big = bigList;

    let temp = head;
    while (temp) {
        const curr = temp.val;
        if (curr >= x) {
            // bigger one
            big.next = temp;
            big = big.next;
        } else {
            //smaller one
            small.next = temp;
            small = small.next;
        }
        temp = temp.next;
    }

    big.next = null;
    small.next = bigList.next;

    return smallList.next;
};

var reverseBetween = function (head, left, right) {
    if (left === right) return head;

    let leftSide = head;

    // left position-এ যাওয়া
    for (let i = 1; i < left; i++) {
        leftSide = leftSide.next;
    }

    // left-এর আগের node
    let beforeLeft = head;

    for (let i = 1; i < left - 1; i++) {
        beforeLeft = beforeLeft.next;
    }

    // Reverse শুরু
    let prev = null;
    let curr = leftSide;

    for (let i = 0; i <= right - left; i++) {
        const next = curr.next;

        curr.next = prev;

        prev = curr;
        curr = next;
    }

    // Reconnect
    if (left === 1) {
        head.next = curr;
        return prev;
    }

    beforeLeft.next = prev;
    leftSide.next = curr;

    return head;
};

function bellManFord(edges, n, src) {
    const distance = new Array(n + 1).fill(Infinity);

    distance[src] = 0;
    for (let i = 1; i <= n - 1; i++) {
        for (const [u, v, w] of edges) {
            if (distance[u] == Infinity) continue;
            const newWeight = distance[u] + w;
            if (newWeight < distance[v]) {
                distance[v] = newWeight;
            }
        }
    }

    for (const [u, v, w] of edges) {
        if (distance[u] === Infinity) continue;

        const newWeight = distance[u] + w;
        if (newWeight < distance[v]) {
            return 'Negative Cycle';
        }
    }

    return distance;
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
    let slow = head;
    let first = head;
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
    }

    // revese seocd half
    let prev = null;
    let curr = slow.next;
    slow.next = null;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    let second = prev;

    //merge
    while (second) {
        let firstNext = first.next;
        let seocdNext = second.next;

        first.next = second;
        second.next = firstNext;

        first = firstNext;
        second = seocdNext;
    }
};

/**
 * // Definition for a _Node.
 * function _Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {_Node} root
 * @return {_Node}
 */
var connect = function (root) {
    const queue = [root];

    while (queue.length) {
        let prev = null;
        const len = queue.length;
        for (let i = 0; i < len; i++) {
            const node = queue.shift();
            if (prev) {
                prev.next = node;
            }
            prev = node;
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                node.next = node.right;
                queue.push(node.right);
            }
        }
        prev.next = null;
    }
    return root;
};

var connect2 = function (root) {
    if (!queue) {
        return null;
    }

    let curr = head;
    while (curr) {
        let dummy = new ListNode(0);
        let tail = dummy;
        while (curr) {
            if (curr.left) {
                tail.next = curr.left;
                tail = tail.next;
            }
            if (curr.right) {
                tail.next = curr.right;
                tail = tail.next;
            }
            curr = curr.next;
        }

        curr = dummy.next;
    }

    return root;
};

function distra(edges, src, n) {
    const graph = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
        graph[u].push([v, w]);
    }
    const distance = new Array(n).fill(Infinity);
    const visited = new Array(n).fill(false);
    distance[src] = 0;

    for (let i = 0; i < n; i++) {
        let minIndex = -1;
        for (let j = 0; j < n; j++) {
            if (!visited[j] && (minIndex == -1 || distance[minIndex] > distance[j])) {
                minIndex = j;
            }
        }
        if (minIndex == -1 || distance[minIndex] == Infinity) {
            break;
        }

        visited[minIndex] = true;
        for (const [v, w] of graph[minIndex]) {
            let newWeight = distance[minIndex] + w;
            if (newWeight < distance[v]) {
                distance[v] = newWeight;
            }
        }
    }
    return distance;
}

const INF = Infinity;

function floydWarshall(V, graph) {
    // ১. মূল গ্রাফ ম্যাট্রিক্স কপি করে dist ম্যাট্রিক্স তৈরি
    const dist = graph.map((row) => [...row]);

    // ২. ৩টি নেস্টেড লুপ (k লুপ সবসময় সবার বাইরে থাকবে)
    for (let k = 0; k < V; k++) {
        for (let i = 0; i < V; i++) {
            for (let j = 0; j < V; j++) {
                // যদি i -> k এবং k -> j উভয়ের বৈধ পাথ থাকে
                if (dist[i][k] !== INF && dist[k][j] !== INF) {
                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }

    // ৩. নেগেটিভ সাইকেল চেক (কোনো নোডের নিজের দূরত্ব < 0 হলে)
    for (let i = 0; i < V; i++) {
        if (dist[i][i] < 0) {
            console.log('Graph contains a negative weight cycle!');
            return null;
        }
    }

    return dist;
}

// --- উদাহরণ ও টেস্ট কেস ---
// ৪টি নোড বিশিষ্ট গ্রাফ (0, 1, 2, 3)
const V = 4;
const graph = [
    [0, 3, INF, 5],
    [2, 0, INF, 4],
    [INF, 1, 0, INF],
    [INF, INF, 2, 0],
];

function threeSum(arr, target = 0) {
    arr.sort((a, b) => a - b);

    const result = [];

    for (let i = 0; i < arr.length - 2; i++) {
        // একই প্রথম number আবার হলে skip
        if (i > 0 && arr[i] === arr[i - 1]) {
            continue;
        }

        let left = i + 1;
        let right = arr.length - 1;

        while (left < right) {
            const sum = arr[i] + arr[left] + arr[right];

            if (sum === target) {
                result.push([arr[i], arr[left], arr[right]]);

                left++;
                right--;

                // left side duplicate skip
                while (left < right && arr[left] === arr[left - 1]) {
                    left++;
                }

                // right side duplicate skip
                while (left < right && arr[right] === arr[right + 1]) {
                    right--;
                }
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}

function fourSum(arr, target) {
    const result = [];
    arr.sort((a, b) => a - b);

    for (let i = 0; i < arr.length; i++) {
        if (i > 0 && arr[i] == arr[i - 1]) continue;
        for (let j = i + 1; j < arr.length; j++) {
            // j duplicate skip
            if (j > i + 1 && arr[j] === arr[j - 1]) {
                continue;
            }

            let left = j + 1;
            let right = arr.length - 1;

            while (left < right) {
                const makeSum = arr[i] + arr[j] + arr[left] + arr[right];
                if (makeSum == target) {
                    result.push([i, j, left, right]);
                    left++;
                    right--;

                    while (left < right && arr[left] === arr[left - 1]) left++;
                    while (left < right && arr[right] === arr[left + 1]) right--;
                } else if (makeSum > target) {
                    right--;
                } else {
                    left++;
                }
            }
        }
    }
}

function wordSeach(board, word) {
    let direction = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    const rows = board.length;
    const cols = board[0].length;

    function dfs(r, c, index) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] !== word[index]) {
            return false;
        }

        if (index == word.length - 1) {
            return true;
        }

        for (const [nr, nc] of direction) {
            const mr = nr + r;
            const mc = nc + c;
            if (dfs(mr, mc, index + 1)) {
                return true;
            }
        }
    }
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            if (dfs(row, col, 0)) {
                return true;
            }
        }
    }
}

function topologicalSort(graph, n) {
    const indegree = new Array(n).fill(0);
    const result = [];
    const queue = [];
    for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < graph[i].length; j++) {
            indegree[graph[i][j]]++;
        }
    }

    // push to array which indegree is zero
    for (let i = 0; i < indegree.length; i++) {
        if (indegree[i] == 0) {
            queue.push(i);
        }
    }

    let index = 0;
    while (index < queue.length) {
        const node = queue[index++];
        result.push(node);
        for (const nei of graph[node]) {
            indegree[nei]--;
            if (indegree[nei] == 0) {
                queue.push(nei);
            }
        }
    }
    return result.length == n ? result : [];
}

function topologicalSortDFS(graph, n) {
    const path = [];
    const visited = [];
    function dfs(node) {}
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function (root) {
    let result = [];
    function dfs(node, path) {
        if (!node) {
            return;
        }
        path.push(node.val);
        if (!node.left && !node.right) {
            const path = path.join('');
            result.push(path);
        } else {
            dfs(node.left);
            dfs(node.right);
        }
        path.pop();
    }
    dfs(root);

    return result.reduce((acc, curr) => acc + curr, 0);
};
var sumNumbers = function (root) {
    function dfs(node, currentSum) {
        if (!node) {
            return 0;
        }
        currentSum = currentSum * 10 + node.val;

        if (!node.left && !node.right) return currentSum;

        return dfs(node.left, currentSum) + dfs(node.right, currentSum);
    }
    dfs(root);
};

function bellamnFord(n, edges) {
    const dist = new Array(n).fill(Infinity);

    for (let i = 0; i < n - 1; i++) {
        //relazation step
        for (const [from, to, weight] of edges) {
            if (dist[to] > dist[from] + weight) {
                dist[to] = dist[from] + weight;
            }
        }
    }

    for (const [from, to, weight] of edges) {
        if (dist[to] > dist[from] + weight) {
            console.log('Negative Cycle preset this graph');
            return [];
        }
    }
    return dist;
}
function bellManFordWhileLoop(src, n, edges) {
    const dist = new Array(n).fill(Infinity);
    dist[src] = 0;

    let iterations = n - 1;
    while (iterations > 0) {
        let isUpdate = false;

        for (const [from, to, weight] of edges) {
            // from নোডে এখনও পৌঁছানো না গেলে স্কিপ
            if (dist[from] === Infinity) continue;

            const newWeight = dist[from] + weight;
            if (newWeight < dist[to]) {
                dist[to] = newWeight; // ফিক্স: newDistance -> newWeight
                isUpdate = true;
            }
        }

        // যদি কোনো পরিবর্তন না হয়, আগেভাগেই রিটার্ন
        if (!isUpdate) {
            return dist;
        }

        iterations--;
    }

    // N-তম ধাপে নেগেটিভ সাইকেল চেক
    for (const [from, to, weight] of edges) {
        if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
            console.log('Negative cycle found');
            return [];
        }
    }

    return dist;
}

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
    node.val = node.next.val;
    node.next = node.next.next;
};

var deleteNode = function (node) {
    node.val = node.next.val;
    node.next = node.next.next;
};

function floyedWarrsal(edges, n) {
    const dis = Array({ length: n }, () => new Array().fill(Infinity));
    for (let i = 0; i < edges.length; i++) {
        dis[i][i] = 0;
    }
}

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
var findTheCity = function (n, edges, distanceThreshold) {
    // ধাপ ১: n x n দূরত্বের ম্যাট্রিক্স তৈরি ও ইনিশিয়ালাইজেশন
    const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));

    // নিজের থেকে নিজের দূরত্ব ০
    for (let i = 0; i < n; i++) {
        dist[i][i] = 0;
    }

    // গ্রাফের দ্বিমুখী এজগুলো ম্যাট্রিক্সে বসানো
    for (const [u, v, w] of edges) {
        dist[u][v] = w;
        dist[v][u] = w; // Undirected Graph
    }

    // ধাপ ২: Floyd-Warshall অ্যালগরিদম (All-Pairs Shortest Path)
    for (let k = 0; k < n; k++) {
        // মধ্যবর্তী নোড (Intermediate Node)
        for (let i = 0; i < n; i++) {
            // সোর্স নোড (Source)
            for (let j = 0; j < n; j++) {
                // ডেস্টিনেশন নোড (Destination)
                if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }

    // ধাপ ৩: প্রতি শহরের জন্য থ্রেশহোল্ডের ভেতরের প্রতিবেশী গণনা
    let minReachableCities = Infinity;
    let resultCity = -1;

    for (let i = 0; i < n; i++) {
        let count = 0;

        for (let j = 0; j < n; j++) {
            // অন্য কোনো শহরে যদি distanceThreshold-এর ভেতর পৌঁছানো যায়
            if (i !== j && dist[i][j] <= distanceThreshold) {
                count++;
            }
        }

        // কম প্রতিবেশী পাওয়া গেলে অথবা টাই হলে বড় ইনডেক্স বেছে নেওয়া (<= শর্তের কারণে)
        if (count <= minReachableCities) {
            minReachableCities = count;
            resultCity = i; // টাই হলে স্বয়ংক্রিয়ভাবে বড় ইনডেক্স ওভাররাইট হবে
        }
    }

    return resultCity;
};

function tsum(arr, target) {
    arr.sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (i > 0 && arr[i] == arr[i - 1]) continue;
        let left = i + 1;
        let right = arr.length - 1;

        while (left < right) {
            let sum = arr[i] + arr[left] + arr[right];
            if (sum === target) {
                result.push([i.left, right]);
                left++;
                right--;
                while (left < right && arr[left] == arr[left - 1]) continue;
                while (left < right && arr[right] == arr[right + 1]) continue;
            } else if (sum > target) {
                right--;
            } else {
                left++;
            }
        }
    }
    return result;
}

function coinChangeWithGreedy(coins = [], amount) {
    coins.sort((a, b) => b - a);
    const result = [];
    let notes,
        i = 0;
    while (amount > 0) {
        let notes = Math.floor(amount / coins[i]);
        while (notes--) {
            result.push(coins[i]);
            amount -= coins[i];
        }

        i++;
    }

    return result;
}

var shortestPathBinaryMatrix = function (grid) {
    const n = grid.length;

    // Start বা destination blocked
    if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) {
        return -1;
    }

    const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];

    let index = 0;

    const queue = [[0, 0]];

    // visited + distance
    grid[0][0] = 1;

    while (index < queue.length) {
        const [r, c] = queue[index++];

        // Destination
        if (r === n - 1 && c === n - 1) {
            return grid[r][c];
        }

        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;

            // বাইরে গেলে skip
            if (nr < 0 || nr >= n || nc < 0 || nc >= n || grid[nr][nc] !== 0) {
                continue;
            }

            // distance + visited
            grid[nr][nc] = grid[r][c] + 1;

            queue.push([nr, nc]);
        }
    }

    return -1;
};

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
var findTheCity = function (n, edges, distanceThreshold) {
    // ধাপ ১: Adjacency List তৈরি
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
        adj[u].push([v, w]);
        adj[v].push([u, w]); // দ্বিমুখী গ্রাফ
    }

    // ধাপ ২: সিঙ্গেল সোর্স Dijkstra ফাংশন (Min-PriorityQueue ব্যবহার করে)
    function dijkstra(src) {
        // LeetCode-এ বিল্ট-ইন MinPriorityQueue সাপোর্ট করে
        const pq = new MinPriorityQueue((item) => item.dist);
        const dist = new Array(n).fill(Infinity);

        dist[src] = 0;
        pq.enqueue({ node: src, dist: 0 });

        while (!pq.isEmpty()) {
            const { node: u, dist: d } = pq.dequeue();

            // যদি বর্তমান দূরত্ব রেকর্ড করা দূরত্বের চেয়ে বড় হয়, স্কিপ
            if (d > dist[u]) continue;

            for (const [v, weight] of adj[u]) {
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.enqueue({ node: v, dist: dist[v] });
                }
            }
        }

        // distanceThreshold-এর ভেতর থাকা প্রতিবেশীর সংখ্যা গণনা
        let count = 0;
        for (let i = 0; i < n; i++) {
            if (i !== src && dist[i] <= distanceThreshold) {
                count++;
            }
        }
        return count;
    }

    // ধাপ ৩: প্রতি নোড থেকে Dijkstra চালিয়ে ফলাফল বের করা
    let minReachableCities = Infinity;
    let resultCity = -1;

    for (let i = 0; i < n; i++) {
        const reachableCount = dijkstra(i);

        // কম প্রতিবেশী পেলে বা টাই হলে বড় ইনডেক্স রাখা (<= শর্তের কারণে)
        if (reachableCount <= minReachableCities) {
            minReachableCities = reachableCount;
            resultCity = i;
        }
    }

    return resultCity;
};
function knight(n, start, end) {
    const dist = Array.from({ length: n }, () => new Array(n).fill(-1));

    const queue = [[start[0], start[1]]];

    const directions = [
        [-2, 1],
        [-2, -1],
        [2, -1],
        [2, 1],
        [-1, -2],
        [1, -2],
        [1, 2],
        [-1, 2],
    ];

    let index = 0;

    dist[start[0]][start[1]] = 0;

    while (index < queue.length) {
        const [r, c] = queue[index++];

        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;

            if (nr < 0 || nr >= n || nc < 0 || nc >= n || dist[nr][nc] !== -1) {
                continue;
            }

            dist[nr][nc] = dist[r][c] + 1;

            if (nr === end[0] && nc === end[1]) {
                return dist[nr][nc];
            }

            queue.push([nr, nc]);
        }
    }

    return -1;
}

function findWeatherPaht(n, edges, source, destination) {
    const graph = Array.from({ length: n }, () => []);

    for (cosnt[(from, to)] of edges) {
        graph[from].push(to);
    }

    const queue = [source];
    const visited = new Array(n).fill(false);

    let index = 0;
    visited[source] = true;
    while (index < queue.length) {
        const node = queue[index++];
        if (node == destination) {
            return true;
        }

        for (const nei of graph[node]) {
            if (!visited[nei]) {
                visited[nei] = true;
                queue.push(nei);
            }
        }
    }
    return false;
}

function findWeatherPahtDFS(n, edges, source, destination) {
    const graph = Array.from({ length: n }, () => []);

    for (const [from, to] of edges) {
        graph[from].push(to);
        graph[to].push(from);
    }
    const visited = new Array(n).fill(false);
    function dfs(node) {
        if (node === destination) return true;
        visited[node] = true;

        for (const nei of graph[node]) {
            if (!visited[nei]) {
                if (dfs(nei)) {
                    return true;
                }
            }
        }
        return false;
    }

    return dfs(source);
}
