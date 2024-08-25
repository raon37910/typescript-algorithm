import { SinglyLinkedList } from '../list/singly_linked_list'

export class LinkedListStack<T> {
  private list: SinglyLinkedList<T>
  private limit: number

  constructor(limit: number = Number.MAX_VALUE) {
    this.list = new SinglyLinkedList<T>()
    this.limit = limit
  }

  top(): T | null {
    if (this.list.isEmpty()) {
      return null
    }

    return this.list.get(0)!
  }

  push(data: T): void {
    if (this.list.getLength() + 1 > this.limit) {
      throw new Error('Stack overflow')
    }

    this.list.push(data)
  }

  pop(): T {
    if (this.list.isEmpty()) {
      throw new Error('Stack underflow')
    }

    return this.list.pop()
  }

  length(): number {
    return this.list.getLength()
  }

  /**
   * Gets whether the stack is empty or not.
   *
   * @returns Whether the stack is empty or not.
   */
  isEmpty(): boolean {
    return this.list.isEmpty()
  }
}
