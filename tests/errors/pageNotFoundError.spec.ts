import { faker } from "@faker-js/faker"

import PageNotFoundError from "@src/errors/pageNotFoundError"

//* yarn test:watch ./tests/errors/pageNotFoundError.spec.ts

describe('PageNotFoundError expectations', () => {
  it('should be able to create a pageNotFoundError', () => {
    const pageId = faker.string.alpha({
      casing: "upper"
    })
    const pageNotFoundError = new PageNotFoundError(pageId)

    expect(pageNotFoundError).toBeTruthy()
    expect(pageNotFoundError).toBeInstanceOf(PageNotFoundError)
  })

  const pageId = faker.string.alpha({
    casing: "upper"
  })
  const pageNotFoundError = new PageNotFoundError(pageId)

  describe('Message expectations', () => {
    it('should be able to get message', () => {
      expect(pageNotFoundError.message).toBeTruthy()
      expect(typeof pageNotFoundError.message).toBe('string')
    })

    it('should retrieve appropriate message', () => {
      expect(pageNotFoundError.message).toBe(`Page with id \`${pageId}\` not found.`)
    })
  })

  describe('Name expectations', () => {
    it('should be able to get name', () => {
      expect(pageNotFoundError.name).toBeTruthy()
      expect(typeof pageNotFoundError.name).toBe('string')
    })

    it('should retrieve appropriate name', () => {
      expect(pageNotFoundError.name).toBe('PageNotFoundError')
    })
  })

  it('should be able to thrown pageNotFoundError', () => {
    expect(() => {
      throw pageNotFoundError
    }).toThrow(PageNotFoundError)
  })
})
