// Ensure there are no select inputs in an invalid state
const assertSelectInputs = ({ templateInputs, templateInputsDb }) => {
  for (const templateInput of templateInputs) {
    if (
      isInputTypeSelect({ inputId: templateInput.inputId, templateInputsDb })
    ) {
      if (
        !isInputValueValid({
          inputValue: templateInput.inputValue,
          inputOptions: extractInputOptionsByInputId({
            inputId: templateInput.inputId,
            templateInputsDb
          })
        })
      ) {
        throw new Error(
          `The select input "${templateInput.inputId}" is set to value that does not exist.`
        )
      }
    }
  }
}

// Check if an inputValue is valid
const isInputValueValid = ({ inputValue, inputOptions }) => {
  for (const inputOption of inputOptions) {
    if (inputValue === inputOption.label) {
      return true
    }
  }
  return false
}

// Check if an input is of type select
const isInputTypeSelect = ({ inputId, templateInputsDb }) => {
  for (const templateInputDb of templateInputsDb) {
    if (inputId === templateInputDb.inputId) {
      if (templateInputDb.inputType === 'select') {
        return true
      } else {
        return false
      }
    }
  }
  throw new Error(`Unexpected error. The input "${inputId}" was not found.`)
}

// Extract input options by an inputId
const extractInputOptionsByInputId = ({ inputId, templateInputsDb }) => {
  for (const templateInputDb of templateInputsDb) {
    if (inputId === templateInputDb.inputId) {
      return templateInputDb.inputOptions
    }
  }
  throw new Error(`Unexpected error. The input "${inputId}" was not found.`)
}

module.exports = assertSelectInputs
