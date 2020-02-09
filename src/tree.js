class BaseNode {
  constructor (char) {
    this.char = char
    this.children = Object.create(null)
  }

  childKeys () {
    return Object.keys(this.children)
  }

  childCount () {
    return this.childKeys().length
  }

  getChild (charKey) {
    return this.children[charKey] || null
  }

  hasChild (charKey) {
    if (arguments.length === 0) {
      return this.childCount() > 0
    }

    return this.getChild(charKey) !== null
  }

  canAddChild (charKey) {
    return this.getChild(charKey) === null
  }

  matchChildren (checkCalback) {
    const keys = this.childKeys()
    let i = keys.length

    while (i--) {
      const char = keys[i]
      const matchedChild = this.getChild(char)
      if (checkCalback(matchedChild, char)) return matchedChild
    }

    return null
  }

  addChild (char, node) {
    if (!char) return null

    if (this.canAddChild(char)) {
      this.children[char] = node
      return node
    }

    return this.children[char]
  }

  isRoot () {
    return false
  }

  isNode () {
    return false
  }

  isLeaf () {
    return false
  }
}

class LeafNode extends BaseNode {
  addChild (char, node) {
    return null
  }

  hasChild (maybeChildChar) {
    return false
  }

  getChild (charKey) {
    return null
  }

  canAddChild (maybeChildChar) {
    return false
  }

  isLeaf () {
    return true
  }
}

class TreeNode extends BaseNode {
  isNode () {
    return true
  }
}

class Tree extends TreeNode {
  constructor () {
    super(null)
  }

  isRoot () {
    return true
  }

  isNode () {
    return false
  }
}

export default Tree

export {
  Tree,
  TreeNode,
  LeafNode,
  BaseNode
}
