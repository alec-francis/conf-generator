const { assert } = require('chai')
const confGenerator = require('../src/conf-generator')

// Import test data
const inputData01 = require('./input-data-01.json')
const inputData02 = require('./input-data-02.json')
const inputData03 = require('./input-data-03.json')
const inputData04 = require('./input-data-04.json')
const inputData05 = require('./input-data-05.json')
const inputData06 = require('./input-data-06.json')
const inputData07 = require('./input-data-07.json')
const inputData08 = require('./input-data-08.json')
const inputData09 = require('./input-data-09.json')
const templatesDb01 = require('./templates-db-01.json')
const templatesDb02 = require('./templates-db-02.json')
const templatesDb03 = require('./templates-db-03.json')
const templatesDb04 = require('./templates-db-04.json')
const templatesDb05 = require('./templates-db-05.json')
const templatesDb06 = require('./templates-db-06.json')
const templatesDb07 = require('./templates-db-07.json')

describe('Config generation test suite.', () => {
  it('should generate a Cisco interface', async () => {
    const outputData = await confGenerator({
      inputData: inputData01,
      templatesDb: templatesDb01
    })
    assert(
      outputData[0].configuration ===
        'interface GigabitEthernet0/0/0\n ip address 10.10.10.2 255.255.255.252\n no shutdown\n exit\n!',
      'Error, the config does not match'
    )
  })

  it('should generate a Cisco interface using default values', async () => {
    const outputData = await confGenerator({
      inputData: inputData02,
      templatesDb: templatesDb01
    })
    assert(
      outputData[0].configuration ===
        'interface GigabitEthernet0/0/0\n ip address 10.0.0.2 255.255.255.252\n no shutdown\n exit\n!',
      'Error, the config does not match'
    )
  })

  it('should generate a Cisco interface using global variables', async () => {
    const outputData = await confGenerator({
      inputData: inputData03,
      templatesDb: templatesDb02
    })
    assert(
      outputData[0].configuration ===
        'interface GigabitEthernet0/0/1\n ip address 10.20.20.2 255.255.0.0\n no shutdown\n exit\n!',
      'Error, the config does not match'
    )
  })

  it('should generate a Cisco interface as the template business rule evaluates to true', async () => {
    const outputData = await confGenerator({
      inputData: inputData01,
      templatesDb: templatesDb03
    })
    assert(
      outputData[0].configuration ===
        'interface GigabitEthernet0/0/0\n ip address 10.10.10.2 255.255.255.252\n no shutdown\n exit\n!',
      'Error, the config does not match'
    )
  })

  it('should generate an empty config as the template business rule evaluates to false', async () => {
    const outputData = await confGenerator({
      inputData: inputData01,
      templatesDb: templatesDb04
    })
    assert(
      outputData[0].configuration === '',
      'Error, the config does not match'
    )
  })

  it('should generate two Cisco interfaces', async () => {
    const outputData = await confGenerator({
      inputData: inputData07,
      templatesDb: templatesDb01
    })
    assert(
      outputData[0].configuration ===
        'interface GigabitEthernet0/0/0\n ip address 10.10.10.2 255.255.255.252\n no shutdown\n exit\n!',
      'Error, the config does not match'
    )
    assert(
      outputData[1].configuration ===
        'interface GigabitEthernet0/0/1\n ip address 10.10.20.1 255.255.255.0\n no shutdown\n exit\n!',
      'Error, the config does not match'
    )
  })

  it('should generate a Cisco interface as the input option is selectable', async () => {
    const outputData = await confGenerator({
      inputData: inputData01,
      templatesDb: templatesDb07
    })
    assert(
      outputData[0].configuration ===
        'interface GigabitEthernet0/0/0\n ip address 10.10.10.2 255.255.255.252\n no shutdown\n exit\n!',
      'Error, the config does not match'
    )
  })

  it('should error due to a rogue input', async () => {
    try {
      await confGenerator({
        inputData: inputData04,
        templatesDb: templatesDb01
      })
      assert(true === false, 'Error, an error should have already been thrown')
    } catch (err) {
      assert(
        err.message ===
          'The input "ROGUE_INPUT" was provided but does not exist in the template "Ethernet Uplink - Simple".',
        'Error, error message does not match'
      )
    }
  })

  it('should error due to an undefined input referenced in template markup', async () => {
    try {
      await confGenerator({
        inputData: inputData01,
        templatesDb: templatesDb05
      })
      assert(true === false, 'Error, an error should have already been thrown')
    } catch (err) {
      assert(
        err.message ===
          'The input "LEMONADE" referenced in template "Ethernet Uplink - Simple" is not defined.',
        'Error, error message does not match'
      )
    }
  })

  it('should error as a global input is defined more than once', async () => {
    try {
      await confGenerator({
        inputData: inputData05,
        templatesDb: templatesDb06
      })
      assert(true === false, 'Error, an error should have already been thrown')
    } catch (err) {
      assert(
        err.message ===
          'The global input "PHYSICAL_INTERFACE" is defined in more than one template.',
        'Error, error message does not match'
      )
    }
  })

  it('should error as an input is defined more than once in a request', async () => {
    try {
      await confGenerator({
        inputData: inputData06,
        templatesDb: templatesDb01
      })
      assert(true === false, 'Error, an error should have already been thrown')
    } catch (err) {
      assert(
        err.message ===
          'The input "PHYSICAL_INTERFACE" is defined more than once in the template "Ethernet Uplink - Simple".',
        'Error, error message does not match'
      )
    }
  })

  it('should error as a select input is set to an input option that does not exist', async () => {
    try {
      await confGenerator({
        inputData: inputData08,
        templatesDb: templatesDb01
      })
      assert(true === false, 'Error, an error should have already been thrown')
    } catch (err) {
      assert(
        err.message ===
          'The select input "PHYSICAL_INTERFACE" is set to value that does not exist.',
        'Error, error message does not match'
      )
    }
  })

  it('should error as a select input is set to an input option that is disabled', async () => {
    try {
      await confGenerator({
        inputData: inputData09,
        templatesDb: templatesDb07
      })
      assert(true === false, 'Error, an error should have already been thrown')
    } catch (err) {
      assert(
        err.message ===
          'The select input "PHYSICAL_INTERFACE" is set to a disabled value.',
        'Error, error message does not match'
      )
    }
  })
})
