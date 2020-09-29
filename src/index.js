const extractTemplateById = require('./extract-template-by-id')
const makeGlobalContext = require('./make-global-context')
const makeOutputDataElement = require('./make-output-data-element')

// Generate configuration from instantiated templates
const confGenerator = async ({ inputData, templatesDb }) => {
  try {
    // Define the object to return
    const outputData = []

    // Make the global context
    const globalContext = makeGlobalContext({ inputData, templatesDb })

    // Loop over the inputData
    for (const inputDataElement of inputData) {
      outputData.push(
        await makeOutputDataElement({
          inputDataElement,
          templateDb: extractTemplateById({
            templateId: inputDataElement.templateId,
            templatesDb
          }),
          globalContext
        })
      )
    }

    // Return the output data
    return outputData
  } catch (err) {
    throw err
  }
}

module.exports = confGenerator
