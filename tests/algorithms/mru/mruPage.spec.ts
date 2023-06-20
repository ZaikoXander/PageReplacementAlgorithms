import { faker } from "@faker-js/faker"

import MRUPage from "@src/algorithms/mru/mruPage"

//* yarn test:watch ./tests/algorithms/mru/mruPage.spec.ts

describe('MRU Page expectations', () => {
  it('should be able to create a page instance', () => {
    const id = faker.string.alpha({
      casing: "upper"
    })
    const lastTimeUsed = faker.number.int(30)
    const page = new MRUPage(id, lastTimeUsed)

    expect(page).toBeTruthy()
    expect(page).toBeInstanceOf(MRUPage)
  })

  const id = faker.string.alpha({
    casing: "upper"
  })
  const lastTimeUsed = faker.number.int(30)
  const page = new MRUPage(id, lastTimeUsed)

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
})
