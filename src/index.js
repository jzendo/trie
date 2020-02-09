/*!
 * Get sub set from array which is for auto complete by using `Trie Tree`
 * Author by jzendo, refer http://en.wikipedia.org/wiki/Trie
 */

import Trie from './trie'
import match from './match'

const generateTrie = arr => {
  const trie = new Trie(arr)
  trie.getTrie()

  return trie
}

const matchString = (trie, matchingString) => {
  if (trie instanceof Trie && matchingString) {
    return match(trie, matchingString)
  } else {
    throw new Error('The "trie" or "matchingString" argument is invalid.')
  }
}

export {
  generateTrie,
  matchString
}
