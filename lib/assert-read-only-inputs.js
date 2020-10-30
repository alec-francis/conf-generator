const extractArrayItemByKey = require('./extract-array-item-by-key')
const HttpError = require('./http-error')

// Assert all read-only inputs are in a valid state
const assertReadOnlyInputs = ({
  templateDisplayName,
  templateInputs,
  templateInputsDb
}) => {
  for (const templateInput of templateInputs) {
    const templateInputDb = extractArrayItemByKey({
      array: templateInputsDb,
      keyName: 'inputId',
      keyValue: templateInput.inputId
    })

    // Throw an error if the input is read-only and the value does not match the default
    if (
      templateInputDb.inputReadOnly &&
      templateInputDb.inputDefaultValue !== templateInput.inputValue
    )
      throw new HttpError({
        message: `The input "${templateInput.inputId}" is read-only but was modified in "${templateDisplayName}".`,
        status: 400
      })
  }
}

module.exports = assertReadOnlyInputs
