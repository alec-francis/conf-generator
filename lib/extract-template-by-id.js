const HttpError = require('./http-error')

// Extract a template from the templatesDb array
const extractTemplateById = ({ templateId, templatesDb }) => {
  for (const templateDb of templatesDb) {
    if (templateDb.id === templateId) return templateDb
  }
  throw new HttpError({
    message: `No matching template ID was found for "${templateId}".`,
    status: 404
  })
}

module.exports = extractTemplateById
