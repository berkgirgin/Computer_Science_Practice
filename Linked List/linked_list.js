import "../styles/index.css";

export { LinkedList, LinkedListNode };

// Building a Linked List

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  getNodeByIndex(index) {
    if (index < 0 || index >= this.length) return null;

    let currentNode = this.head;

    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  appendAtHead(value) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    this.length++;
  }

  removeAtIndex(index) {
    if (this.length <= 0 || index >= this.length) return;

    if (index === 0) {
      this.head = this.head.next;
    }

    const nodeBeforeIndexedNode = this.getNodeByIndex(index - 1);

    if (nodeBeforeIndexedNode == null) return null;
    nodeBeforeIndexedNode.next = nodeBeforeIndexedNode.next.next;
    this.length--;
  }

  appendAtEnd(value) {
    const lastNode = this.getNodeByIndex(this.length - 1);
    const newNode = new LinkedListNode(value, null);

    lastNode.setNext(newNode);
    this.length++;
  }
}

class LinkedListNode {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }

  setNext(_next) {
    this.next = _next;
  }
}
