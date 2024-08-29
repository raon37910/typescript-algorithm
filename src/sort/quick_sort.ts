export const partition = (
  array: number[],
  left: number = 0,
  right: number = array.length - 1
) => {
  const pivotIndex = choosePivot(left, right)
  const pivot = array[pivotIndex]
  ;[array[pivotIndex], array[right]] = [array[right], array[pivotIndex]]
  let i = left - 1
  let j = right

  while (i < j) {
    while (array[++i] < pivot);
    while (array[--j] > pivot);

    if (i < j) {
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

  ;[array[right], array[i]] = [array[i], array[right]]
  return i
}

const choosePivot = (left: number, right: number): number => {
  return Math.floor(Math.random() * (right - left + 1)) + left
}

export const QuickSort = (
  array: number[],
  left: number = 0,
  right: number = array.length - 1
) => {
  if (array.length > 1) {
    const index = partition(array, left, right)

    if (left < index - 1) {
      QuickSort(array, left, index - 1)
    }

    if (index + 1 < right) {
      QuickSort(array, index + 1, right)
    }
  }

  return array
}
