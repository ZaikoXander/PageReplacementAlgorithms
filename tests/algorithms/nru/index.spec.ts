import { faker } from "@faker-js/faker"

import NRU from "@src/algorithms/nru"
import NRUPage from "@src/algorithms/nru/nruPage"
import Page from "@src/page"

import DuplicatePageError from "@src/errors/duplicatePageError"
import PageNotFoundError from "@src/errors/pageNotFoundError"

//* yarn test:watch ./tests/algorithms/nru/index.spec.ts

describe('NRU algorithm expectations', () => {
  it('should be able to create a NRU instance', () => {
    const memorySize = faker.number.int(50)
    const recentUsageTimeThreshold = faker.number.int(20)
    const nru = new NRU(memorySize, recentUsageTimeThreshold)

    expect(nru).toBeTruthy()
    expect(nru).toBeInstanceOf(NRU)
  })

  describe('NRU memory expectations', () => {
    const memorySize = 4
    const recentUsageTimeThreshold = 10
    const nru = new NRU(memorySize, recentUsageTimeThreshold)

    it('should be able to get memory data', () => {
      expect(nru.memory).toBeTruthy()
      expect(nru.memory).toBeInstanceOf(Array<NRUPage>)
      expect(nru.memory.length).toBe(0)
    })
  
    describe('Add pages expectations', () => {
      it('should be able to add pages', () => {
        const pageIds: string[] = []
        for (let i = 0; i < memorySize; i++) {
          pageIds.push(faker.string.alpha({
            casing: "upper",
            exclude: pageIds
          }))
        }
    
        pageIds.forEach(pageId => nru.addPageToMemory(new Page(pageId)))
    
        expect(nru.memory.length).toBe(memorySize)
        expect(nru.memory.length).toBe(pageIds.length)
        for (let i = 0; i < memorySize; i++) {
          expect(nru.memory[i].id).toBe(pageIds[i])
          expect(nru.memory[i].lastTimeUsed).toBe(i)
          expect(nru.memory[i].modified).toBe(false)
        }
      })
  
      it('should not be able to add pages with identical id', () => {
        const memoryBeforeChanges = nru.memory
        const memoryPageIds = memoryBeforeChanges.map(page => page.id)
  
        const pages: NRUPage[] = memoryPageIds.map((id, index) => new NRUPage(id, index))
  
        pages.forEach(page => {
          expect(() => nru.addPageToMemory(page)).toThrow(DuplicatePageError)
        })
        expect(nru.memory).toBe(memoryBeforeChanges)
      })
    })
  
    describe('Use page expectations', () => {
      it('should be able to use a page', () => {
        const memoryBeforeChanges = nru.memory.map(nruPage => new NRUPage(nruPage.id, nruPage.lastTimeUsed))
    
        const memoryPageIds = memoryBeforeChanges.map(page => page.id)
    
        const pageIndices: number[] = [0, 2, 3]
        pageIndices.forEach(index => nru.usePage(memoryPageIds[index]))
    
        for (let i = 0; i < memorySize; i++) {
          expect(nru.memory[i].id).toBe(memoryBeforeChanges[i].id)
          expect(nru.memory[i].modified).toBe(memoryBeforeChanges[i].modified)
          if (i === 1) {
            expect(nru.memory[i].lastTimeUsed).toBe(memoryBeforeChanges[i].lastTimeUsed)
            continue
          }
          expect(nru.memory[i].lastTimeUsed).not.toBe(memoryBeforeChanges[i].lastTimeUsed)
        }
    
        expect(nru.memory[0].lastTimeUsed).toBe(4)
        expect(nru.memory[1].lastTimeUsed).toBe(1)
        expect(nru.memory[2].lastTimeUsed).toBe(5)
        expect(nru.memory[3].lastTimeUsed).toBe(6)
      })
  
      it("should not be able to use a page that isn't in memory", () => {
        const memoryBeforeChanges = nru.memory
        const memoryPageIds: string[] = memoryBeforeChanges.map(page => page.id)
  
        const pageId = faker.string.alpha({
          casing: "upper",
          exclude: memoryPageIds
        })
  
        expect(() => nru.usePage(pageId)).toThrow(PageNotFoundError)
        expect(nru.memory).toBe(memoryBeforeChanges)
      })
    })

    describe('Modify page expectations', () => {
      it('should be able to modify a page', () => {
        const memoryBeforeChanges = nru.memory.map(nruPage => new NRUPage(nruPage.id, nruPage.lastTimeUsed))
    
        const memoryPageIds = memoryBeforeChanges.map(page => page.id)
    
        const pageIndices: number[] = [0, 2, 3]
        pageIndices.forEach(index => nru.modifyPage(memoryPageIds[index]))
    
        expect(memoryBeforeChanges).not.toBe(nru.memory)
        expect(nru.memory[1].modified).toBe(false)
        pageIndices.forEach(index => {
          expect(nru.memory[index].modified).toBe(true)
        })
      })
  
      it("should not be able to modify a page that isn't in memory", () => {
        const memoryBeforeChanges = nru.memory
        const memoryPageIds: string[] = memoryBeforeChanges.map(page => page.id)
  
        const pageId = faker.string.alpha({
          casing: "upper",
          exclude: memoryPageIds
        })
  
        expect(() => nru.modifyPage(pageId)).toThrow(PageNotFoundError)
        expect(nru.memory).toBe(memoryBeforeChanges)
      })
    })
  
    it('should be able to replace previous pages when memory is full', () => {
      const memoryBeforeChanges = nru.memory.map(nruPage => new NRUPage(nruPage.id, nruPage.lastTimeUsed))
  
      for (let i = 0; i < nru.memory.length; i++) {
        memoryBeforeChanges[i].modified = nru.memory[i].modified
      }
  
      const memoryPageIds = memoryBeforeChanges.map(page => page.id)
  
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
  
      nru.addPageToMemory(new Page(pageIds[0]))
      nru.modifyPage(pageIds[0])
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          nru.usePage(nru.memory[j].id)        
        }
      }
  
      nru.addPageToMemory(new Page(pageIds[1]))
      nru.modifyPage(pageIds[1])
      for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
          nru.usePage(nru.memory[j].id)        
        }
      }
      
      nru.addPageToMemory(new Page(pageIds[2]))
      nru.modifyPage(pageIds[2])
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          if (j === 2) {
            continue
          }
          nru.usePage(nru.memory[j].id)        
        }
      }
  
      nru.addPageToMemory(new Page(pageIds[3]))
  
      expect(nru.memory.length).toBe(memorySize)
      expect(pageIds.length).toBe(memorySize)
      expect(nru.memory.length).toBe(pageIds.length)
      expect(nru.memory).not.toBe(memoryBeforeChanges)
      for (let i = 0; i < memorySize; i++) {
        expect(nru.memory[i]).not.toBe(memoryBeforeChanges[i])
  
        const nruPageIndex = nru.memory.findIndex(nruPage => nruPage.id === pageIds[i])
        expect(nruPageIndex).not.toBe(-1)
      }

      const nruPagesExpectedModified = [true, true, false, true]
      const memoryPagesModified = nru.memory.map(({ modified }) => modified)
      expect(memoryPagesModified).toEqual(nruPagesExpectedModified)
    })
  
    it('should be able to have pages of all categories', () => {
      const nru = new NRU(memorySize, recentUsageTimeThreshold)
  
      const pageIds: string[] = []
      for (let i = 0; i < (memorySize + 1); i++) {
        pageIds.push(faker.string.alpha({
          casing: "upper",
          exclude: pageIds
        }))
      }
  
      nru.addPageToMemory(new Page(pageIds[0]))
      nru.addPageToMemory(new Page(pageIds[1]))
      nru.addPageToMemory(new Page(pageIds[2]))
      nru.addPageToMemory(new Page(pageIds[3]))
  
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 2; j++) {
          nru.usePage(pageIds[j])
        }
      }
  
      nru.modifyPage(pageIds[0])
      nru.modifyPage(pageIds[2])
  
      const nruPagesExpectedProperties = [[22, true], [23, false], [2, true], [3, false]]
      const memoryPagesProperties = nru.memory.map(({ lastTimeUsed, modified }) => [lastTimeUsed, modified])
      expect(memoryPagesProperties).toEqual(nruPagesExpectedProperties)
  
      const memoryBeforeReplacement = nru.memory.map(nruPage => new NRUPage(nruPage.id, nruPage.lastTimeUsed))
  
      for (let i = 0; i < nru.memory.length; i++) {
        memoryBeforeReplacement[i].modified = nru.memory[i].modified
      }
  
      nru.addPageToMemory(new Page(pageIds[4]))
  
      for (let i = 0; i < 3; i++) {
        expect(nru.memory[i]).toStrictEqual(memoryBeforeReplacement[i])
        expect(nru.memory[i].id).toBe(pageIds[i])
      }
      expect(nru.memory[3].id).toBe(pageIds[4])
      expect(memoryBeforeReplacement).not.toBe(nru.memory)
      expect(nru.memory[3]).not.toBe(memoryBeforeReplacement[3])
    })
  })
})
