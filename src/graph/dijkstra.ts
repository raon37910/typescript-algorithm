import { PriorityQueue } from '../data-structures/heap/heap'

export const dijkstra = (
  graph: [number, number][][],
  start: number
): number[] => {
  const priorityQueue = new PriorityQueue(
    (a: [number, number]) => {
      return a[0]
    },
    graph.length,
    (a: [number, number], b: [number, number]) => {
      return a[1] < b[1]
    }
  )
  priorityQueue.insert([start, 0])
  const distances = Array(graph.length).fill(Infinity)
  distances[start] = 0

  while (priorityQueue.size() > 0) {
    const node = priorityQueue.extract()[0]
    graph[node].forEach(([child, weight]) => {
      const new_distance = distances[node] + weight
      if (new_distance < distances[child]) {
        priorityQueue.increasePriority(child, [child, weight])
        distances[child] = new_distance
      }
    })
  }

  return distances
}
