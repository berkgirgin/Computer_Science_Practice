import { LinkedList, LinkedListNode } from "./linked_list.js";

describe("#insertHead", () => {
  test("adding a Node at the beginning of the Linked List", () => {
    //test code comes here
    const linkedList = new LinkedList();
    linkedList.appendAtHead(10);
    // const oldHead = linkedList.head.value; //10
    linkedList.appendAtHead(20);

    expect(linkedList.head.value).toBe(20);
    // expect(oldHead.value).toBe(10);
    expect(linkedList.length).toBe(2);
  });
});
