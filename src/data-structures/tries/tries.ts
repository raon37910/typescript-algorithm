class TrieNode {
  children: Record<string, TrieNode> = {}
  isWord = false
}

export class Trie {
  root: TrieNode = new TrieNode()

  public add(word: string): this {
    this.insertNode(this.root, word)
    return this
  }

  public find(word: string, isPrefixMatch = false) {
    return this.searchNode(this.root, word, isPrefixMatch)
  }

  private insertNode(node: TrieNode, word: string): void {
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode()
      }
      node = node.children[char]
    }
    node.isWord = true
  }

  private searchNode(node: TrieNode, word: string, prefixMatch: boolean) {
    for (const char of word) {
      if (!node.children[char]) {
        return false
      }
      node = node.children[char]
    }

    return prefixMatch || node.isWord
  }
}
