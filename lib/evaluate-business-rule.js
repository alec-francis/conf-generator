const makeBusinessRuleExpression = require('./make-business-rule-expression')
const renderMarkup = require('./render-markup')

// Evaluate a business rule as true or false
const evaluateBusinessRule = async ({ businessRule, context }) => {
  try {
    if (businessRule === '') return true
    const businessRuleExpression = makeBusinessRuleExpression(businessRule)
    const result = await renderMarkup({
      markup: businessRuleExpression,
      context
    })
    if (result === 'true') {
      return true
    } else {
      return false
    }
  } catch (err) {
    throw err
  }
}

module.exports = evaluateBusinessRule
