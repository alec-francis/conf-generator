# UCG Core

[![Build Status](https://travis-ci.org/alec-francis/ucg-core.svg?branch=master)](https://travis-ci.org/alec-francis/ucg-core)

## Install

```
$ npm install ucg-core
```

## Usage

### Config Generation

#### Example

```javascript
// Require the config generator
const { confGenerator } = require('ucg-core')

const demo = async () => {
  try {
    // Define the input data
    const inputData = [
      {
        templateId: '5b794b468b48020c3135703c',
        templateInputs: [
          {
            inputId: 'PHYSICAL_INTERFACE',
            inputValue: 'GigabitEthernet0/0/0'
          },
          {
            inputId: 'IP_ADDRESS',
            inputValue: '10.10.10.2'
          },
          {
            inputId: 'SUBNET_MASK',
            inputValue: '255.255.255.252'
          }
        ]
      }
    ]

    // Define the templates list
    const templatesDb = [
      {
        id: '5b794b468b48020c3135703c',
        templateDisplayName: 'Ethernet Uplink - Simple',
        templateDescription: 'Ethernet Uplink template for the Cisco C1117-4P',
        businessRule: '',
        templateVersion: 3,
        templateUpdatedBy: 'Demo Account',
        dateModified: 1601324697559,
        dateCreated: 1601324602017,
        templateInputs: [
          {
            inputId: 'PHYSICAL_INTERFACE',
            inputPrimaryKey: 'opBY9pb9XRzmnpT3IvYo',
            inputDisplayName: 'Physical Interface',
            inputPriority: 1,
            inputDescription: 'Name of the physical interface',
            businessRule: '',
            inputType: 'select',
            inputDefaultValue: 'GigabitEthernet0/0/0',
            inputOptions: [
              {
                label: 'GigabitEthernet0/0/0',
                businessRule: ''
              },
              {
                label: 'GigabitEthernet0/0/1',
                businessRule: ''
              },
              {
                label: 'FastEthernet1',
                businessRule: "ROUTER == 'legacy'"
              }
            ],
            inputReadOnly: false,
            inputGlobal: false
          },
          {
            inputId: 'IP_ADDRESS',
            inputPrimaryKey: 'NXdrkbc7nwiV0mfG8WOq',
            inputDisplayName: 'IP Address',
            inputPriority: 3,
            inputDescription: 'IP Address of the Interface',
            businessRule: '',
            inputType: 'text',
            inputDefaultValue: '10.0.0.2',
            inputReadOnly: false,
            inputGlobal: false
          },
          {
            inputId: 'SUBNET_MASK',
            inputPrimaryKey: 'aQfJGq3XBNHyI7js2w9V',
            inputDisplayName: 'Subnet Mask',
            inputPriority: 4,
            inputDescription:
              'Subnet mask of the Interface, Eg: 255.255.255.252',
            businessRule: '',
            inputType: 'text',
            inputDefaultValue: '255.255.255.252',
            inputReadOnly: false,
            inputGlobal: false
          }
        ],
        templateMarkup:
          'interface {{PHYSICAL_INTERFACE}}\n ip address {{IP_ADDRESS}} {{SUBNET_MASK}}\n no shutdown\n exit\n!'
      }
    ]

    // Generate the output data
    const outputData = await confGenerator({
      inputData: inputData,
      templatesDb: templatesDb
    })

    // Print as output data as JSON
    console.log(JSON.stringify(outputData, null, 2))
  } catch (err) {
    console.log(err)
  }
}

// Run the demo
demo()
```

#### Example Output

```json
[
  {
    "configuration": "interface GigabitEthernet0/0/0\n ip address 10.10.10.2 255.255.255.252\n no shutdown\n exit\n!",
    "templateMetadata": {
      "templateId": "5b794b468b48020c3135703c",
      "templateDisplayName": "Ethernet Uplink - Simple",
      "templateDescription": "Ethernet Uplink template for the Cisco C1117-4P",
      "templateVersion": 3,
      "templateUpdatedBy": "Demo Account",
      "dateModified": 1601324697559,
      "dateCreated": 1601324602017
    },
    "templateInputs": [
      {
        "inputId": "PHYSICAL_INTERFACE",
        "inputValue": "GigabitEthernet0/0/0"
      },
      {
        "inputId": "IP_ADDRESS",
        "inputValue": "10.10.10.2"
      },
      {
        "inputId": "SUBNET_MASK",
        "inputValue": "255.255.255.252"
      }
    ]
  }
]
```
