import { Node, Tree } from "./bst.js";

function getRandomNumber() {
  // gives you a random number between 1 and 30
  let min = 1;
  let max = 30;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getArrayOfNumbers() {
  const minNumber = 1;
  const maxNumber = getRandomNumber();
  const resultArray = [];

  for (let i = minNumber; i <= maxNumber; i++) {
    resultArray.push(i);
  }

  return resultArray;
}

const consoleLogTheElements = (node) => {
  console.log(node.data);
};

console.log(
  "Creating a tree... First number is 1. Last number is random between 1 to 30"
);
const tree = new Tree(getArrayOfNumbers());
tree.prettyPrint(tree.root);

console.log("***");
console.log("***");

console.log("Checking if the tree is balanced");
console.log("Is the tree balanced: " + tree.isBalanced());

console.log("***");
console.log("***");

console.log("Printing out all elements in level, pre, post, and in order");

console.log("***");

console.log("Level order");
tree.levelOrder(consoleLogTheElements);

console.log("***");

console.log("Pre order");
tree.preOrder(consoleLogTheElements);

console.log("***");

console.log("Post order");
tree.postOrder(consoleLogTheElements);

console.log("***");

console.log("In order");
tree.inOrder(consoleLogTheElements);

console.log("***");

console.log("Unbalancing the tree by adding several numbers > 30.");
console.log("adding 40");
tree.insertNode(40);

console.log("adding 50");
tree.insertNode(50);

console.log("adding 60");
tree.insertNode(60);

console.log("adding 70");
tree.insertNode(70);

console.log("***");

console.log("Checking if the tree is balanced");
console.log("Is the tree balanced: " + tree.isBalanced());

console.log("***");

console.log("Rebalancing the tree");
tree.reBalance();

console.log("***");

console.log("Checking if the tree is balanced");
console.log("Is the tree balanced: " + tree.isBalanced());

console.log("***");

console.log("Printing out the rebalanced tree");
tree.prettyPrint(tree.root);

console.log("***");
console.log("Thank you for coming this far!");
