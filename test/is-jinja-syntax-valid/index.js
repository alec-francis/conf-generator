const { assert } = require('chai')
const { isJinjaSyntaxValid } = require('../../index')

describe('Jinja syntax test suite.', () => {
  it('should return success: ethernet uplink markup', async () => {
    const { syntaxValid, errorMessage } = await isJinjaSyntaxValid(
      `{% if TRAFFIC_SHAPING == 'Yes' %}\npolicy-map pm-{{SHAPING_RATE}}-out\n class class-default\n shape average {{SHAPING_RATE}}\n!\ninterface {{INTERFACE_NAME}}\n description \"{{DESCRIPTION}}\"\n ip address {{IP_ADDRESS}} {{SUBNET_MASK}}\n service-policy output pm-{{SHAPING_RATE}}-out\n no shutdown\n exit\n!{% else %}\ninterface {{INTERFACE_NAME}}\n description \"{{DESCRIPTION}}\"\n ip address {{IP_ADDRESS}} {{SUBNET_MASK}}\n no shutdown\n exit\n!{% endif %}`
    )
    assert(syntaxValid === true, 'Error, the syntax is not valid')
  })

  it('should return success: dhcp server markup', async () => {
    const { syntaxValid, errorMessage } = await isJinjaSyntaxValid(
      `ip dhcp pool {{POOL_NAME}}\n network {{DHCP_NETWORK}}\n default-router {{DEFAULT_ROUTER}}\n dns-server {{DNS_SERVER}}\n exit\n!`
    )
    assert(syntaxValid === true, 'Error, the syntax is not valid')
  })

  it('should return success: vrrp markup', async () => {
    const { syntaxValid, errorMessage } = await isJinjaSyntaxValid(
      `interface {{VRRP_INTERFACE}}\n ip address {{LOCAL_IP_ADDRESS}} {{SUBNET_MASK}}\n vrrp {{VRRP_GROUP_ID}} ip {{VRRP_FLOATING_IP}}\n vrrp {{VRRP_GROUP_ID}} priority {{VRRP_PRIORITY}}\n no shut\n exit\n!`
    )
    assert(syntaxValid === true, 'Error, the syntax is not valid')
  })

  it('should return an error: ethernet uplink space in variable', async () => {
    const { syntaxValid, errorMessage } = await isJinjaSyntaxValid(
      `{% if TRAFFIC_SHAPING == 'Yes' %}\npolicy-map pm-{{SHAPING_RATE}}-out\n class class-default\n shape average {{SHAPING_RATE}}\n!\ninterface {{INTERFACE_NAME}}\n description \"{{DESCRIPTION ERR}}\"\n ip address {{IP_ADDRESS}} {{SUBNET_MASK}}\n service-policy output pm-{{SHAPING_RATE}}-out\n no shutdown\n exit\n!{% else %}\ninterface {{INTERFACE_NAME}}\n description \"{{DESCRIPTION}}\"\n ip address {{IP_ADDRESS}} {{SUBNET_MASK}}\n no shutdown\n exit\n!{% endif %}`
    )
    assert(syntaxValid === false, 'Error, the syntax is not valid')
    assert(
      errorMessage ===
        'Template render error: [Line 7, Column 29] expected variable end',
      'Error, the syntax is valid'
    )
  })

  it('should return an error: ethernet uplink bad expression', async () => {
    const { syntaxValid, errorMessage } = await isJinjaSyntaxValid(
      `{% if TRAFFIC_SHAPING == and 'Yes' %}\npolicy-map pm-{{SHAPING_RATE}}-out\n class class-default\n shape average {{SHAPING_RATE}}\n!\ninterface {{INTERFACE_NAME}}\n description \"{{DESCRIPTION}}\"\n ip address {{IP_ADDRESS}} {{SUBNET_MASK}}\n service-policy output pm-{{SHAPING_RATE}}-out\n no shutdown\n exit\n!{% else %}\ninterface {{INTERFACE_NAME}}\n description \"{{DESCRIPTION}}\"\n ip address {{IP_ADDRESS}} {{SUBNET_MASK}}\n no shutdown\n exit\n!{% endif %}`
    )
    assert(syntaxValid === false, 'Error, the syntax is not valid')
    assert(
      errorMessage ===
        'Template render error: [Line 1, Column 36] expected block end in if statement',
      'Error, the syntax is valid'
    )
  })
})
