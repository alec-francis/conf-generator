// Extract a template from the templatesDb array
const extractTemplateById = ({ templateId, templatesDb }) => {
  for (const templateDb of templatesDb) {
    if (templateDb.id === templateId) return templateDb
  }
  throw new Error(`No matching template ID was found for ${templateId}`)
}

module.exports = extractTemplateById
