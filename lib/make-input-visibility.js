const extractTemplateById = require('./extract-template-by-id')
const makeGlobalContext = require('./make-global-context')
const makeInputVisibilityElement = require('./make-input-visibility-element')

// Make the input visibility from instantiated templates
const makeInputVisibility = async ({ inputData, templatesDb }) => {
  try {
    // Define the object to return
    const inputVisibility = []

    // Make the global context
    const globalContext = makeGlobalContext({ inputData, templatesDb })

    // Loop over the inputData
    for (const inputDataElement of inputData) {
      inputVisibility.push(
        await makeInputVisibilityElement({
          inputDataElement,
          templateDb: extractTemplateById({
            templateId: inputDataElement.templateId,
            templatesDb
          }),
          globalContext
        })
      )
    }

    // Return the input visibility
    return inputVisibility
  } catch (err) {
    throw err
  }
}

module.exports = makeInputVisibility
