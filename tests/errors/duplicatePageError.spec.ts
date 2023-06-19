import { faker } from "@faker-js/faker"

import DuplicatePageError from "@src/errors/duplicatePageError"

//* yarn test:watch ./tests/errors/duplicatePageError.spec.ts

describe('DuplicatePageError expectations', () => {
  it('should be able to create a duplicatePageError', () => {
    const pageId = faker.string.alpha({
      casing: "upper"
    })
    const duplicatePageError = new DuplicatePageError(pageId)

    expect(duplicatePageError).toBeTruthy()
    expect(duplicatePageError).toBeInstanceOf(DuplicatePageError)
  })

  const pageId = faker.string.alpha({
    casing: "upper"
  })
  const duplicatePageError = new DuplicatePageError(pageId)

  describe('Message expectations', () => {
    it('should be able to get message', () => {
      expect(duplicatePageError.message).toBeTruthy()
      expect(typeof duplicatePageError.message).toBe('string')
    })

    it('should retrieve appropriate message', () => {
      expect(duplicatePageError.message).toBe(`Page with id \`${pageId}\` already exists.`)
    })
  })

  describe('Name expectations', () => {
    it('should be able to get name', () => {
      expect(duplicatePageError.name).toBeTruthy()
      expect(typeof duplicatePageError.name).toBe('string')
    })

    it('should retrieve appropriate name', () => {
      expect(duplicatePageError.name).toBe('DuplicatePageError')
    })
  })

  it('should be able to thrown duplicatePageError', () => {
    expect(() => {
      throw duplicatePageError
    }).toThrow(DuplicatePageError)
  })
})
