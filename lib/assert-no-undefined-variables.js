const HttpError = require('./http-error')

// Ensure there are no undefined variables in the template markup
const assertNoUndefinedVariables = ({
  templateMarkup,
  context,
  templateDisplayName
}) => {
  // Create an array of referenced variables
  let inputIdsReferenced = templateMarkup.match(/\{\{[\s]*?[A-Z_]*[\s]*?\}\}/g)

  // Return true if no variables are referenced
  if (!inputIdsReferenced) return true

  // Assert each variable is defined
  for (const inputIdBraces of inputIdsReferenced) {
    const inputId = inputIdBraces.replace(/\{\{[\s]*?|[\s]*?\}\}/g, '')
    if (!(inputId.trim() in context))
      throw new HttpError({
        message: `The input "${inputId.trim()}" referenced in template "${templateDisplayName}" is not defined.`,
        status: 400
      })
  }
}

module.exports = assertNoUndefinedVariables
