const makeContext = require('./make-context')
const extractArrayItemByKey = require('./extract-array-item-by-key')
const evaluateBusinessRule = require('./evaluate-business-rule')

// Create an input visibility element from an input data element and a template
const makeInputVisibilityElement = async ({
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

  // Define the input visibility element
  const inputVisibilityElement = {
    templateId: templateDb.id,
    templateInputs: await makeTemplateInputsVisibility({
      templateInputs: inputDataElement.templateInputs,
      templateInputsDb: templateDb.templateInputs,
      context
    })
  }

  // Return the input visibility element
  return inputVisibilityElement
}

// Make the template inputs visibility array
const makeTemplateInputsVisibility = async ({
  templateInputs,
  templateInputsDb,
  context
}) => {
  const templateInputsVisibility = []
  for (const templateInput of templateInputs) {
    templateInputsVisibility.push(
      await makeTemplateInputVisibility({
        templateInputDb: extractArrayItemByKey({
          array: templateInputsDb,
          keyName: 'inputId',
          keyValue: templateInput.inputId
        }),
        context
      })
    )
  }
  return templateInputsVisibility
}

// Make the template input visibility element
const makeTemplateInputVisibility = async ({ templateInputDb, context }) => {
  const templateInputVisibility = {
    inputId: templateInputDb.inputId,
    inputVisible: await evaluateBusinessRule({
      businessRule: templateInputDb.businessRule,
      context
    })
  }
  if (templateInputDb.inputFormType === 'select') {
    templateInputVisibility.inputOptions = await makeInputOptionsVisibility({
      inputOptionsDb: templateInputDb.inputOptions,
      context
    })
  }
  return templateInputVisibility
}

// Make the input options visibility array
const makeInputOptionsVisibility = async ({ inputOptionsDb, context }) => {
  const inputOptionsVisibility = []
  for (const inputOptionDb of inputOptionsDb) {
    inputOptionsVisibility.push({
      label: inputOptionDb.label,
      isDisabled: !(await evaluateBusinessRule({
        businessRule: inputOptionDb.businessRule,
        context
      }))
    })
  }
  return inputOptionsVisibility
}

module.exports = makeInputVisibilityElement
