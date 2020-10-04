const { assert } = require('chai')
const { makeInputVisibility } = require('../../index')
const isEqual = require('lodash.isequal')

// Import test data - inputs
const inputData01 = require('./input-data-01.json')
const inputData02 = require('./input-data-02.json')

// Import test data - templates
const templatesDb01 = require('./templates-db-01.json')
const templatesDb02 = require('./templates-db-02.json')

// Import output data
const inputVisibility01 = require('./input-visibility-01.json')
const inputVisibility02 = require('./input-visibility-02.json')
const inputVisibility03 = require('./input-visibility-03.json')
const inputVisibility04 = require('./input-visibility-04.json')

describe('Input Visibility test suite.', () => {
  it('should make a disable select input option', async () => {
    const inputVisibility = await makeInputVisibility({
      inputData: inputData01,
      templatesDb: templatesDb01
    })
    assert(
      isEqual(inputVisibility, inputVisibility01),
      'Error, the object values do not match'
    )
  })

  it('should make an invisible input', async () => {
    const inputVisibility = await makeInputVisibility({
      inputData: inputData01,
      templatesDb: templatesDb02
    })
    assert(
      isEqual(inputVisibility, inputVisibility02),
      'Error, the object values do not match'
    )
  })

  it('should create two instances with different input option visibility', async () => {
    const inputVisibility = await makeInputVisibility({
      inputData: inputData02,
      templatesDb: templatesDb01
    })

    assert(
      isEqual(inputVisibility, inputVisibility03),
      'Error, the object values do not match'
    )
  })

  it('should create two instances with different input row visibility', async () => {
    const inputVisibility = await makeInputVisibility({
      inputData: inputData02,
      templatesDb: templatesDb02
    })

    assert(
      isEqual(inputVisibility, inputVisibility04),
      'Error, the object values do not match'
    )
  })
})
