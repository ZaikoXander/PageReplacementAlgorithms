import { faker } from "@faker-js/faker"

import Clock from "@src/algorithms/clock"
import ClockPage from "@src/algorithms/clock/clockPage"
import Page from "@src/page"

//* yarn test:watch ./tests/algorithms/clock/index.spec.ts

describe('Clock algorithm expectations', () => {
  it('should be able to create a Clock instance', () => {
    const memorySize = faker.number.int(50)
    const clock = new Clock(memorySize)

    expect(clock).toBeTruthy()
    expect(clock).toBeInstanceOf(Clock)
  })

  describe('Clock memory expectations', () => {
    const memorySize = 4
    const clock = new Clock(memorySize)

    it('should be able to get memory data', () => {
      expect(clock.memory).toBeTruthy()
      expect(clock.memory).toBeInstanceOf(Array<ClockPage>)
      expect(clock.memory.length).toBe(0)
    })

    it('should be able to add pages', () => {
      const pageIds: string[] = []
      for (let i = 0; i < memorySize; i++) {
        pageIds.push(faker.string.alpha({
          casing: "upper",
          exclude: pageIds
        }))
      }

      pageIds.forEach(pageId => clock.addPageToMemory(new Page(pageId)))

      expect(clock.memory.length).toBe(memorySize)
      expect(clock.memory.length).toBe(pageIds.length)
      for (let i = 0; i < memorySize; i++) {
        expect(clock.memory[i].id).toBe(pageIds[i])
        expect(clock.memory[i].used).toBe(true)
      }
    })

    it('should be able to use a page', () => {
      const memoryBeforeChanges = clock.memory.map(clockPage => new ClockPage(clockPage.id))

      const memoryPageIds = memoryBeforeChanges.map(page => page.id)

      const pageIndices: number[] = [0, 2, 3]
      pageIndices.forEach(index => clock.usePage(memoryPageIds[index]))

      expect(clock.memory).toStrictEqual(memoryBeforeChanges)
      for (let i = 0; i < memorySize; i++) {
        expect(clock.memory[i].id).toBe(memoryBeforeChanges[i].id)
        expect(clock.memory[i].used).toBe(memoryBeforeChanges[i].used)
      }

      expect(clock.memory[0].used).toBe(true)
      expect(clock.memory[1].used).toBe(true)
      expect(clock.memory[2].used).toBe(true)
      expect(clock.memory[3].used).toBe(true)
    })

    it('should be able to replace previous pages when memory is full', () => {
      const memoryBeforeChanges = clock.memory.map(clockPage => new ClockPage(clockPage.id))
  
      for (let i = 0; i < clock.memory.length; i++) {
        memoryBeforeChanges[i].used = clock.memory[i].used
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

      clock.addPageToMemory(new Page(pageIds[0]))
      clock.usePage(clock.memory[1].id)
      clock.usePage(clock.memory[3].id)

      clock.addPageToMemory(new Page(pageIds[1]))
      clock.usePage(clock.memory[0].id)

      clock.addPageToMemory(new Page(pageIds[2]))
      clock.usePage(clock.memory[0].id)
      clock.usePage(clock.memory[2].id)

      clock.addPageToMemory(new Page(pageIds[3]))

      expect(clock.memory.length).toBe(memorySize)
      expect(pageIds.length).toBe(memorySize)
      expect(clock.memory.length).toBe(pageIds.length)
      expect(clock.memory).not.toBe(memoryBeforeChanges)
      for (let i = 0; i < memorySize; i++) {
        expect(clock.memory[i]).not.toBe(memoryBeforeChanges[i])

        const clockPageIndex = clock.memory.findIndex(clockPage => clockPage.id === pageIds[i])
        expect(clockPageIndex).not.toBe(-1)
      }

      const clockPagesExpectedUsed = [true, false, false, true]
      const memoryPagesUsed = clock.memory.map(({ used }) => used)
      expect(memoryPagesUsed).toEqual(clockPagesExpectedUsed)
    })
  })
})
