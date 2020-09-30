const isJinjaSyntaxValid = require('./is-jinja-syntax-valid')
const makeBusinessRuleExpression = require('./make-business-rule-expression')

// Check if the business rule syntax is valid
const isBusinessRuleSyntaxValid = async (businessRule) => {
  try {
    // Return true if the business rule is blank
    if (businessRule === '')
      return {
        syntaxValid: true
      }

    // Construct a Jinja2 expression
    const businessRuleExpression = makeBusinessRuleExpression(businessRule)

    // Validate the Jinja2 expression
    const { syntaxValid, errorMessage } = await isJinjaSyntaxValid(
      businessRuleExpression
    )

    // Return the result if the syntax is valid
    if (syntaxValid)
      return {
        syntaxValid: true
      }

    // Return the result if the syntax is not valid
    return {
      syntaxValid,
      errorMessage: fixColumnNumber(errorMessage).replace('Line 1, ', '')
    }
  } catch (err) {
    throw err
  }
}

const fixColumnNumber = (errorMessage) => {
  // Match on the column info
  const result = errorMessage.match(/Column \d+/g)

  // Return if the match was unsuccessful
  if (result.length !== 1) return errorMessage

  // Extract the column number
  const columnNumber = parseInt(result[0].replace('Column ', ''))

  // Create the updated column number
  const columnNumberUpdated = (columnNumber - 6).toString()

  // Return the updated error message
  return errorMessage.replace(/Column \d+/, `Column ${columnNumberUpdated}`)
}

module.exports = isBusinessRuleSyntaxValid
