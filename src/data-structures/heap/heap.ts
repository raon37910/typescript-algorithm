export abstract class Heap<T> {
  protected heap: T[]
  protected compare: (a: T, b: T) => boolean

  constructor(compare: (a: T, b: T) => boolean) {
    this.heap = []
    this.compare = compare
  }

  private isRightlyPlaced(childIndex: number, parentIndex: number): boolean {
    // compare는 첫 번째 인자가 부모 노드가 되어야 할 경우 참을 반환한다.
    return this.compare(this.heap[parentIndex], this.heap[childIndex])
  }

  /**
   * 최대 힙에서는 큰 값의 인덱스 반환
   * 최소 힙에서는 작은 값의 인덱스를 반환한다.
   */
  private getChildIndexToSwap(
    leftChildIndex: number,
    rightChildIndex: number
  ): number {
    if (rightChildIndex >= this.size()) {
      return leftChildIndex
    }
    return this.compare(this.heap[leftChildIndex], this.heap[rightChildIndex])
      ? leftChildIndex
      : rightChildIndex
  }

  public insert(value: T): void {
    this.heap.push(value)
    this.bubbleUp()
  }

  public extract(): T {
    const element = this.heap[0]
    this.heap[0] = this.heap[this.size() - 1]
    this.heap.pop()
    this.sinkDown()
    return element
  }

  protected bubbleUp(index: number = this.size() - 1): void {
    let parentIndex

    while (index > 0) {
      parentIndex = Math.floor((index - 1) / 2)
      // 만일 부모 노드와 자식 노드가 힙의 관계를 만족하면 멈춘다.
      if (this.isRightlyPlaced(index, parentIndex)) {
        break
      }
      // 아니라면 스왑하고 index를 부모 노드로 옮긴다.
      this.swap(parentIndex, index)
      index = parentIndex
    }
  }

  private sinkDown(): void {
    let index = 0
    let leftChildIndex = this.getLeftChildIndex(index)
    let rightChildIndex = this.getRightChildIndex(index)
    let childIndexToSwap
    // 자식 노드가 하나라도 있다면 자식 노드가 없을 때까지 힙 구조를 맞추면서 내려간다.
    while (this.heap[leftChildIndex] || this.heap[rightChildIndex]) {
      childIndexToSwap = this.getChildIndexToSwap(
        leftChildIndex,
        rightChildIndex
      )
      // 힙 구조가 만족된다면 반복을 멈춘다.
      if (this.isRightlyPlaced(childIndexToSwap, index)) {
        break
      }

      this.swap(childIndexToSwap, index)
      index = childIndexToSwap
      leftChildIndex = this.getLeftChildIndex(index)
      rightChildIndex = this.getRightChildIndex(index)
    }
  }

  private getLeftChildIndex(index: number): number {
    return index * 2 + 1
  }

  private getRightChildIndex(index: number): number {
    return index * 2 + 2
  }

  protected swap(a: number, b: number): void {
    // TODO 이거 무슨 문법이지?
    ;[this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
  }

  public size(): number {
    return this.heap.length
  }

  public isEmpty(): boolean {
    return this.size() === 0
  }

  public check(): void {
    this._check()
  }

  private _check(index: number = 0): void {
    if (!this.heap[index]) return
    const leftChildIndex = this.getLeftChildIndex(index)
    const rightChildIndex = this.getRightChildIndex(index)

    if (
      this.heap[leftChildIndex] &&
      !this.isRightlyPlaced(leftChildIndex, index)
    ) {
      throw new Error('Heap does not adhere to heap invariant')
    }

    if (
      this.heap[rightChildIndex] &&
      !this.isRightlyPlaced(rightChildIndex, index)
    ) {
      throw new Error('Heap does not adhere to heap invariant')
    }

    this._check(leftChildIndex)
    this._check(rightChildIndex)
  }
}

export class MinHeap<T> extends Heap<T> {
  constructor(compare: (a: T, b: T) => boolean = (a: T, b: T) => a < b) {
    super(compare)
  }
}

export class MaxHeap<T> extends Heap<T> {
  constructor(compare: (a: T, b: T) => boolean = (a: T, b: T) => a > b) {
    super(compare)
  }
}

export class PriorityQueue<T> extends MinHeap<T> {
  private keys: number[]
  private keys_index: (a: T) => number

  constructor(
    keys_index: (a: T) => number,
    num_keys: number,
    compare: (a: T, b: T) => boolean = (a: T, b: T) => a < b
  ) {
    super(compare)
    this.keys = Array(num_keys).fill(-1)
    this.keys_index = keys_index
  }

  protected swap(a: number, b: number): void {
    const akey = this.keys_index(this.heap[a])
    const bkey = this.keys_index(this.heap[b])
    ;[this.keys[akey], this.keys[bkey]] = [this.keys[bkey], this.keys[akey]]
    super.swap(a, b)
  }

  public insert(value: T): void {
    this.keys[this.keys_index(value)] = this.size()
    super.insert(value)
  }

  public extract(): T {
    this.keys[this.keys_index(this.heap[0])] = -1
    if (this.size() > 1) {
      this.keys[this.keys_index(this.heap[this.size() - 1])] = 0
    }
    return super.extract()
  }

  public increasePriority(idx: number, value: T): void {
    if (this.keys[idx] === -1) {
      this.insert(value)
      return
    }

    const key = this.keys[idx]
    if (this.compare(this.heap[key], value)) {
      return
    }

    this.heap[key] = value
    this.bubbleUp(key)
  }
}
