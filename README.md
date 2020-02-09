# trie

Use [trie](http://en.wikipedia.org/wiki/Trie) to implement 'search array by the specified prefixed-string'.

```javascript
// Big array
const data = [
  'abc hello',
  'hello world',
  'Wow that'
  // ...
]

// The matching string
const str = 'ab'

// Buid trie tree
const tree = trie.generateTrie(data)

// The matched array
const r = trie.matchString(tree, str)

```
