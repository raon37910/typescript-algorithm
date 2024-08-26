class TreeNode<T> {
  constructor(
    public data: T,
    public leftChild?: TreeNode<T>,
    public rightChild?: TreeNode<T>
  ) {}
}

export class BinarySearchTree<T> {
  rootNode?: TreeNode<T>

  constructor() {
    this.rootNode = undefined
  }

  isEmpty(): boolean {
    return this.rootNode === undefined
  }

  has(data: T): boolean {
    if (!this.rootNode) {
      return false
    }

    let currentNode = this.rootNode
    while (currentNode.data !== data) {
      if (data > currentNode.data) {
        if (!currentNode.rightChild) {
          return false
        }

        currentNode = currentNode.rightChild
      } else {
        if (!currentNode.leftChild) {
          return false
        }

        currentNode = currentNode.leftChild
      }
    }

    return true
  }

  insert(data: T): void {
    if (!this.rootNode) {
      this.rootNode = new TreeNode(data)
      return
    }

    let currentNode = this.rootNode
    while (true) {
      if (data > currentNode.data) {
        if (currentNode.rightChild) {
          currentNode = currentNode.rightChild
        } else {
          currentNode.rightChild = new TreeNode(data)
          return
        }
      } else {
        if (currentNode.leftChild) {
          currentNode = currentNode.leftChild
        } else {
          currentNode.leftChild = new TreeNode(data)
          return
        }
      }
    }
  }

  findMin(): T {
    if (!this.rootNode) {
      throw new Error('Empty tree.')
    }

    const traverse = (node: TreeNode<T>): T => {
      return !node.leftChild ? node.data : traverse(node.leftChild)
    }

    return traverse(this.rootNode)
  }

  findMax(): T {
    if (!this.rootNode) {
      throw new Error('Empty tree.')
    }

    const traverse = (node: TreeNode<T>): T => {
      return !node.rightChild ? node.data : traverse(node.rightChild)
    }

    return traverse(this.rootNode)
  }

  inOrderTraversal(array: T[] = []): T[] {
    if (!this.rootNode) {
      return array
    }

    const traverse = (node?: TreeNode<T>, array: T[] = []): T[] => {
      if (!node) {
        return array
      }

      traverse(node.leftChild, array)
      array.push(node.data)
      traverse(node.rightChild, array)
      return array
    }

    return traverse(this.rootNode)
  }

  preOrderTraversal(array: T[] = []): T[] {
    if (!this.rootNode) {
      return array
    }

    const traverse = (node?: TreeNode<T>, array: T[] = []): T[] => {
      if (!node) {
        return array
      }

      array.push(node.data)
      traverse(node.leftChild, array)
      traverse(node.rightChild, array)

      return array
    }

    return traverse(this.rootNode)
  }

  postOrderTraversal(array: T[] = []): T[] {
    if (!this.rootNode) {
      return array
    }

    const traverse = (node?: TreeNode<T>, array: T[] = []): T[] => {
      if (!node) {
        return array
      }

      traverse(node.leftChild, array)
      traverse(node.rightChild, array)
      array.push(node.data)

      return array
    }

    return traverse(this.rootNode)
  }
}
