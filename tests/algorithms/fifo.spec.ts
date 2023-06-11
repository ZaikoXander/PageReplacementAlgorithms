import { faker } from "@faker-js/faker"

import FIFO from "@src/algorithms/fifo"
import Page from "@src/page"

//* yarn test:watch ./tests/algorithms/fifo.spec.ts

describe('FIFO algorithm expectations', () => {
  it('should be able to create a FIFO instance', () => {
    const memorySize = faker.number.int(50)

    const fifo = new FIFO(memorySize)

    expect(fifo).toBeTruthy()
    expect(fifo).toBeInstanceOf(FIFO)
  })

  const memorySize = 4
  const fifo = new FIFO(memorySize)

  describe('FIFO memory expectations', () => {
    it('should be able to get memory data', () => {
      expect(fifo.memory).toBeTruthy()
      expect(fifo.memory).toBeInstanceOf(Array<Page>)
      expect(fifo.memory.length).toBe(0)
    })
  
    it('should be able to add pages', () => {
      const pagesId: string[] = []
      for (let i = 0; i < memorySize; i++) {
        pagesId.push(faker.string.alpha({ casing: "upper", exclude: pagesId }))
      }
  
      pagesId.forEach(pageId => fifo.addPageToMemory(new Page(pageId)))
  
      expect(memorySize).toBe(fifo.memory.length)
      expect(memorySize).toBe(pagesId.length)
      expect(pagesId.length).toBe(fifo.memory.length)
      for (let i = 0; i < memorySize; i++) {
        expect(fifo.memory[i].id).toBe(pagesId[i])      
      }
    })
  
    it('should be able to replace previous pages when memory is full', () => {
      const previousMemory: Page[] = [...fifo.memory]
      const previousPagesId = previousMemory.map(page => page.id)
      const pagesId: string[] = []
      for (let i = 0; i < memorySize; i++) {
        pagesId.push(faker.string.alpha({ casing: "upper", exclude: [...previousPagesId, ...pagesId] }))
      }
  
      pagesId.forEach(pageId => fifo.addPageToMemory(new Page(pageId)))
  
      expect(memorySize).toBe(fifo.memory.length)
      expect(memorySize).toBe(pagesId.length)
      expect(pagesId.length).toBe(fifo.memory.length)
      expect(previousMemory).not.toEqual(fifo.memory)
      for (let i = 0; i < memorySize; i++) {
        expect(previousMemory[i]).not.toEqual(fifo.memory[i])
        expect(fifo.memory[i].id).toBe(pagesId[i])      
      }
    })
  })
})
