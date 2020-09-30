const extractTemplateById = require('./extract-template-by-id')

// Make the global context
const makeGlobalContext = ({ inputData, templatesDb }) => {
  // Define the global context
  const globalContext = {}

  // Assert no duplicate global inputs
  const globalDuplicates = {}
  for (const templateDb of templatesDb) {
    for (const templateInputDb of templateDb.templateInputs) {
      if (globalDuplicates[templateInputDb.inputId]) {
        throw new Error(
          `The global input "${templateInputDb.inputId}" is defined in more than one template.`
        )
      } else {
        globalDuplicates[templateInputDb.inputId] = true
      }
    }
  }

  // Populate request data
  for (const inputDataElement of inputData) {
    for (const templateInput of inputDataElement.templateInputs) {
      const templateDb = extractTemplateById({
        templateId: inputDataElement.templateId,
        templatesDb
      })
      if (
        isInputGlobal({
          inputId: templateInput.inputId,
          templateInputsDb: templateDb.templateInputs,
          templateDisplayName: templateDb.templateDisplayName
        })
      )
        globalContext[templateInput.inputId] = templateInput.inputValue
    }
  }

  // Populate default data
  for (const templateDb of templatesDb) {
    for (const templateInputDb of templateDb.templateInputs) {
      if (
        templateInputDb.inputGlobal &&
        !globalContext[templateInputDb.inputId]
      )
        globalContext[templateInputDb.inputId] =
          templateInputDb.inputDefaultValue
    }
  }

  // Return the global context
  return globalContext
}

// Check if an input is global
const isInputGlobal = ({ inputId, templateInputsDb, templateDisplayName }) => {
  for (const templateInputDb of templateInputsDb) {
    if (inputId === templateInputDb.inputId) return templateInputDb.inputGlobal
  }
  throw new Error(
    `The input "${inputId}" was provided but does not exist in the template "${templateDisplayName}".`
  )
}

module.exports = makeGlobalContext
