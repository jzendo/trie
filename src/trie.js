import {
  Tree,
  TreeNode
} from './tree'

const INVALID_ARG_ERROR = new Error('invalid argument')

const assertArgument = arr => {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw INVALID_ARG_ERROR
  }
}

class Trie {
  constructor (arr) {
    assertArgument(arr)

    /**
     * @type {Object}
     */
    this.trieTree = null

    /**
     * @type {Map}
     */
    this.indexMap_ = new Map()

    /**
     * @readonly
     */
    Object.defineProperty(this, 'arr', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: arr
    })
  }

  /**
   * @public
   * @returns {Object}
   */
  getTrie () {
    // Singlton instance
    if (!this.trieTree) {
      this.trieTree = this.parse_()
    }

    return this.trieTree
  }

  /**
   * Get sub-array by the matched tree node
   *
   * @public
   * @param {TreeNode} node the matched tree node
   */
  getArrayByNode (node) {
    // Has a trie tree
    if (this.trieTree) {
      if (this.trieTree === node) return this.arr

      const indexArr = this.indexMap_.get(node)
      if (indexArr) {
        return indexArr.map(idx => this.arr[idx]).reverse()
      }
    }

    return null
  }

  /**
   * @public
   * @description reset vars
   */
  clear () {
    this.trieTree = null
    this.indexMap_ = new Map()
  }

  /**
   * @private
   */
  parse_ () {
    const arr = this.arr
    const tree = new Tree()

    let current = arr.length

    while (current--) {
      // Trim pre/suff spaces
      const str = String(arr[current]).trim()
      const len = str.length

      let i = -1
      let node = tree

      while (++i < len) {
        const char = str[i]
        node = node.addChild(char, new TreeNode(char))
        this.updateIndexMap_(node, current)
      }
    }

    return tree
  }

  /**
   * @private
   * @param {TreeNode} node tree node
   * @param {Integer} index ths array index
   */
  updateIndexMap_ (node, index) {
    const map = this.indexMap_
    if (map.has(node)) {
      const prev = map.get(node)
      map.set(node, [...prev, index])
    } else {
      map.set(node, [index])
    }
  }
}

export default Trie
