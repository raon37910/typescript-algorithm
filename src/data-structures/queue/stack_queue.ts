import { Stack } from '../stack/stack'
import { Queue } from './queue'

export class StackQueue<T> implements Queue<T> {
  private enqueueStack: Stack<T> = new Stack<T>()
  private dequeueStack: Stack<T> = new Stack<T>()

  length(): number {
    return this.enqueueStack.length() + this.dequeueStack.length()
  }

  isEmpty(): boolean {
    return this.enqueueStack.isEmpty() && this.dequeueStack.isEmpty()
  }

  enqueue(item: T): void {
    this.enqueueStack.push(item)
  }

  private shift(): void {
    while (!this.enqueueStack.isEmpty()) {
      const enqueueStackTop = this.enqueueStack.pop()
      this.dequeueStack.push(enqueueStackTop)
    }
  }

  dequeue(): T {
    if (this.isEmpty()) {
      throw new Error('Queue Underflow')
    }

    if (this.dequeueStack.isEmpty()) {
      this.shift()
    }

    return this.dequeueStack.pop()
  }

  peek(): T | null {
    if (this.isEmpty()) {
      return null
    }

    if (this.dequeueStack.isEmpty()) {
      this.shift()
    }

    return this.dequeueStack.top()
  }
}
