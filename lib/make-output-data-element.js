const makeLocalContext = require('./make-local-context')
const renderMarkup = require('./render-markup')
const evaluateBusinessRule = require('./evaluate-business-rule')
const assertNoUndefinedVariables = require('./assert-no-undefined-variables')
const assertSelectInputs = require('./assert-select-inputs')

// Create an output data element from an input data element and a template
const makeOutputDataElement = async ({
  inputDataElement,
  templateDb,
  globalContext
}) => {
  // Make the render context
  const context = {
    ...globalContext,
    ...makeLocalContext({
      templateInputs: inputDataElement.templateInputs,
      templateInputsDb: templateDb.templateInputs,
      templateDisplayName: templateDb.templateDisplayName,
      globalContext
    })
  }

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
    templateInputs: inputDataElement.templateInputs,
    templateInputsDb: templateDb.templateInputs,
    context
  })

  // Define the output data element
  const outputDataElement = {
    configuration: configEnabled
      ? await renderMarkup({
          markup: templateDb.templateMarkup,
          context
        })
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
