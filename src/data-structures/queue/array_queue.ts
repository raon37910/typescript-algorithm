import { Queue } from './queue'

export class ArrayQueue<T> implements Queue<T> {
  private queue: T[] = []

  length(): number {
    return this.queue.length
  }

  isEmpty(): boolean {
    return this.queue.length === 0
  }

  enqueue(item: T): void {
    this.queue.push(item)
  }

  dequeue(): T {
    if (this.isEmpty()) {
      throw new Error('Queue Underflow')
    }

    return this.queue.shift() as T
  }

  peek(): T | null {
    if (this.isEmpty()) {
      return null
    }

    return this.queue[0]
  }
}
