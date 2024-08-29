export const bellmanFord = (
  graph: [number, number][][],
  start: number
): number[] | undefined => {
  const distances = Array(graph.length).fill(Infinity)
  distances[start] = 0

  for (let i = 0; i < graph.length - 1; ++i) {
    for (let node = 0; node < graph.length; ++node) {
      for (const [child, weight] of graph[node]) {
        const new_distance = distances[node] + weight
        if (new_distance < distances[child]) {
          distances[child] = new_distance
        }
      }
    }
  }

  for (let node = 0; node < graph.length; ++node) {
    for (const [child, weight] of graph[node]) {
      if (distances[child] > distances[node] + weight) {
        return undefined
      }
    }
  }

  return distances
}
