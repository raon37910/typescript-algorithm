export const HeapSort = (arr: number[]): number[] => {
  buildMaxHeap(arr)

  for (let i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i)
    heapify(arr, 0, i)
  }

  return arr
}

function buildMaxHeap(arr: number[]): void {
  const n = arr.length

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, i, n)
  }
}

function heapify(arr: number[], index: number, size: number): void {
  let largest = index
  const left = 2 * index + 1
  const right = 2 * index + 2

  if (left < size && arr[left] > arr[largest]) {
    largest = left
  }

  if (right < size && arr[right] > arr[largest]) {
    largest = right
  }

  if (largest !== index) {
    swap(arr, index, largest)
    heapify(arr, largest, size)
  }
}

function swap(arr: number[], i: number, j: number): void {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
