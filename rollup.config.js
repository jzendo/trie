const babel = require('rollup-plugin-babel');

module.exports = {
  input: 'src/index.js',
  plugins: [ babel() ],
  output: [{
    file: 'build/trie.js',
    name: 'MTrie',
    format: 'umd'
  }, {
    file: 'build/trie.es.js',
   format: 'es'
  }]
}
