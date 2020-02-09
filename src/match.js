
const recurMatch = (node, str) => {
  str = String(str).trim()
  const len = str.length

  if (len === 0) return null

  const firstChar = str[0]
  const remainStr = str.slice(1)

  const matched = node.matchChildren(
    (childNode, char) => char === firstChar
  )

  if (matched && remainStr) {
    return recurMatch(matched, remainStr)
  }

  if (!remainStr) return matched

  return null
}

const searchTrie = (trie, str) => {
  const result = recurMatch(trie.trieTree, str)

  return result
    ? trie.getArrayByNode(result)
    : null
}

export default searchTrie
