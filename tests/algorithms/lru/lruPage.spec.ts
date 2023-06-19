import { faker } from "@faker-js/faker"

import LRUPage from "@src/algorithms/lru/lruPage"

//* yarn test:watch ./tests/algorithms/lru/lruPage.spec.ts

describe('LRU Page expectations', () => {
  it('should be able to create a page instance', () => {
    const id = faker.string.alpha({
      casing: "upper"
    })
    const lastTimeUsed = faker.number.int(30)
    const page = new LRUPage(id, lastTimeUsed)

    expect(page).toBeTruthy()
    expect(page).toBeInstanceOf(LRUPage)
  })

  const id = faker.string.alpha({
    casing: "upper"
  })
  const lastTimeUsed = faker.number.int(30)
  const page = new LRUPage(id, lastTimeUsed)

  it('should be able to get page id', () => {
    expect(page.id).toBeTruthy()
    expect(page.id).toBe(id)
    expect(typeof page.id).toBe("string")
  })

  describe('Page lastTimeUsed expectations', () => {
    it('should be able to get page lastTimeUsed', () => {
      expect(page.lastTimeUsed).toBeTruthy()
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
