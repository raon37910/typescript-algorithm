import { Queue } from './queue'

type Node<T> = {
  value: T
  next?: Node<T>
}

export class LinkedQueue<T> implements Queue<T> {
  public size: number
  public head?: Node<T>
  private tail?: Node<T>

  constructor() {
    this.head = this.tail = undefined
    this.size = 0
  }

  enqueue(item: T): void {
    const node = { value: item } as Node<T>
    this.size++

    if (!this.tail) {
      this.tail = this.head = node
      return
    }
    this.tail.next = node
    this.tail = node
  }

  dequeue(): T | undefined {
    if (!this.head) {
      throw new Error('Queue Underflow')
    }

    this.size--
    const head = this.head
    this.head = this.head.next
    return head.value
  }

  peek(): T | undefined | null {
    if (this.isEmpty()) {
      return null
    }
    return this.head?.value
  }

  isEmpty(): boolean {
    return this.size === 0
  }

  length(): number {
    return this.size
  }
}
