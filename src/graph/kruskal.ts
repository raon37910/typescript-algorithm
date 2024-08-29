export const kruskal = (
  edges: Edge[],
  num_vertices: number
): [Edge[], number] => {
  // 부모 노드를 찾는 함수 (find)
  const find = (parent: number[], i: number): number => {
    if (parent[i] === i) return i
    return (parent[i] = find(parent, parent[i]))
  }

  // 두 노드를 연결하는 함수 (union)
  const union = (parent: number[], rank: number[], x: number, y: number) => {
    const xRoot = find(parent, x)
    const yRoot = find(parent, y)

    if (rank[xRoot] < rank[yRoot]) {
      parent[xRoot] = yRoot
    } else if (rank[xRoot] > rank[yRoot]) {
      parent[yRoot] = xRoot
    } else {
      parent[yRoot] = xRoot
      rank[xRoot]++
    }
  }

  // 결과를 저장할 배열 및 비용 초기화
  const result: Edge[] = []
  let cost = 0

  // 간선을 가중치 기준으로 정렬
  edges.sort((a, b) => a.weight - b.weight)

  // 부모와 랭크 배열 초기화
  const parent: number[] = []
  const rank: number[] = []

  for (let i = 0; i < num_vertices; i++) {
    parent[i] = i
    rank[i] = 0
  }

  // 간선을 순회하며 최소 신장 트리를 형성
  for (const edge of edges) {
    const x = find(parent, edge.a)
    const y = find(parent, edge.b)

    if (x !== y) {
      result.push(edge)
      cost += edge.weight
      union(parent, rank, x, y)
    }
  }

  // 최소 신장 트리와 그 비용을 반환
  return [result, cost]
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
