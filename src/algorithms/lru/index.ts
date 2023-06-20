import Page from "../../page"
import LRUPage from "./lruPage"

import DuplicatePageError from "../../errors/duplicatePageError"
import PageNotFoundError from "../../errors/pageNotFoundError"

class LRU {
  private _memory: LRUPage[]
  private memorySize: number
  private time: number

  constructor(memorySize: number) {
    this._memory = new Array<LRUPage>()
    this.memorySize = memorySize
    this.time = 0
  }

  public addPageToMemory(page: Page): void {
    const isPageAlreadyAdded = this._memory.find(lruPage => lruPage.id === page.id) ? true : false

    if (isPageAlreadyAdded) throw new DuplicatePageError(page.id)

    if (this._memory.length === this.memorySize) {
      const lowestLastTimeUsed: number = this._memory.reduce((min, current) => Math.min(min, current.lastTimeUsed), this._memory[0].lastTimeUsed)

      const leastRecentlyUsedPageIndex: number = this._memory.findIndex(lruPage => lruPage.lastTimeUsed === lowestLastTimeUsed)

      this._memory[leastRecentlyUsedPageIndex] = new LRUPage(page.id, this.time)
      this.time++
      return
    }

    this._memory.push(new LRUPage(page.id, this.time))
    this.time++
  }

  public usePage(pageId: string): void {
    const pageIndex = this._memory.findIndex(lruPage => lruPage.id === pageId)

    if (pageIndex === -1) throw new PageNotFoundError(pageId)

    this._memory[pageIndex].lastTimeUsed = this.time
    this.time++
  }
  
  public get memory(): LRUPage[] {
    return this._memory
  }
}

export default LRU
