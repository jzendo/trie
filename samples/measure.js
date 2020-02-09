const testStr = require('./str')

const getTime = () => new Date().getTime()

const measure = fn => {
  const start = getTime()

  try {
    fn()
  } catch (e) {}

  return {
    start: start,
    end: getTime()
  }
}

const runAll = fns => {
  fns.forEach(fn => {
    const time = measure(fn)
    console.log(`  The elapsed time: ${time.end - time.start} ms\n`)
  });
}

module.exports = run =>
  runAll([
    () => run(testStr[0]),
    () => run(testStr[1]),
    () => run(testStr[2]),
    () => run(testStr[3])
  ])
