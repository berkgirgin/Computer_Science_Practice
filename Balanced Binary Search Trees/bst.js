// import "./index.css";

import { mergeSort } from "./merge_sort.js";
export { Node, Tree };

class Node {
  constructor(data, leftNode, rightNode) {
    this.data = data;
    this.leftNode = leftNode;
    this.rightNode = rightNode;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(inputArray) {
    const sortedInputArray = this.sortAndRemoveDuplicates(inputArray);

    if (sortedInputArray.length < 1 || sortedInputArray == null) return null;

    const midElementIndex = Math.floor(sortedInputArray.length / 2);
    const midElement = sortedInputArray[midElementIndex];
    const leftArray = sortedInputArray.slice(0, midElementIndex);
    const rightArray = sortedInputArray.slice(midElementIndex + 1);

    const node = new Node(
      midElement,
      this.buildTree(leftArray),
      this.buildTree(rightArray)
    );

    return node;
  }

  howManyChildren(node) {
    if (node.leftNode !== null && node.rightNode !== null) {
      return 2;
    } else if (node.leftNode !== null || node.rightNode !== null) {
      return 1;
    } else if (node.leftNode === null && node.rightNode === null) {
      return 0;
    }
  }

  findNode(value, node = this.root) {
    // base case
    if (node === null) {
      console.log(`the value ${value} does not exist`);
      return node;
    }

    if (node.data === value) {
      return node;
    }

    if (value > node.data) {
      return this.findNode(value, node.rightNode);
    } else if (value < node.data) {
      return this.findNode(value, node.leftNode);
    }
  }

  findParentNode(nodeToFind, currentNode = this.root, parentNode = null) {
    if (nodeToFind === null) {
      console.log("you entered null for the nodeToFind");
      return null;
    }

    if (currentNode === null) {
      console.log("your node does not exist, therefore no parent node exists");
      return null;
    }

    if (currentNode === nodeToFind) {
      return parentNode;
    }

    if (nodeToFind.data < currentNode.data) {
      return this.findParentNode(nodeToFind, currentNode.leftNode, currentNode);
    } else {
      return this.findParentNode(
        nodeToFind,
        currentNode.rightNode,
        currentNode
      );
    }
  }

  deleteNode(value) {
    // Three possibilites:
    // - delete leaf node
    // - delete node with one child
    // - delete node with two children

    const nodeToDelete = this.findNode(value);

    if (nodeToDelete === null) {
      console.log("Given node to delete does not exist");
      return;
    }

    const numberOfChildren = this.howManyChildren(nodeToDelete);
    const parentNode = this.findParentNode(nodeToDelete);

    switch (numberOfChildren) {
      // - delete leaf node
      case 0:
        if (parentNode === null) {
          this.root = null;
        } else {
          if (nodeToDelete.data < parentNode.data) {
            parentNode.leftNode = null;
          } else if (nodeToDelete.data > parentNode.data) {
            parentNode.rightNode = null;
          }
        }
        break;

      // - delete node with one child
      case 1:
        let childNode;
        if (nodeToDelete.rightNode === null) {
          childNode = nodeToDelete.leftNode;
        } else {
          childNode = nodeToDelete.rightNode;
        }

        if (parentNode === null) {
          this.root = childNode;
        } else if (nodeToDelete.data > parentNode.data) {
          parentNode.rightNode = childNode;
        } else if (nodeToDelete.data < parentNode.data) {
          parentNode.leftNode = childNode;
        }

        break;

      // - delete node with two children
      case 2:
        const firstLevelRightChild = nodeToDelete.rightNode;
        const mostLeftChild = getMostLeftChild(firstLevelRightChild);
        const parentOfMostLeftChild = this.findParentNode(mostLeftChild);

        function getMostLeftChild(node) {
          console.log("inside getMostLeftChild, input node: " + node.data);
          if (node.leftNode === null) {
            return node;
          }

          return getMostLeftChild(node.leftNode);
        }

        const valueOfMostLeftChild = mostLeftChild.data;

        nodeToDelete.data = valueOfMostLeftChild;
        mostLeftChild.data = valueOfMostLeftChild;

        // delete the most left child

        if (nodeToDelete === parentOfMostLeftChild) {
          nodeToDelete.rightNode = null;
        } else {
          parentOfMostLeftChild.leftNode = null;
        }
        break;
    }
  }

  insertNode(value) {
    this.root = insertNodeRecursive(this.root);

    function insertNodeRecursive(node) {
      if (node === null) {
        const newNode = new Node(value, null, null);
        return newNode;
      }

      // console.log(node);

      if (node.data === value) {
        console.log(`${value} already exists, can't add`);
        return node;
      } else if (node.data > value) {
        node.leftNode = insertNodeRecursive(node.leftNode);
      } else if (node.data < value) {
        node.rightNode = insertNodeRecursive(node.rightNode);
      }

      return node;
    }
  }

  sortAndRemoveDuplicates(arr) {
    const sortedArray = mergeSort(arr);

    const arrayWithoutDuplicates = [];

    for (let element of sortedArray) {
      if (!arrayWithoutDuplicates.includes(element)) {
        arrayWithoutDuplicates.push(element);
      }
    }

    return arrayWithoutDuplicates;
  }

  // breadth first
  //

  levelOrder(func, queueArray = [this.root]) {
    if (queueArray[0] === null || queueArray.length === 0) {
      return;
    }

    func(queueArray[0]);

    if (queueArray[0].leftNode !== null) {
      queueArray.push(queueArray[0].leftNode);
    }
    if (queueArray[0].rightNode !== null) {
      queueArray.push(queueArray[0].rightNode);
    }

    queueArray.shift();

    return this.levelOrder(func, queueArray);
  }

  // level first
  //
  // root left right
  preOrder(func, node = this.root) {
    if (node === null) {
      return;
    }

    func(node);
    this.preOrder(func, node.leftNode);
    this.preOrder(func, node.rightNode);
  }
  // left root right
  inOrder(func, node = this.root) {
    if (node === null) {
      return;
    }
    this.inOrder(func, node.leftNode);
    func(node);
    this.inOrder(func, node.rightNode);
  }
  // left right root
  postOrder(func, node = this.root) {
    if (node === null) {
      return;
    }
    this.postOrder(func, node.leftNode);
    this.postOrder(func, node.rightNode);
    func(node);
  }

  // Height is defined as the number of edges in longest path from a given node to a leaf node.
  getHeight(node) {
    if (node === null) {
      return 0;
    }

    let rightHeight = this.getHeight(node.rightNode);
    let leftHeight = this.getHeight(node.leftNode);

    if (leftHeight > rightHeight) {
      return leftHeight + 1;
    } else {
      return rightHeight + 1;
    }
  }

  // Depth is defined as the number of edges in path from a given node to the tree’s root node.
  getDepth(node, currentNode = this.root, depth = 0) {
    if (currentNode === node) {
      return depth;
    }

    if (currentNode.data > node.data) {
      return this.getDepth(node, currentNode.leftNode, depth + 1);
    } else {
      return this.getDepth(node, currentNode.rightNode, depth + 1);
    }
  }

  isBalanced() {
    let rightSideHeight = this.getHeight(this.root.rightNode);
    let leftSideHeight = this.getHeight(this.root.leftNode);
    const difference = Math.abs(rightSideHeight - leftSideHeight);

    return difference === 0 || difference === 1 ? true : false;
  }

  reBalance() {
    const arrayOfNodesData = [];

    // this actually returns a sorted array, as unbalanced is still BST
    this.inOrder((node) => {
      arrayOfNodesData.push(node.data);
    });

    this.root = this.buildTree(arrayOfNodesData);
  }

  // taken from the Odin Project suggestion
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.rightNode !== null) {
      this.prettyPrint(
        node.rightNode,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftNode !== null) {
      this.prettyPrint(
        node.leftNode,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  }
}

// **
// **
// **
// **
// **
// **
