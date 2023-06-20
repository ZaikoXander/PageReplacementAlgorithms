import Page from "../../page"
import MRUPage from "./mruPage"

import DuplicatePageError from "../../errors/duplicatePageError"
import PageNotFoundError from "../../errors/pageNotFoundError"

class MRU {
  private _memory: MRUPage[]
  private memorySize: number
  private time: number

  constructor(memorySize: number) {
    this._memory = new Array<MRUPage>()
    this.memorySize = memorySize
    this.time = 0
  }

  public addPageToMemory(page: Page): void {
    const isPageAlreadyAdded = this._memory.find(mruPage => mruPage.id === page.id) ? true : false

    if (isPageAlreadyAdded) throw new DuplicatePageError(page.id)
    if (this._memory.length === this.memorySize) {
      const highestLastTimeUsed: number = this._memory.reduce((max, current) => Math.max(max, current.lastTimeUsed), this._memory[0].lastTimeUsed)

      const mostRecentlyUsedPageIndex: number = this._memory.findIndex(mruPage => mruPage.lastTimeUsed === highestLastTimeUsed)

      this._memory[mostRecentlyUsedPageIndex] = new MRUPage(page.id, this.time)
      this.time++
      return
    }

    this._memory.push(new MRUPage(page.id, this.time))
    this.time++
  }

  public usePage(pageId: string): void {
    const pageIndex = this._memory.findIndex(mruPage => mruPage.id === pageId)

    if (pageIndex === -1) throw new PageNotFoundError(pageId)

    this._memory[pageIndex].lastTimeUsed = this.time
    this.time++
  }

  public get memory(): MRUPage[] {
    return this._memory
  }
}

export default MRU
