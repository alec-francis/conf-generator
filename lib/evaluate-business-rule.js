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

// Construct a Jinja2 expression from a business rule
const makeBusinessRuleExpression = (businessRule) => {
  return `{% if ${businessRule} %}true{% else %}false{% endif %}`
}

module.exports = evaluateBusinessRule
