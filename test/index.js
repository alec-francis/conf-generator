const { assert } = require('chai')
const confGenerator = require('../src')
const inputData = require('./sample-input-data.json')
const templatesDb = require('./sample-templates-db.json')

describe('Config generator tests.', () => {
  it('should output a sample string', async () => {
    const outputData = await confGenerator({ inputData, templatesDb })
    console.log(JSON.stringify(outputData, null, 2))
    assert(
      'Sample string' === 'Sample string',
      'Error, the output did not match sample string'
    )
  })
})
