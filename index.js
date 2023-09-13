class Stack {
    constructor() {
        this.items = [];
    }
  
    push(item) {
        this.items.push(item);
    }
  
    pop() {
        if (!this.isEmpty()) {
            return this.items.pop();
        }
    }
  
    peek() {
        if (!this.isEmpty()) {
            return this.items[this.items.length - 1];
        }
    }
}

class Queue {
    constructor() {
        this.items = [];
    }
  
    enqueue(item) {
        this.items.push(item);
    }
  
    dequeue() {
        if (!this.isEmpty()) {
            return this.items.shift();
        }
    }
  
    peek() {
        if (!this.isEmpty()) {
            return this.items[0];
        }
    }
}  

class TreeNode {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
}
  
class BinaryTree {
    constructor() {
        this.root = null;
    }
  
    insert(data) {
        const newNode = new TreeNode(data);
  
        if (!this.root) {
            this.root = newNode;
        } else {
            this._insertNode(this.root, newNode);
        }
    }
  
    _insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (!node.left) {
            node.left = newNode;
            } else {
            this._insertNode(node.left, newNode);
            }
      } else {
            if (!node.right) {
            node.right = newNode;
            } else {
            this._insertNode(node.right, newNode);
            }
        }
    }
  
    search(data) {
        return this._searchNode(this.root, data);
    }
  
    _searchNode(node, data) {
        if (!node) {
            return null;
        }
  
        if (data === node.data) {
             return node;
        } else if (data < node.data) {
            return this._searchNode(node.left, data);
        } else {
            return this._searchNode(node.right, data);
        }
    }
  
    inOrderTraversal(node = this.root) {
        if (!node) return [];
        return [
            ...this.inOrderTraversal(node.left),
            node.data,
            ...this.inOrderTraversal(node.right),
        ];
    }
  
    preOrderTraversal(node = this.root) {
        if (!node) return [];
        return [node.data, ...this.preOrderTraversal(node.left), ...this.preOrderTraversal(node.right)];
    }
  
    postOrderTraversal(node = this.root) {
        if (!node) return [];
        return [...this.postOrderTraversal(node.left), ...this.postOrderTraversal(node.right), node.data];
        }
  }

class Graph {
    constructor() {
        this.vertices = new Map();
  }

    addVertex(vertex) {
        if (!this.vertices.has(vertex)) {
        this.vertices.set(vertex, []);
        }
  }

    addEdge(vertex1, vertex2) {
        if (this.vertices.has(vertex1) && this.vertices.has(vertex2)) {
        this.vertices.get(vertex1).push(vertex2);
        this.vertices.get(vertex2).push(vertex1);
        }
    }

    depthFirstSearch(startVertex, visited = new Set()) {
        if (!this.vertices.has(startVertex)) return [];
        visited.add(startVertex);
        const neighbors = this.vertices.get(startVertex);

        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
            this.depthFirstSearch(neighbor, visited);
            }
        }

        return [...visited];
    }

    breadthFirstSearch(startVertex) {
        if (!this.vertices.has(startVertex)) return [];
        const visited = new Set();
        const queue = [startVertex];
        visited.add(startVertex);

        while (queue.length > 0) {
        const currentVertex = queue.shift();
        const neighbors = this.vertices.get(currentVertex);

        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
                }
            }
        }

        return [...visited];
    }

    dijkstra(startVertex, endVertex) {
        const distances = new Map();
        const previousVertices = new Map();
        const priorityQueue = new PriorityQueue();
  
        this.vertices.forEach((vertex) => {
            distances.set(vertex, Infinity);
            previousVertices.set(vertex, null);
        });
  
        distances.set(startVertex, 0);
        priorityQueue.enqueue(startVertex, 0);
  
        while (!priorityQueue.isEmpty()) {
            const currentVertex = priorityQueue.dequeue();
  
            if (currentVertex === endVertex) {
                return this.reconstructPath(previousVertices, endVertex);
                }
  
        const neighbors = this.vertices.get(currentVertex);
  
        for (const neighbor of neighbors) {
            const distance = distances.get(currentVertex) + neighbor.weight;
  
            if (distance < distances.get(neighbor.vertex)) {
            distances.set(neighbor.vertex, distance);
            previousVertices.set(neighbor.vertex, currentVertex);
            priorityQueue.enqueue(neighbor.vertex, distance);
            }
            
        }
        }   
        return null;
    }

    reconstructPath(previousVertices, endVertex) {
        const path = [];
        let currentVertex = endVertex;
  
        while (currentVertex !== null) {
            path.unshift(currentVertex);
            currentVertex = previousVertices.get(currentVertex);
        }
  
        return path;
    }
}

class PriorityQueue {
    constructor() {
        this.elements = [];
    }
  
    enqueue(element, priority) {
        this.elements.push({ element, priority });
        this.sort();
    }
  
    dequeue() {
        if (this.isEmpty()) return null;
        return this.elements.shift().element;
    }
  
    isEmpty() {
        return this.elements.length === 0;
    }
  
    sort() {
        this.elements.sort((a, b) => a.priority - b.priority);
    }
}

class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
  
class LinkedList {
    constructor() {
    this.head = null;
}
  
    insert(data) {
    const newNode = new ListNode(data);
    if (!this.head) {
        this.head = newNode;
    } else {
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
    current.next = newNode;
    }
    }
    delete(data) {
    if (!this.head) return;
  
    if (this.head.data === data) {
        this.head = this.head.next;
        return;
    }
  
    let current = this.head;
    while (current.next) {
        if (current.next.data === data) {
            current.next = current.next.next;
            return;
        }
        current = current.next;
    }
    }
  
    search(data) {
        let current = this.head;
        while (current) {
        if (current.data === data) {
            return current;
        }
        current = current.next;
        }
        return null;
    }
}

class MinMaxStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
        this.maxStack = [];
    }
  
    push(item) {
        this.stack.push(item);
  
        if (this.minStack.length === 0 || item <= this.getMin()) {
            this.minStack.push(item);
        }
  
        if (this.maxStack.length === 0 || item >= this.getMax()) {
            this.maxStack.push(item);
        }
    }
  
    pop() {
        if (this.stack.length === 0) return;
  
        const item = this.stack.pop();
  
        if (item === this.getMin()) {
            this.minStack.pop();
        }
  
        if (item === this.getMax()) {
            this.maxStack.pop();
        }
    }
  
    getMin() {
        if (this.minStack.length === 0) return null;
        return this.minStack[this.minStack.length - 1];
    }
  
    getMax() {
        if (this.maxStack.length === 0) return null;
        return this.maxStack[this.maxStack.length - 1];
        }
}

function isBST(root, min = -Infinity, max = Infinity) {
    if (!root) return true;
  
    if (root.data <= min || root.data >= max) {
        return false;
    }
  
    return (
        isBST(root.left, min, root.data) && isBST(root.right, root.data, max)
    );
}

  function hasCycle(head) {
    let slow = head;
    let fast = head;
  
    while (fast !== null && fast.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
  
      if (slow === fast) {
        return true; 
      }
    }
  
    return false; 
  }

//min/max stack examp
const minMaxStack = new MinMaxStack();
minMaxStack.push(5);
minMaxStack.push(2);
minMaxStack.push(7);
console.log("Min:", minMaxStack.getMin()); // Result: Min: 2
console.log("Max:", minMaxStack.getMax()); // Result: Max: 7
minMaxStack.pop();
console.log("Min:", minMaxStack.getMin()); // Result: Min: 2
console.log("Max:", minMaxStack.getMax()); // Result: Max: 5
//binary Tree examp
const binaryTree = new BinaryTree();
binaryTree.insert(5);
binaryTree.insert(3);
binaryTree.insert(7);
console.log("Is BST?", isBST(binaryTree.root)); // Result: Is BST? true

binaryTree.root.left.data = 8;
console.log("Is BST?", isBST(binaryTree.root)); // Result: Is BST? false

//Graph alghorithms examp
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addEdge('A', 'B', 2);
graph.addEdge('B', 'C', 1);
graph.addEdge('A', 'C', 4);

const shortestPath = graph.dijkstra('A', 'C');
console.log("Shortest Path:", shortestPath);

//Linked list examp
const list = new LinkedList();
list.insert(1);
list.insert(2);
list.insert(3);

console.log("Has Cycle?", hasCycle(list.head)); // Result: Has Cycle? false

list.head.next.next.next = list.head;

console.log("Has Cycle?", hasCycle(list.head)); // Result: Has Cycle? true