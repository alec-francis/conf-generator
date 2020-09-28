const { assert } = require('chai')
const confGenerator = require('../src')

describe('Config generator tests.', () => {
  it('should output a sample string', async () => {
    assert(
      (await confGenerator()) === 'Sample string',
      'Error, the output did not match sample string'
    )
  })
})
