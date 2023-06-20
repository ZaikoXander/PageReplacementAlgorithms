import { faker } from "@faker-js/faker"

import NRUPage from "@src/algorithms/nru/nruPage"

//* yarn test:watch ./tests/algorithms/nru/nruPage.spec.ts

describe('NRU Page expectations', () => {
  it('should be able to create a page instance', () => {
    const id = faker.string.alpha({
      casing: "upper"
    })
    const lastTimeUsed = faker.number.int(30)
    const page = new NRUPage(id, lastTimeUsed)

    expect(page).toBeTruthy()
    expect(page).toBeInstanceOf(NRUPage)
  })

  const id = faker.string.alpha({
    casing: "upper"
  })
  const lastTimeUsed = faker.number.int(30)
  const page = new NRUPage(id, lastTimeUsed)

  it('should be able to get page id', () => {
    expect(page.id).toBeTruthy()
    expect(page.id).toBe(id)
    expect(typeof page.id).toBe("string")
  })

  describe('Page lastTimeUsed expectations', () => {
    it('should be able to get page lastTimeUsed', () => {
      expect(page.lastTimeUsed).toBeGreaterThanOrEqual(0)
      expect(page.lastTimeUsed).toBeLessThanOrEqual(30)
      expect(page.lastTimeUsed).toBe(lastTimeUsed)
      expect(typeof page.lastTimeUsed).toBe("number")
    })
  
    it('should be able to set page lastTimeUsed', () => {
      const pageLastTimeUsedBeforeChanges = page.lastTimeUsed
      page.lastTimeUsed++
  
      expect(page.lastTimeUsed).not.toBe(pageLastTimeUsedBeforeChanges)
      expect(page.lastTimeUsed).toBe(lastTimeUsed + 1)
      expect(page.lastTimeUsed).toBe(pageLastTimeUsedBeforeChanges + 1)
    })
  })

  describe('Page `modified` property expectations', () => {
    it('should be able to get page `modified` property', () => {
      expect(page.modified).toBeFalsy()
      expect(page.modified).toBe(false)
      expect(typeof page.modified).toBe("boolean")
    })
  
    it('should be able to set page `modified` property', () => {
      const isPageModifiedBeforeChanges = page.modified
      page.modified = true

      expect(page.modified).not.toBe(isPageModifiedBeforeChanges)
      expect(page.modified).toBe(true)
      expect(page.modified).toBe(!isPageModifiedBeforeChanges)
    })
  })
})
