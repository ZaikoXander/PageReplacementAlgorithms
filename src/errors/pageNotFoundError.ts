class PageNotFoundError extends Error {
  constructor(pageId: string) {
    super(`Page with id \`${pageId}\` not found.`)
    this.name = 'PageNotFoundError'
  }
}

export default PageNotFoundError
