// Construct a Jinja2 expression from a business rule
const makeBusinessRuleExpression = (businessRule) => {
  return `{% if ${businessRule} %}true{% else %}false{% endif %}`
}

module.exports = makeBusinessRuleExpression
