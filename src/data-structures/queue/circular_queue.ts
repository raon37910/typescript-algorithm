export class CircularQueue<T> {
  private queue: T[]
  private frontIndex: number
  private rearIndex: number
  private size: number

  constructor(size: number) {
    this.queue = new Array(size)
    this.frontIndex = -1
    this.rearIndex = -1
    this.size = size
  }

  enqueue(item: T): void {
    if (
      (this.frontIndex == 0 && this.rearIndex == this.size - 1) ||
      this.rearIndex == (this.frontIndex - 1) % (this.size - 1)
    ) {
      throw new Error('Queue is full')
    } else if (this.frontIndex == -1) {
      this.frontIndex = 0
      this.rearIndex = 0
      this.queue[this.rearIndex] = item
    } else if (this.rearIndex == this.size - 1 && this.frontIndex != 0) {
      this.rearIndex = 0
      this.queue[this.rearIndex] = item
    } else {
      this.rearIndex++
      this.queue[this.rearIndex] = item
    }
  }

  dequeue(): T | undefined {
    if (this.frontIndex == -1) {
      throw new Error('Queue is empty')
    }

    const item = this.queue[this.frontIndex]
    if (this.frontIndex == this.rearIndex) {
      this.frontIndex = -1
      this.rearIndex = -1
    } else if (this.frontIndex == this.size - 1) {
      this.frontIndex = 0
    } else {
      this.frontIndex++
    }

    return item
  }

  peek(): T | null | undefined {
    if (this.frontIndex == -1) {
      return null
    }

    return this.queue[this.frontIndex]
  }

  isEmpty(): boolean {
    return this.frontIndex == -1
  }

  length(): number {
    if (this.frontIndex == -1) {
      return 0
    }

    if (this.rearIndex >= this.frontIndex) {
      return this.rearIndex - this.frontIndex + 1
    }

    return this.size - (this.frontIndex - this.rearIndex - 1)
  }
}
