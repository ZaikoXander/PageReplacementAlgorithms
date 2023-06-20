import { faker } from "@faker-js/faker"

import LRU from "@src/algorithms/lru"
import LRUPage from "@src/algorithms/lru/lruPage"
import Page from "@src/page"

import DuplicatePageError from "@src/errors/duplicatePageError"
import PageNotFoundError from "@src/errors/pageNotFoundError"

//* yarn test:watch ./tests/algorithms/lru/index.spec.ts

describe('LRU algorithm expectations', () => {
  it('should be able to create a LRU instance', () => {
    const memorySize = faker.number.int(50)
    const lru = new LRU(memorySize)

    expect(lru).toBeTruthy()
    expect(lru).toBeInstanceOf(LRU)
  })

  describe('LRU memory expectations', () => {
    const memorySize = 4
    const lru = new LRU(memorySize)

    it('should be able to get memory data', () => {
      expect(lru.memory).toBeTruthy()
      expect(lru.memory).toBeInstanceOf(Array<LRUPage>)
      expect(lru.memory.length).toBe(0)
    })

    it('should be able to add pages', () => {
      const pageIds: string[] = []
      for (let i = 0; i < memorySize; i++) {
        pageIds.push(faker.string.alpha({
          casing: "upper",
          exclude: pageIds
        }))
      }

      pageIds.forEach(pageId => lru.addPageToMemory(new Page(pageId)))

      expect(lru.memory.length).toBe(memorySize)
      expect(lru.memory.length).toBe(pageIds.length)
      for (let i = 0; i < memorySize; i++) {
        expect(lru.memory[i].id).toBe(pageIds[i])
        expect(lru.memory[i].lastTimeUsed).toBe(i)
      }
    })

    it('should not be able to add pages with identical id', () => {
      const memoryBeforeChanges = lru.memory
      const memoryPageIds = memoryBeforeChanges.map(page => page.id)

      const pages: LRUPage[] = memoryPageIds.map((id, index) => new LRUPage(id, index))

      pages.forEach(page => {
        expect(() => lru.addPageToMemory(page)).toThrow(DuplicatePageError)
      })
      expect(lru.memory).toBe(memoryBeforeChanges)
    })

    it('should be able to use a page', () => {
      const memoryBeforeChanges = lru.memory.map(lruPage => new LRUPage(lruPage.id, lruPage.lastTimeUsed))

      const memoryPageIds = memoryBeforeChanges.map(page => page.id)

      for (let i = 0; i < memorySize; i++) {
        lru.usePage(memoryPageIds[i])
      }

      for (let i = 0; i < memorySize; i++) {
        expect(lru.memory[i].id).toBe(memoryBeforeChanges[i].id)
        expect(lru.memory[i].lastTimeUsed).not.toBe(memoryBeforeChanges[i].lastTimeUsed)
      }

      expect(lru.memory[0].lastTimeUsed).toBe(4)
      expect(lru.memory[1].lastTimeUsed).toBe(5)
      expect(lru.memory[2].lastTimeUsed).toBe(6)
      expect(lru.memory[3].lastTimeUsed).toBe(7)
    })

    it("should not be able to use a page that isn't in memory", () => {
      const memoryBeforeChanges = lru.memory
      const memoryPageIds: string[] = memoryBeforeChanges.map(page => page.id)

      const pageId = faker.string.alpha({
        casing: "upper",
        exclude: memoryPageIds
      })

      expect(() => lru.usePage(pageId)).toThrow(PageNotFoundError)
      expect(lru.memory).toBe(memoryBeforeChanges)
    })

    it('should be able to replace previous pages when memory is full', () => {
      const memoryBeforeChanges = lru.memory.map(lruPage => new LRUPage(lruPage.id, lruPage.lastTimeUsed))

      const memoryPageIds: string[] = memoryBeforeChanges.map(({ id }) => id)

      const pageIds: string[] = []
      for (let i = 0; i < memorySize; i++) {
        pageIds.push(faker.string.alpha({
          casing: "upper",
          exclude: [
            ...memoryPageIds,
            ...pageIds
          ]
        }))
      }

      lru.usePage(lru.memory[0].id)
      lru.addPageToMemory(new Page(pageIds[0]))

      lru.usePage(lru.memory[2].id)
      lru.addPageToMemory(new Page(pageIds[1]))

      lru.addPageToMemory(new Page(pageIds[2]))

      lru.usePage(lru.memory[1].id)
      lru.addPageToMemory(new Page(pageIds[3]))

      expect(lru.memory.length).toBe(memorySize)
      expect(lru.memory.length).toBe(pageIds.length)
      expect(lru.memory).not.toBe(memoryBeforeChanges)
      for (let i = 0; i < memorySize; i++) {
        expect(lru.memory[i]).not.toBe(memoryBeforeChanges[i])

        const lruPageIndex = lru.memory.findIndex(lruPage => lruPage.id === pageIds[i])
        expect(lruPageIndex).not.toBe(-1)
      }

      const lruPagesExpectedLastTimeUsed = [12, 13, 14, 11]
      const memoryPagesLastTimeUsed = lru.memory.map(({ lastTimeUsed }) => lastTimeUsed)
      expect(memoryPagesLastTimeUsed).toEqual(lruPagesExpectedLastTimeUsed)
    })
  })
})
