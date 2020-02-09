const data = require('./data/sample.json')
const measure = require('./measure')

function run(str) {
  const r = data.filter(item => {
    return item.indexOf(str || '') === 0
  })
  console.log(`> Matched: ${r ? r.length : 0} items`)
}

measure(run)
