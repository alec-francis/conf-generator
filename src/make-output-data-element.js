// Create an output data element from an input data element and a template
const makeOutputDataElement = ({ inputDataElement, templateDb }) => {
  // Define the output data element
  const outputDataElement = {
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
