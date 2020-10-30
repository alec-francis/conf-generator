const renderMarkup = require('./render-markup')
const evaluateBusinessRule = require('./evaluate-business-rule')
const assertNoUndefinedVariables = require('./assert-no-undefined-variables')
const assertSelectInputs = require('./assert-select-inputs')
const assertReadOnlyInputs = require('./assert-read-only-inputs')
const makeContext = require('./make-context')

// Create an output data element from an input data element and a template
const makeOutputDataElement = async ({
  inputDataElement,
  templateDb,
  globalContext
}) => {
  // Make the render context
  const context = makeContext({
    templateInputs: inputDataElement.templateInputs,
    templateInputsDb: templateDb.templateInputs,
    templateDisplayName: templateDb.templateDisplayName,
    globalContext
  })

  // Check if the config is enabled
  const configEnabled = await evaluateBusinessRule({
    businessRule: templateDb.businessRule,
    context
  })

  // Check markup for undefined variables
  assertNoUndefinedVariables({
    templateMarkup: templateDb.templateMarkup,
    context,
    templateDisplayName: templateDb.templateDisplayName
  })

  // Assert that the select inputs are in a valid state
  await assertSelectInputs({
    templateDisplayName: templateDb.templateDisplayName,
    templateInputs: inputDataElement.templateInputs,
    templateInputsDb: templateDb.templateInputs,
    context
  })

  // Assert all read-only inputs are in a valid state
  assertReadOnlyInputs({
    templateDisplayName: templateDb.templateDisplayName,
    templateInputs: inputDataElement.templateInputs,
    templateInputsDb: templateDb.templateInputs
  })

  // Define the output data element
  const outputDataElement = {
    configuration: configEnabled
      ? (
          await renderMarkup({
            markup: templateDb.templateMarkup,
            context
          })
        ).replace(/^\n/, '')
      : '',
    templateMetadata: {
      templateId: templateDb.id,
      templateDisplayName: templateDb.templateDisplayName,
      templateDescription: templateDb.templateDescription,
      templateVersion: templateDb.templateVersion,
      templateUpdatedBy: templateDb.templateUpdatedBy,
      dateModified: templateDb.dateModified,
      dateCreated: templateDb.dateCreated
    },
    templateInputs: inputDataElement.templateInputs
  }

  // Return the output data element
  return outputDataElement
}

module.exports = makeOutputDataElement
