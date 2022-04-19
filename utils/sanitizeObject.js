import sanitizeHtml from 'sanitize-html'

const sanitize = value => sanitizeHtml(value, {
  allowedTags: [],
  allowedAttributes: []
})

const safeHTML = (objectToSanitize) => {
  for (const [key, value] of Object.entries(objectToSanitize)) {
    sanitize(value)
    objectToSanitize[key] = value
  }
  return objectToSanitize
}

export const safeHTMLObject = (objectToSanitize) => {
  for (const [key, value] of Object.entries(objectToSanitize)) {
    sanitize(value)
    objectToSanitize[key] = value
    if (typeof value === 'object') {
      safeHTML(value)
    }
  }
  return objectToSanitize
}

export default safeHTML
