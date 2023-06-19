class DuplicatePageError extends Error {
  constructor(pageId: string) {
    super(`Page with id \`${pageId}\` already exists.`)
    this.name = 'DuplicatePageError'
  }
}

export default DuplicatePageError
