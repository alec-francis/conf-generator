const HttpError = require('./http-error')
const extractArrayItemByKey = require('./extract-array-item-by-key')
const extractTemplateById = require('./extract-template-by-id')

// Assert data types
const assertDataTypes = ({ inputData, templatesDb }) => {
  // Loop over the inputData
  for (const inputDataElement of inputData) {
    // Extract templateDb
    const templateDb = extractTemplateById({
      templateId: inputDataElement.templateId,
      templatesDb
    })

    // Loop over template inputs
    for (const templateInput of inputDataElement.templateInputs) {
      // Extract templateInputDb
      const templateInputDb = extractArrayItemByKey({
        array: templateDb.templateInputs,
        keyName: 'inputId',
        keyValue: templateInput.inputId
      })

      if (!templateInputDb)
        throw new HttpError({
          message: `The input "${templateInput.inputId}" was provided but does not exist in the template "${templateDb.templateDisplayName}".`,
          status: 400
        })

      // Verify the data type of the input
      if (
        templateInputDb.inputDataType === 'string' &&
        typeof templateInput.inputValue !== 'string'
      )
        throw new HttpError({
          message: `The input "${
            templateInput.inputId
          }" requires a "string". Data type provided: "${typeof templateInput.inputValue}". The error occured in the template "${
            templateDb.templateDisplayName
          }".`,
          status: 400
        })
    }
  }
}

module.exports = assertDataTypes
