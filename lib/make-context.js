const makeLocalContext = require('./make-local-context')

// Make the context
const makeContext = ({
  templateInputs,
  templateInputsDb,
  templateDisplayName,
  globalContext
}) => {
  // Make the render context
  const context = {
    ...globalContext,
    ...makeLocalContext({
      templateInputs,
      templateInputsDb,
      templateDisplayName,
      globalContext
    })
  }

  // Return the context
  return context
}

module.exports = makeContext
