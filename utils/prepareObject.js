const objectPrepared = (objectToPrepare) => {
  for (const [key, value] of Object.entries(objectToPrepare)) {
    if (value === '') {
      objectToPrepare[key] = null
    }
  }
  return objectToPrepare
}

export default objectPrepared
