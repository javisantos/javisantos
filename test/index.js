import test from 'tape'
import tapSpec from 'tap-spec'

test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout)

test('Init', async function (t) {
  t.assert(true, 'Should be true')
  t.end()
})
