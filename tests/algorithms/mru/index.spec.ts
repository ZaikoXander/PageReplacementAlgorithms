import { faker } from "@faker-js/faker"

import MRU from "@src/algorithms/mru"
import MRUPage from "@src/algorithms/mru/mruPage"
import Page from "@src/page"

import DuplicatePageError from "@src/errors/duplicatePageError"
import PageNotFoundError from "@src/errors/pageNotFoundError"

//* yarn test:watch ./tests/algorithms/mru/index.spec.ts

describe('MRU algorithm expectations', () => {
  it('should be able to create a MRU instance', () => {
    const memorySize = faker.number.int(50)
    const mru = new MRU(memorySize)

    expect(mru).toBeTruthy()
    expect(mru).toBeInstanceOf(MRU)
  })

  describe('MRU memory expectations', () => {
    const memorySize = 4
    const mru = new MRU(memorySize)

    it('should be able to get memory data', () => {
      expect(mru.memory).toBeTruthy()
      expect(mru.memory).toBeInstanceOf(Array<MRUPage>)
      expect(mru.memory.length).toBe(0)
    })

    it('should be able to add pages', () => {
      const pageIds: string[] = []
      for (let i = 0; i < memorySize; i++) {
        pageIds.push(faker.string.alpha({
          casing: "upper",
          exclude: pageIds
        }))
      }
  
      pageIds.forEach(pageId => mru.addPageToMemory(new Page(pageId)))

      expect(mru.memory.length).toBe(memorySize)
      expect(mru.memory.length).toBe(pageIds.length)
      for (let i = 0; i < memorySize; i++) {
        expect(mru.memory[i].id).toBe(pageIds[i])
        expect(mru.memory[i].lastTimeUsed).toBe(i)
      }
    })

    it('should not be able to add pages with identical id', () => {
      const memoryBeforeChanges = mru.memory
      const memoryPageIds = memoryBeforeChanges.map(page => page.id)

      const pages: MRUPage[] = memoryPageIds.map((id, index) => new MRUPage(id, index))

      pages.forEach(page => {
        expect(() => mru.addPageToMemory(page)).toThrow(DuplicatePageError)
      })
      expect(mru.memory).toBe(memoryBeforeChanges)
    })

    it('should be able to use a page', () => {
      const memoryBeforeChanges = mru.memory.map(mruPage => new MRUPage(mruPage.id, mruPage.lastTimeUsed))
  
      const memoryPageIds = memoryBeforeChanges.map(page => page.id)
  
      for (let i = 0; i < memorySize; i++) {
        mru.usePage(memoryPageIds[i])
      }
      
      for (let i = 0; i < memorySize; i++) {
        expect(mru.memory[i].id).toBe(memoryBeforeChanges[i].id)
        expect(mru.memory[i].lastTimeUsed).not.toBe(memoryBeforeChanges[i].lastTimeUsed)
      }
  
      expect(mru.memory[0].lastTimeUsed).toBe(4)
      expect(mru.memory[1].lastTimeUsed).toBe(5)
      expect(mru.memory[2].lastTimeUsed).toBe(6)
      expect(mru.memory[3].lastTimeUsed).toBe(7)
    })

    it("should not be able to use a page that isn't in memory", () => {
      const memoryBeforeChanges = mru.memory
      const memoryPageIds: string[] = memoryBeforeChanges.map(page => page.id)

      const pageId = faker.string.alpha({
        casing: "upper",
        exclude: memoryPageIds
      })

      expect(() => mru.usePage(pageId)).toThrow(PageNotFoundError)
      expect(mru.memory).toBe(memoryBeforeChanges)
    })

    it('should be able to replace previous pages when memory is full', () => {
      const memoryBeforeChanges = mru.memory.map(mruPage => new MRUPage(mruPage.id, mruPage.lastTimeUsed))

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

      mru.addPageToMemory(new Page(pageIds[0]))
      mru.usePage(mru.memory[1].id)

      mru.addPageToMemory(new Page(pageIds[1]))
      mru.usePage(mru.memory[2].id)

      mru.addPageToMemory(new Page(pageIds[2]))
      mru.usePage(mru.memory[0].id)

      mru.addPageToMemory(new Page(pageIds[3]))

      expect(mru.memory.length).toBe(memorySize)
      expect(mru.memory.length).toBe(pageIds.length)
      expect(mru.memory).not.toBe(memoryBeforeChanges)
      for (let i = 0; i < memorySize; i++) {
        expect(mru.memory[i]).not.toBe(memoryBeforeChanges[i])
  
        const mruPageIndex = mru.memory.findIndex(mruPage => mruPage.id === pageIds[i])
        expect(mruPageIndex).not.toBe(-1)
      }

      const mruPagesExpectedLastTimeUsed = [14, 10, 12, 8]
      const memoryPagesLastTimeUsed = mru.memory.map(({ lastTimeUsed }) => lastTimeUsed)
      expect(memoryPagesLastTimeUsed).toEqual(mruPagesExpectedLastTimeUsed)
    })
  })
})
