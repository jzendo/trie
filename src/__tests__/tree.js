/* global describe, test, expect */

import Tree, {
  TreeNode,
  LeafNode
} from '../tree'

describe('LeafNode', () => {
  test('is valid', () => {
    const leafNode = new LeafNode('a')
    const childNode = leafNode.addChild('a', new LeafNode('a'))

    expect(leafNode.char === 'a').toBeTruthy()
    expect(leafNode.hasChild('a')).toBeFalsy()
    expect(leafNode.getChild('a')).toBeNull()
    expect(leafNode.isLeaf()).toBeTruthy()
    expect(leafNode.isNode()).toBeFalsy()
    expect(leafNode.canAddChild('a')).toBeFalsy()
    expect(childNode).toBeNull()
  })
})

describe('TreeNode', () => {
  test('is valid', () => {
    const treeNode = new TreeNode('a')
    const r = treeNode.addChild('')

    expect(treeNode.char === 'a').toBeTruthy()
    expect(treeNode.children !== undefined).toBeTruthy()
    expect(treeNode.hasChild()).toBeFalsy()
    expect(treeNode.isNode()).toBeTruthy()
    expect(treeNode.isRoot()).toBeFalsy()

    expect(r).toBeNull()
  })
})

describe('Tree', () => {
  test('is valid', () => {
    const tree = new Tree()

    expect(tree.char).toBeNull()
    expect(tree.isRoot()).toBeTruthy()
    expect(tree.isNode()).toBeFalsy()
    expect(tree.isLeaf()).toBeFalsy()

    const childNode = tree.addChild('a', new TreeNode('a'))
    const childNode2 = tree.addChild('a', new TreeNode('a'))

    let count = 0
    tree.matchChildren((_, char) => {
      count++
    })

    expect(tree.hasChild('a')).toBeTruthy()
    expect(tree.childCount()).toEqual(count)

    const matched = tree.matchChildren((_, char) => char === 'a')
    expect(matched && matched.char).toEqual('a')

    expect(childNode).not.toBeNull()
    expect(childNode2).toEqual(childNode)
  })
})
