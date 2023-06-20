import Page from "../page"

import DuplicatePageError from "../errors/duplicatePageError"

class FIFO {
  private _memory: Page[]
  private memorySize: number
  private pageReplacementIndex: number

  constructor(memorySize: number) {
    this._memory = new Array<Page>()
    this.memorySize = memorySize
    this.pageReplacementIndex = 0
  }

  public addPageToMemory(page: Page): void {
    if (this._memory.includes(page)) throw new DuplicatePageError(page.id)
    
    if (this._memory.length === this.memorySize) {
      this._memory[this.pageReplacementIndex] = page
      if (this.pageReplacementIndex === 3) {
        this.pageReplacementIndex = 0
        return
      }
      this.pageReplacementIndex++
      return
    }
    this._memory.push(page)
  }

  public get memory(): Page[] {
    return this._memory
  }
}

export default FIFO
