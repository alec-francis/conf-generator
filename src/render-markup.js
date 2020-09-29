const nunjucks = require('nunjucks')

// Render a Jinja2 template
const renderMarkup = ({ markup, context }) =>
  new Promise((resolve, reject) => {
    nunjucks.renderString(markup, context, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })

module.exports = renderMarkup
