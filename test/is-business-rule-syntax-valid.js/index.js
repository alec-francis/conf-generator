const { assert } = require('chai')
const { isBusinessRuleSyntaxValid } = require('../../index')

describe('Business Rule syntax test suite.', () => {
  it("should return success: WAN_TYPE == 'VDSL'", async () => {
    const { syntaxValid, errorMessage } = await isBusinessRuleSyntaxValid(
      "WAN_TYPE == 'VDSL'"
    )
    assert(syntaxValid === true, 'Error, the syntax is not valid')
  })

  it("should return success: WAN_TYPE != 'VDSL'", async () => {
    const { syntaxValid, errorMessage } = await isBusinessRuleSyntaxValid(
      "WAN_TYPE != 'VDSL'"
    )
    assert(syntaxValid === true, 'Error, the syntax is not valid')
  })

  it("should return success: LICENSE == 'Advanced' and ENABLE_SHAPING == 'Yes'", async () => {
    const { syntaxValid, errorMessage } = await isBusinessRuleSyntaxValid(
      "LICENSE == 'Advanced' and ENABLE_SHAPING == 'Yes'"
    )
    assert(syntaxValid === true, 'Error, the syntax is not valid')
  })

  it("should return success: LICENSE == 'Advanced' or ENABLE_SHAPING == 'Yes'", async () => {
    const { syntaxValid, errorMessage } = await isBusinessRuleSyntaxValid(
      "LICENSE == 'Advanced' or ENABLE_SHAPING == 'Yes'"
    )
    assert(syntaxValid === true, 'Error, the syntax is not valid')
  })

  it("should return success: (LICENSE == 'Advanced' or ENABLE_SHAPING == 'Yes') and (WAN_TYPE == 'VDSL')", async () => {
    const { syntaxValid, errorMessage } = await isBusinessRuleSyntaxValid(
      "(LICENSE == 'Advanced' or ENABLE_SHAPING == 'Yes') and (WAN_TYPE == 'VDSL')"
    )
    assert(syntaxValid === true, 'Error, the syntax is not valid')
  })

  it("should return an error: WAN_TYPE ==== 'VDSL'", async () => {
    const { syntaxValid, errorMessage } = await isBusinessRuleSyntaxValid(
      "WAN_TYPE ==== 'VDSL'"
    )
    assert(syntaxValid === false, 'Error, the syntax is valid')
    assert(
      errorMessage === 'Template render error: [Column 13] unexpected token: =',
      'Error, the syntax is valid'
    )
  })

  it("should return an error: WAN_TYPE == 'VDSL' and", async () => {
    const { syntaxValid, errorMessage } = await isBusinessRuleSyntaxValid(
      "WAN_TYPE == 'VDSL' and"
    )
    assert(syntaxValid === false, 'Error, the syntax is valid')
    assert(
      errorMessage ===
        'Template render error: [Column 24] unexpected token: %}',
      'Error, the syntax is valid'
    )
  })

  it("should return an error: WAN_TYPE 'VDSL'", async () => {
    const { syntaxValid, errorMessage } = await isBusinessRuleSyntaxValid(
      "WAN_TYPE 'VDSL'"
    )
    assert(syntaxValid === false, 'Error, the syntax is valid')
    assert(
      errorMessage ===
        'Template render error: [Column 17] expected block end in if statement',
      'Error, the syntax is valid'
    )
  })
})
