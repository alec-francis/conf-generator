const HttpError = require('./http-error')

// Make the local context
const makeLocalContext = ({
  templateInputs,
  templateInputsDb,
  templateDisplayName,
  globalContext
}) => {
  // Define the local context
  const localContext = {}

  // Populate request data
  for (const templateInput of templateInputs) {
    // Throw an error if the input has already been defined
    if (localContext[templateInput.inputId])
      throw new HttpError({
        message: `The input "${templateInput.inputId}" is defined more than once in the template "${templateDisplayName}".`,
        status: 400
      })

    // Add the input to the context if it isn't already in the global context
    if (!globalContext[templateInput.inputId])
      localContext[templateInput.inputId] = templateInput.inputValue
  }

  // Populate default data
  for (const templateInputDb of templateInputsDb) {
    if (
      !localContext[templateInputDb.inputId] &&
      !globalContext[templateInputDb.inputId]
    )
      localContext[templateInputDb.inputId] = templateInputDb.inputDefaultValue
  }

  // Return the local context
  return localContext
}

module.exports = makeLocalContext
