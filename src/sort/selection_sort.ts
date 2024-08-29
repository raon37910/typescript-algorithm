export const selectionSort = (items: number[]) => {
  for (let i = 0; i < items.length; i++) {
    let min = i
    for (let j = i + 1; j < items.length; j++) {
      if (items[j] < items[min]) {
        min = j
      }
    }
    if (i !== min) {
      ;[items[i], items[min]] = [items[min], items[i]]
    }
  }
  return items
}
