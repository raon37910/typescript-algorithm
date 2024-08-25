export class Stack<T> {
  private stack: T[] = []
  private limit: number

  constructor(limit: number = Number.MAX_VALUE) {
    this.limit = limit
  }

  push(value: T) {
    if (this.length() + 1 > this.limit) {
      throw new Error('Stack Overflow')
    }

    this.stack.push(value)
  }

  pop(): T {
    if (this.length() !== 0) {
      return this.stack.pop()
    }

    throw new Error('Stack Underflow')
  }

  top(): T | null {
    if (this.isEmpty() === false) {
      return this.stack[this.length() - 1]
    }

    return null
  }

  length(): number {
    return this.stack.length
  }

  isEmpty(): boolean {
    return this.stack.length === 0
  }
}
