export const binarySearch = (
  array: number[],
  target: number,
  start: number = 0,
  end: number = array.length - 1
): number | null => {
  if (array.length === 0) return null
  if (target < array[start] || target > array[end]) return null
  let middle = (start + end) >> 1
  while (array[middle] !== target && start <= end) {
    if (target < array[middle]) end = middle - 1
    else start = middle + 1
    middle = (start + end) >> 1
  }
  return array[middle] === target ? middle : null
}
