# UCG Core

[![Build Status](https://travis-ci.org/alec-francis/ucg-core.svg?branch=master)](https://travis-ci.org/alec-francis/ucg-core)

## Contents

- [Install](#Install)
- [Usage](#Usage)
  - [Config Generation](#Config-Generation)
  - [Input Visibility](#Input-Visibility)
  - [Jinja2 Syntax Validation](#Jinja2-Syntax-Validation)
  - [Business Rule Syntax Validation](#Business-Rule-Syntax-Validation)

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
            inputDataType: 'string',
            inputFormType: 'select',
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
            inputDataType: 'string',
            inputFormType: 'text',
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
            inputDataType: 'string',
            inputFormType: 'text',
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

    // Print the output data as JSON
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

### Input Visibility

#### Example

```javascript
// Require the input visibility method
const { makeInputVisibility } = require('ucg-core')

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
            inputDataType: 'string',
            inputFormType: 'select',
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
            inputDataType: 'string',
            inputFormType: 'text',
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
            inputDataType: 'string',
            inputFormType: 'text',
            inputDefaultValue: '255.255.255.252',
            inputReadOnly: false,
            inputGlobal: false
          }
        ],
        templateMarkup:
          'interface {{PHYSICAL_INTERFACE}}\n ip address {{IP_ADDRESS}} {{SUBNET_MASK}}\n no shutdown\n exit\n!'
      }
    ]

    // Generate the input visibility array
    const inputVisibility = await makeInputVisibility({
      inputData: inputData,
      templatesDb: templatesDb
    })

    // Print the input visibility array as JSON
    console.log(JSON.stringify(inputVisibility, null, 2))
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
    "templateId": "5b794b468b48020c3135703c",
    "templateInputs": [
      {
        "inputId": "PHYSICAL_INTERFACE",
        "inputVisible": true,
        "inputOptions": [
          {
            "label": "GigabitEthernet0/0/0",
            "isDisabled": false
          },
          {
            "label": "GigabitEthernet0/0/1",
            "isDisabled": false
          },
          {
            "label": "FastEthernet1",
            "isDisabled": true
          }
        ]
      },
      {
        "inputId": "IP_ADDRESS",
        "inputVisible": true
      },
      {
        "inputId": "SUBNET_MASK",
        "inputVisible": true
      }
    ]
  }
]
```

### Jinja2 Syntax Validation

#### Example

```javascript
// Require the Jinja2 syntax validator
const { isJinjaSyntaxValid } = require('ucg-core')

const demo = async () => {
  try {
    const { syntaxValid, errorMessage } = await isJinjaSyntaxValid(
      `ip dhcp pool {{POOL_ NAME}}\n network {{DHCP_NETWORK}}\n default-router {{DEFAULT_ROUTER}}\n dns-server {{DNS_SERVER}}\n exit\n!`
    )
    console.log(syntaxValid)
    console.log(errorMessage)
  } catch (err) {
    console.log(err)
  }
}

// Run the demo
demo()
```

#### Example Output

```
false
Template render error: [Line 1, Column 22] expected variable end
```

### Business Rule Syntax Validation

#### Example

```javascript
// Require the business rule syntax validator
const { isBusinessRuleSyntaxValid } = require('ucg-core')

const demo = async () => {
  try {
    const { syntaxValid, errorMessage } = await isBusinessRuleSyntaxValid(
      "WAN_TYPE ==== 'VDSL'"
    )
    console.log(syntaxValid)
    console.log(errorMessage)
  } catch (err) {
    console.log(err)
  }
}

// Run the demo
demo()
```

#### Example Output

```
false
Template render error: [Column 13] unexpected token: =
```
