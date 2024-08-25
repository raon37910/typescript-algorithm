import { LinkedList } from './linked_list'

class ListNode<T> {
  constructor(
    public data: T,
    public prev?: ListNode<T>,
    public next?: ListNode<T>
  ) {}
}

export class DoublyLinkedList<T> implements LinkedList<T> {
  private head?: ListNode<T>
  private tail?: ListNode<T>
  private length: number

  constructor() {
    this.head = undefined
    this.tail = undefined
    this.length = 0
  }

  isEmpty(): boolean {
    return this.length === 0
  }

  get(index: number): T {
    if (index < 0 || index >= this.length) {
      return null
    }

    let currentNode = this.head
    let currentIndex = 0

    while (currentIndex < index) {
      currentNode = currentNode.next
      currentIndex++
    }

    return currentNode.data
  }

  push(data: T): void {
    const newNode = new ListNode(data)
    // 첫 원소일 경우
    if (this.isEmpty()) {
      this.head = newNode
      this.tail = newNode
      this.length++
      return
    }

    newNode.next = this.head
    this.head.prev = newNode
    this.head = newNode
    this.length++
  }

  pop(): T {
    // 비어 있다면 null을 반환한다.
    if (this.isEmpty()) {
      throw new Error('Index out of bounds')
    }

    if (this.getLength() === 1) {
      const returnValue = this.head.data
      this.head = null
      this.tail = null
      this.length = 0
      return returnValue
    }

    const deleteNode = this.head
    this.head = this.head.next
    this.head.prev = null
    this.length--

    return deleteNode.data
  }

  append(data: T): void {
    const newNode = new ListNode(data)
    // 첫 원소일 경우
    if (this.isEmpty()) {
      this.head = newNode
      this.tail = newNode
      this.length++
      return
    }

    this.tail.next = newNode
    newNode.prev = this.tail
    this.tail = newNode
    this.length++
  }

  removeTail(): T {
    // 비어 있다면 null을 반환한다.
    if (this.isEmpty()) {
      throw new Error('Index out of bounds')
    }

    if (this.getLength() === 1) {
      const returnValue = this.head.data
      this.head = null
      this.tail = null
      this.length = 0
      return returnValue
    }

    const returnValue = this.tail.data
    const prevNode = this.tail.prev
    prevNode.next = null
    this.tail = prevNode
    this.length--
    return returnValue
  }

  insertAt(index: number, data: T): void {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds')
    }

    if (index === 0) {
      this.push(data)
      return
    }

    if (index === this.getLength() - 1) {
      this.append(data)
      return
    }

    const newNode = new ListNode(data)
    let currentNode = this.head
    // currentNode를 삽입하는 위치 하나 전칸으로 이동한다.
    for (let i = 0; i < index - 1; i++) {
      currentNode = currentNode.next
    }

    newNode.prev = currentNode
    newNode.next = currentNode.next
    currentNode.next.prev = newNode
    currentNode.next = newNode
    this.length++
  }

  removeAt(index: number): T {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds')
    }

    if (index === 0) {
      this.pop()
      return
    }

    if (index === this.getLength() - 1) {
      this.removeTail()
      return
    }

    let currentNode = this.head
    // currentNode를 삽입하는 위치 하나 전칸으로 이동한다.
    for (let i = 0; i < index - 1; i++) {
      currentNode = currentNode.next
    }

    const returnValue = currentNode.next.data
    const nextNode = currentNode.next.next
    nextNode.prev = currentNode
    currentNode.next = nextNode
    this.length--
    return returnValue
  }

  clear(): void {
    this.head = null
    this.tail = null
    this.length = 0
  }

  toArray(): T[] {
    const array: T[] = []
    let currentNode: ListNode<T> | undefined = this.head

    while (currentNode) {
      array.push(currentNode.data)
      currentNode = currentNode.next
    }

    return array
  }

  getLength(): number {
    return this.length
  }
}
