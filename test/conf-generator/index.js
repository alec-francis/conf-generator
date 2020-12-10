const { assert } = require('chai')
const { confGenerator } = require('../../index')

// Import test data - inputs
const inputData01 = require('./input-data-01.json')
const inputData02 = require('./input-data-02.json')
const inputData03 = require('./input-data-03.json')
const inputData04 = require('./input-data-04.json')
const inputData05 = require('./input-data-05.json')
const inputData06 = require('./input-data-06.json')
const inputData07 = require('./input-data-07.json')
const inputData08 = require('./input-data-08.json')
const inputData09 = require('./input-data-09.json')
const inputData10 = require('./input-data-10.json')
const inputData11 = require('./input-data-11.json')
const inputData12 = require('./input-data-12.json')
const inputData13 = require('./input-data-13.json')
const inputData14 = require('./input-data-14.json')
const inputData15 = require('./input-data-15.json')
const inputData16 = require('./input-data-16.json')
const inputData17 = require('./input-data-17.json')

// Import test data - templates
const templatesDb01 = require('./templates-db-01.json')
const templatesDb02 = require('./templates-db-02.json')
const templatesDb03 = require('./templates-db-03.json')
const templatesDb04 = require('./templates-db-04.json')
const templatesDb05 = require('./templates-db-05.json')
const templatesDb06 = require('./templates-db-06.json')
const templatesDb07 = require('./templates-db-07.json')
const templatesDb08 = require('./templates-db-08.json')
const templatesDb09 = require('./templates-db-09.json')
const templatesDb10 = require('./templates-db-10.json')
const templatesDb11 = require('./templates-db-11.json')
const templatesDb12 = require('./templates-db-12.json')

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

  it('should generate a Cisco interface with blank values', async () => {
    const outputData = await confGenerator({
      inputData: inputData11,
      templatesDb: templatesDb01
    })
    assert(
      outputData[0].configuration ===
        'interface GigabitEthernet0/0/0\n ip address  \n no shutdown\n exit\n!',
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

  it('should generate two Cisco interfaces using the same template', async () => {
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

  it('should generate two Cisco interfaces using different templates', async () => {
    const outputData = await confGenerator({
      inputData: inputData10,
      templatesDb: templatesDb08
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

  it('should generate a Cisco interface as the index provided was valid JSON', async () => {
    const outputData = await confGenerator({
      inputData: inputData16,
      templatesDb: templatesDb11
    })
    assert(
      outputData[0].configuration ===
        'interface GigabitEthernet2\n ip address 10.10.10.2 255.255.255.252\n no shutdown\n exit\n!',
      'Error, the config does not match'
    )
  })

  it('should generate multiple Cisco interfaces using a JSON input array', async () => {
    const outputData = await confGenerator({
      inputData: inputData17,
      templatesDb: templatesDb12
    })
    assert(
      outputData[0].configuration ===
        'interface GigabitEthernet1\n ip address 10.0.1.1 255.255.255.0\n no shutdown\n exit\n!\ninterface GigabitEthernet2\n ip address 10.0.2.1 255.255.255.0\n no shutdown\n exit\n!\ninterface GigabitEthernet3\n ip address 10.0.3.1 255.255.255.0\n no shutdown\n exit\n!',
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
          'The global input "PHYSICAL_INTERFACE" is defined in more than one template: "Global Vars One", "Global Vars Two"',
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
          'The select input "PHYSICAL_INTERFACE" is set to a value that does not exist.',
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
          'The select input "PHYSICAL_INTERFACE" is set to a disabled value in template "Ethernet Uplink - Simple".',
        'Error, error message does not match'
      )
    }
  })

  it('should error as a template ID does not exist in the templatesDb array', async () => {
    try {
      await confGenerator({
        inputData: inputData01,
        templatesDb: []
      })
      assert(true === false, 'Error, an error should have already been thrown')
    } catch (err) {
      assert(
        err.message ===
          'No matching template ID was found for "5b794b468b48020c3135703c".',
        'Error, error message does not match'
      )
    }
  })

  it('should error as a read-only input was given an unexpected value', async () => {
    try {
      await confGenerator({
        inputData: inputData01,
        templatesDb: templatesDb09
      })
      assert(true === false, 'Error, an error should have already been thrown')
    } catch (err) {
      assert(
        err.message ===
          'The input "IP_ADDRESS" is read-only but was modified in "Ethernet Uplink - Simple".',
        'Error, error message does not match'
      )
    }
  })

  it('should succeed as a read-only input was not given an input value', async () => {
    const outputData = await confGenerator({
      inputData: inputData12,
      templatesDb: templatesDb09
    })
    assert(
      outputData[0].configuration ===
        'interface GigabitEthernet0/0/0\n ip address 10.0.0.2 255.255.255.252\n no shutdown\n exit\n!',
      'Error, the config does not match'
    )
  })

  it('should succeed as a read-only input was provided the default value', async () => {
    const outputData = await confGenerator({
      inputData: inputData13,
      templatesDb: templatesDb09
    })
    assert(
      outputData[0].configuration ===
        'interface GigabitEthernet0/0/0\n ip address 10.0.0.2 255.255.255.252\n no shutdown\n exit\n!',
      'Error, the config does not match'
    )
  })

  it('should error as a string input was provided an array', async () => {
    try {
      await confGenerator({
        inputData: inputData14,
        templatesDb: templatesDb10
      })
      assert(true === false, 'Error, an error should have already been thrown')
    } catch (err) {
      assert(
        err.message ===
          'The input "IP_ADDRESS" requires a "string". Data type provided: "object". The error occured in the template "Ethernet Uplink - Simple".',
        'Error, error message does not match'
      )
    }
  })

  it('should error as a string input was provided with an integer', async () => {
    try {
      await confGenerator({
        inputData: inputData15,
        templatesDb: templatesDb10
      })
      assert(true === false, 'Error, an error should have already been thrown')
    } catch (err) {
      assert(
        err.message ===
          'The input "IP_ADDRESS" requires a "string". Data type provided: "number". The error occured in the template "Ethernet Uplink - Simple".',
        'Error, error message does not match'
      )
    }
  })
})
