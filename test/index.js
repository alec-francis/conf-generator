const { assert } = require('chai')
const awesomeFunction = require('../src')

describe('Awesome test.', () => {
  it('should test awesome function', () => {
    const expectedVal = 'I am just an Awesome Function'
    assert(awesomeFunction() === expectedVal, 'Named awesome :(')
  })
})
