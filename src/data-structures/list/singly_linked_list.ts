import { LinkedList } from './linked_list'

class ListNode<T> {
  constructor(public data: T, public next?: ListNode<T>) {}
}

export class SinglyLinkedList<T> implements LinkedList<T> {
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

  get(index: number): T | null {
    if (index < 0 || index >= this.length) {
      return null
    }

    let currentNode = this.head
    let currentIndex = 0

    while (currentIndex < index) {
      if (currentNode == null) {
        return null
      }

      currentNode = currentNode.next
      currentIndex++
    }

    return currentNode.data
  }

  /**
   * 데이터를 head 방향으로 삽입한다.
   * @param data 삽입할 데이터
   */
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
    this.head = newNode
    this.length++
  }

  /**
   * 첫 번째 원소 제거
   */
  pop(): T {
    // 비어 있다면 null을 반환한다.
    if (this.isEmpty()) {
      throw new Error('Index out of bounds')
    }

    const deleteNode = this.head
    this.head = this.head.next
    this.length--

    return deleteNode.data
  }

  /**
   * 원소를 꼬리 부분에 넣는다.
   * @param data 삽입할 데이터
   */
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
    this.tail = newNode
    this.length++
  }

  /**
   * tail에 있는 데이터를 제거한다.
   * @returns
   */
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

    // currentNode를 tail바로 전 노드로 이동한다.
    let currentNode = this.head
    while (currentNode.next !== this.tail) {
      currentNode = currentNode.next
    }

    const returnValue = currentNode.next.data
    currentNode.next = null
    this.tail = currentNode
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

    newNode.next = currentNode.next
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
    currentNode.next = currentNode.next.next
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
