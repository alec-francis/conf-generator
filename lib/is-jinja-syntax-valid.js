const nunjucks = require('nunjucks')

// Check if the Jinja2 syntax is valid
const isJinjaSyntaxValid = (markup) =>
  new Promise((resolve, reject) => {
    nunjucks.renderString(markup, {}, (err, result) => {
      if (err) {
        const errorMessage = `${err.name}: ${err.message
          .replace('(unknown path)', '')
          .replace(/\r?\n|\r/g, '')}`
        resolve({
          syntaxValid: false,
          errorMessage: errorMessage.replace(/\s\s+/g, ' ')
        })
      }
      resolve({
        syntaxValid: true
      })
    })
  })

module.exports = isJinjaSyntaxValid
