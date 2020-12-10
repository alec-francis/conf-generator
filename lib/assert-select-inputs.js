const isEqual = require('lodash.isequal')
const HttpError = require('./http-error')
const evaluateBusinessRule = require('./evaluate-business-rule')

// Ensure there are no select inputs in an invalid state
const assertSelectInputs = async ({
  templateDisplayName,
  templateInputs,
  templateInputsDb,
  context
}) => {
  // Loop over template inputs
  for (const templateInput of templateInputs) {
    const inputOptions = extractInputOptionsByInputId({
      inputId: templateInput.inputId,
      templateInputsDb
    })

    // Check if the form type is select
    if (
      isInputFormTypeSelect({
        inputId: templateInput.inputId,
        templateInputsDb
      })
    ) {
      // Extract the data type
      const inputDataType = extractInputDataType({
        inputId: templateInput.inputId,
        templateInputsDb
      })
      if (
        !(await isInputOptionSelectable({
          inputId: templateInput.inputId,
          inputValue: templateInput.inputValue,
          inputDataType,
          inputOptions,
          context
        }))
      ) {
        throw new HttpError({
          message: `The select input "${templateInput.inputId}" is set to a disabled value in template "${templateDisplayName}".`,
          status: 400
        })
      }
    }
  }
}

// Check if an inputValue is selectable
const isInputOptionSelectable = async ({
  inputId,
  inputValue,
  inputDataType,
  inputOptions,
  context
}) => {
  // Loop over input options
  for (const inputOption of inputOptions) {
    // Cast string as JSON if required
    const inputOptionValue =
      inputDataType === 'json'
        ? JSON.parse(inputOption.label)
        : inputOption.label

    // Check if the inputValue is valid
    if (isEqual(inputValue, inputOptionValue)) {
      if (inputOption.businessRule === '') return true
      return await evaluateBusinessRule({
        businessRule: inputOption.businessRule,
        context
      })
    }
  }

  // Throw an error if the input value didn't match any options
  throw new HttpError({
    message: `The select input "${inputId}" is set to a value that does not exist.`,
    status: 400
  })
}

// Check if the input form type is select
const isInputFormTypeSelect = ({ inputId, templateInputsDb }) => {
  for (const templateInputDb of templateInputsDb) {
    if (inputId === templateInputDb.inputId) {
      if (templateInputDb.inputFormType === 'select') {
        return true
      } else {
        return false
      }
    }
  }
  throw new HttpError({
    message: `Unexpected error. The input "${inputId}" was not found.`,
    status: 500
  })
}

// Check if the input form type is select
const extractInputDataType = ({ inputId, templateInputsDb }) => {
  for (const templateInputDb of templateInputsDb) {
    if (inputId === templateInputDb.inputId) {
      return templateInputDb.inputDataType
    }
  }
  throw new HttpError({
    message: `Unexpected error. The input "${inputId}" was not found.`,
    status: 500
  })
}

// Extract input options by an inputId
const extractInputOptionsByInputId = ({ inputId, templateInputsDb }) => {
  for (const templateInputDb of templateInputsDb) {
    if (inputId === templateInputDb.inputId) {
      return templateInputDb.inputOptions
    }
  }
  throw new HttpError({
    message: `Unexpected error. The input "${inputId}" was not found.`,
    status: 500
  })
}

module.exports = assertSelectInputs
