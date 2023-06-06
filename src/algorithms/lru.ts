import Page from "../page";

interface ILRUPage {
  page: Page,
  lastTimeUsed: number
}

class LRU {
  private _memory: ILRUPage[]
  private memorySize: number
  private time: number

  constructor(memorySize: number) {
    this._memory = new Array<ILRUPage>
    this.memorySize = memorySize
    this.time = 0
  }

  public addPageToMemory(page: Page): void {
    const isPageAlreadyAdded = this._memory.find(lruPage => lruPage.page.id === page.id) ? true : false

    if (isPageAlreadyAdded) {
      console.error(`ERROR: This page with id \`${page.id}\` was already added.`)
      return
    }
    if (this._memory.length === this.memorySize) {
      const lowestLastTimeUsed: number = this._memory.reduce((min, current) => Math.min(min, current.lastTimeUsed), this._memory[0].lastTimeUsed)

      const leastRecentlyUsedPageIndex: number = this._memory.findIndex(lruPage => lruPage.lastTimeUsed === lowestLastTimeUsed)

      this._memory[leastRecentlyUsedPageIndex] = { page, lastTimeUsed: this.time }
      this.time++
      return
    }
    this._memory.push({ page, lastTimeUsed: this.time })
    this.time++
  }

  public usePage(pageId: string): void {
    const pageIndex = this._memory.findIndex(lruPage => lruPage.page.id === pageId)

    if (pageIndex === -1) {
      console.error(`ERROR: Page with id \`${pageId}\` not found.`)
      return
    }

    this._memory[pageIndex].lastTimeUsed = this.time
    this.time++
  }
  
  public get memory(): ILRUPage[] {
    return this._memory
  }
}

export default LRU
