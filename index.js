// Export public functions
module.exports = {
  confGenerator: require('./lib/conf-generator'),
  makeInputVisibility: require('./lib/make-input-visibility'),
  isJinjaSyntaxValid: require('./lib/is-jinja-syntax-valid'),
  isBusinessRuleSyntaxValid: require('./lib/is-business-rule-syntax-valid')
}
