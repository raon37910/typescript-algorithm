import { PriorityQueue } from '../data-structures/heap/heap'

export const prim = (graph: [number, number][][]): [Edge[], number] => {
  if (graph.length === 0) {
    return [[], 0]
  }

  const minimum_spanning_tree: Edge[] = []
  let total_wieght = 0

  const priorityQueue = new PriorityQueue(
    (e: Edge) => {
      return e.b
    },
    graph.length,
    (a: Edge, b: Edge) => {
      return a.weight < b.weight
    }
  )

  const visited = new Set<number>()
  visited.add(0)
  add_children(graph, priorityQueue, 0)

  while (!priorityQueue.isEmpty()) {
    const edge = priorityQueue.extract()
    if (visited.has(edge.b)) {
      continue
    }
    minimum_spanning_tree.push(edge)
    total_wieght += edge.weight
    visited.add(edge.b)
    add_children(graph, priorityQueue, edge.b)
  }

  return [minimum_spanning_tree, total_wieght]
}

const add_children = (
  graph: [number, number][][],
  priorityQueue: PriorityQueue<Edge>,
  node: number
) => {
  for (const out_edge of graph[node]) {
    priorityQueue.increasePriority(
      out_edge[0],
      new Edge(node, out_edge[0], out_edge[1])
    )
  }
}

export class Edge {
  a: number = 0
  b: number = 0
  weight: number = 0

  constructor(a: number, b: number, weight: number) {
    this.a = a
    this.b = b
    this.weight = weight
  }
}
