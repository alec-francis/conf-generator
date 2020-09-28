const extractTemplateById = require('./extract-template-by-id')
const makeOutputDataElement = require('./make-output-data-element')

// Generate configuration from instantiated templates
const confGenerator = async ({ inputData, templatesDb }) => {
  try {
    // Define the object to return
    const outputData = []

    // Loop over the inputData
    for (const inputDataElement of inputData) {
      outputData.push(
        makeOutputDataElement({
          inputDataElement,
          templateDb: extractTemplateById({
            templateId: inputDataElement.templateId,
            templatesDb
          })
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
