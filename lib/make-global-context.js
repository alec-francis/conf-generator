const HttpError = require('./http-error')
const extractTemplateById = require('./extract-template-by-id')

// Make the global context
const makeGlobalContext = ({ inputData, templatesDb }) => {
  // Assert no duplicate global inputs
  const globalDuplicates = {}
  for (const templateDb of templatesDb) {
    for (const templateInputDb of templateDb.templateInputs) {
      if (templateInputDb.inputGlobal) {
        if (globalDuplicates[templateInputDb.inputId]) {
          throw new HttpError({
            message: `The global input "${
              templateInputDb.inputId
            }" is defined in more than one template: "${
              globalDuplicates[templateInputDb.inputId]
            }", "${templateDb.templateDisplayName}"`,
            status: 400
          })
        } else {
          globalDuplicates[templateInputDb.inputId] =
            templateDb.templateDisplayName
        }
      }
    }
  }

  // Define the global context
  const globalContext = {}

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
  throw new HttpError({
    message: `The input "${inputId}" was provided but does not exist in the template "${templateDisplayName}".`,
    status: 400
  })
}

module.exports = makeGlobalContext
