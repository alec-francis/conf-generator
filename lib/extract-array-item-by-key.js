// Extract an item from an array by ID
const extractArrayItemByKey = ({ array, keyName, keyValue }) => {
  for (const item of array) {
    if (item[keyName] === keyValue) return item
  }
  return null
}

module.exports = extractArrayItemByKey
