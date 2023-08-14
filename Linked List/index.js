import { LinkedList, LinkedListNode } from "./linked_list.js";

const myLinkedList = new LinkedList();
myLinkedList.appendAtHead(20);
myLinkedList.appendAtHead(10);
myLinkedList.appendAtEnd(44);

console.log(myLinkedList);

myLinkedList.removeAtHead();
console.log(myLinkedList);
