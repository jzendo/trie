const data = require('./data/sample.json')
const measure = require('./measure')

const trie = require('../build/trie')
let t

function run(str) {
  if (!t) t = trie.generateTrie(data)

  const r = trie.matchString(t, str || '')
  console.log(`> Matched: ${r ? r.length : 0} items`)
}

measure(run)
