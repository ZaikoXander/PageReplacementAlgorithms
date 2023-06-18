import { faker } from "@faker-js/faker"

import SecondChance from "@src/algorithms/secondChance"
import SecondChancePage from "@src/algorithms/secondChance/secondChancePage"
import Page from "@src/page"

//* yarn test:watch ./tests/algorithms/secondChance/index.spec.ts

describe('SecondChance algorithm expectations', () => {
  it('should be able to create a SecondChance instance', () => {
    const memorySize = faker.number.int(50)
    const sc = new SecondChance(memorySize)

    expect(sc).toBeTruthy()
    expect(sc).toBeInstanceOf(SecondChance)
  })

  describe('SecondChance memory expectations', () => {
    const memorySize = 4
    const sc = new SecondChance(memorySize)

    it('should be able to get memory data', () => {
      expect(sc.memory).toBeTruthy()
      expect(sc.memory).toBeInstanceOf(Array<SecondChancePage>)
      expect(sc.memory.length).toBe(0)
    })

    it('should be able to add pages', () => {
      const pageIds: string[] = []
      for (let i = 0; i < memorySize; i++) {
        pageIds.push(faker.string.alpha({
          casing: "upper",
          exclude: pageIds
        }))
      }

      pageIds.forEach(pageId => sc.addPageToMemory(new Page(pageId)))

      expect(sc.memory.length).toBe(memorySize)
      expect(sc.memory.length).toBe(pageIds.length)
      for (let i = 0; i < memorySize; i++) {
        expect(sc.memory[i].id).toBe(pageIds[i])
        expect(sc.memory[i].used).toBe(true)
      }
    })

    it('should be able to use a page', () => {
      const memoryBeforeChanges = sc.memory.map(scPage => new SecondChancePage(scPage.id))

      const memoryPageIds = memoryBeforeChanges.map(page => page.id)

      const pageIndices: number[] = [0, 2, 3]
      pageIndices.forEach(index => sc.usePage(memoryPageIds[index]))

      expect(sc.memory).toStrictEqual(memoryBeforeChanges)
      for (let i = 0; i < memorySize; i++) {
        expect(sc.memory[i].id).toBe(memoryBeforeChanges[i].id)
        expect(sc.memory[i].used).toBe(memoryBeforeChanges[i].used)
      }

      expect(sc.memory[0].used).toBe(true)
      expect(sc.memory[1].used).toBe(true)
      expect(sc.memory[2].used).toBe(true)
      expect(sc.memory[3].used).toBe(true)
    })

    it('should be able to replace previous pages when memory is full', () => {
      const memoryBeforeChanges = sc.memory.map(clockPage => new SecondChancePage(clockPage.id))
  
      for (let i = 0; i < sc.memory.length; i++) {
        memoryBeforeChanges[i].used = sc.memory[i].used
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

      sc.addPageToMemory(new Page(pageIds[0]))
      sc.addPageToMemory(new Page(pageIds[1]))

      sc.usePage(sc.memory[0].id)

      sc.addPageToMemory(new Page(pageIds[2]))
      sc.addPageToMemory(new Page(pageIds[3]))

      expect(sc.memory.length).toBe(memorySize)
      expect(pageIds.length).toBe(memorySize)
      expect(sc.memory.length).toBe(pageIds.length)
      expect(sc.memory).not.toBe(memoryBeforeChanges)
      for (let i = 0; i < memorySize; i++) {
        expect(sc.memory[i]).not.toBe(memoryBeforeChanges[i])

        const clockPageIndex = sc.memory.findIndex(clockPage => clockPage.id === pageIds[i])
        expect(clockPageIndex).not.toBe(-1)
      }

      const scPagesExpectedUsed = [true, false, false, true]
      const memoryPagesUsed = sc.memory.map(({ used }) => used)
      expect(memoryPagesUsed).toEqual(scPagesExpectedUsed)
    })
  })
})
