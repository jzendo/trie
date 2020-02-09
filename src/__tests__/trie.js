/* global describe, test, expect */

import Trie from '../trie'

describe('Trie', () => {
  test('is valid', () => {
    const arr = [
      'abc',
      'afd',
      'dba',
      'ab',
      'db'
    ]
    const trie = new Trie(arr)

    const trieTree = trie.getTrie()
    const trieTree1 = trie.getTrie()

    expect(trieTree.char).toBeNull()
    expect(trieTree.hasChild('a')).toBeTruthy()
    expect(trieTree.hasChild('d')).toBeTruthy()

    const matchedOriginArray = trie.getArrayByNode(trieTree)
    expect(matchedOriginArray).toEqual(arr)

    const matchedArray = trie.getArrayByNode(trie.trieTree.getChild('a'))
    expect(matchedArray).toEqual(['abc', 'afd', 'ab'])

    const notMatchedArray = trie.getArrayByNode(trie.trieTree.getChild('add'))
    expect(notMatchedArray).toBeNull()

    expect(trieTree.childCount()).toEqual(2)

    // Same instance
    expect(trieTree).toEqual(trieTree1)

    // Clear up
    trie.clear()
    // Test reset tree
    expect(trie.trieTree).toBeNull()
    // Ttest reset map
    const prevMatchedArray = trie.getArrayByNode(trie.trieTree)
    expect(prevMatchedArray).toBeNull()
  })

  test('is invalid', () => {
    expect(() => new Trie('abc')).toThrow()
    expect(() => new Trie(123)).toThrow()
    expect(() => new Trie(true)).toThrow()
  })
})
