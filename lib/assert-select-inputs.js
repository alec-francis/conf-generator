const HttpError = require('./http-error')
const evaluateBusinessRule = require('./evaluate-business-rule')

// Ensure there are no select inputs in an invalid state
const assertSelectInputs = async ({
  templateDisplayName,
  templateInputs,
  templateInputsDb,
  context
}) => {
  for (const templateInput of templateInputs) {
    const inputOptions = extractInputOptionsByInputId({
      inputId: templateInput.inputId,
      templateInputsDb
    })
    if (
      isinputFormTypeSelect({
        inputId: templateInput.inputId,
        templateInputsDb
      })
    ) {
      if (
        !(await isInputOptionSelectable({
          inputId: templateInput.inputId,
          inputValue: templateInput.inputValue,
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
  inputOptions,
  context
}) => {
  for (const inputOption of inputOptions) {
    if (inputValue === inputOption.label) {
      if (inputOption.businessRule === '') return true
      return await evaluateBusinessRule({
        businessRule: inputOption.businessRule,
        context
      })
    }
  }
  throw new HttpError({
    message: `The select input "${inputId}" is set to a value that does not exist.`,
    status: 400
  })
}

// Check if an input is of type select
const isinputFormTypeSelect = ({ inputId, templateInputsDb }) => {
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
