import { faker } from "@faker-js/faker"

import NRU from "@src/algorithms/nru"
import NRUPage from "@src/algorithms/nru/nruPage"
import Page from "@src/page"

//* yarn test:watch ./tests/algorithms/nru.spec.ts

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
  
    it('should be able to add pages', () => {
      const pageIds: string[] = []
      for (let i = 0; i < memorySize; i++) {
        pageIds.push(faker.string.alpha({
          casing: "upper",
          exclude: pageIds
        }))
      }
  
      pageIds.forEach(pageId => nru.addPageToMemory(new Page(pageId)))
  
      expect(memorySize).toBe(nru.memory.length)
      expect(memorySize).toBe(pageIds.length)
      expect(pageIds.length).toBe(nru.memory.length)
      for (let i = 0; i < memorySize; i++) {
        expect(nru.memory[i].id).toBe(pageIds[i])
        expect(nru.memory[i].lastTimeUsed).toBe(i)
        expect(nru.memory[i].modified).toBe(false)
      }
    })
  
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
          exclude: [...memoryPageIds, ...pageIds]
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
  
      expect(memorySize).toBe(nru.memory.length)
      expect(memorySize).toBe(pageIds.length)
      expect(pageIds.length).toBe(nru.memory.length)
      expect(memoryBeforeChanges).not.toBe(nru.memory)
      for (let i = 0; i < memorySize; i++) {
        expect(memoryBeforeChanges[i]).not.toBe(nru.memory[i])
  
        const nruPageIndex = nru.memory.findIndex(nruPage => nruPage.id === pageIds[i])
        expect(nruPageIndex).not.toBe(-1)
      }
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
      const memoryPageProperties = nru.memory.map(({ lastTimeUsed, modified }) => ({ lastTimeUsed, modified}))
      const nruPagesExpectedPropertiesToObjectFormat = nruPagesExpectedProperties.map(([lastTimeUsed, modified]) => ({
        lastTimeUsed,
        modified
      }))
      expect(memoryPageProperties).toEqual(nruPagesExpectedPropertiesToObjectFormat)
  
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
