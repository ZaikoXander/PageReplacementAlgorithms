import Page from "../../page"
import NRUPage from "./nruPage"

class NRU {
  private memorySize: number
  private recentUsageTimeThreshold: number
  private _memory: NRUPage[]
  private time: number

  constructor(memorySize: number, recentUsageTimeThreshold: number) {
    this.memorySize = memorySize
    this.recentUsageTimeThreshold = recentUsageTimeThreshold
    this._memory = new Array<NRUPage>()
    this.time = 0
  }

  private findNotUsedRecentlyAndNotModifiedPages(): NRUPage[] {
    const notUsedRecentlyAndNotModifiedPages = this._memory.filter(nruPage => {
      const idleTime = this.time - nruPage.lastTimeUsed
      const isPageNotUsedRecently = !(idleTime <= this.recentUsageTimeThreshold)

      return isPageNotUsedRecently && !nruPage.modified
    })

    return notUsedRecentlyAndNotModifiedPages
  }

  private findNotUsedRecentlyAndModifiedPages(): NRUPage[] {
    const notUsedRecentlyAndModifiedPages = this._memory.filter(nruPage => {
      const idleTime = this.time - nruPage.lastTimeUsed
      const isPageNotUsedRecently = !(idleTime <= this.recentUsageTimeThreshold)

      return isPageNotUsedRecently && nruPage.modified
    })

    return notUsedRecentlyAndModifiedPages
  }

  private findUsedRecentlyAndNotModifiedPages(): NRUPage[] {
    const usedRecentlyAndNotModifiedPages = this._memory.filter(nruPage => {
      const idleTime = this.time - nruPage.lastTimeUsed
      const isPageUsedRecently = (idleTime <= this.recentUsageTimeThreshold)

      return isPageUsedRecently && !nruPage.modified
    })

    return usedRecentlyAndNotModifiedPages
  }

  private findUsedRecentlyAndModifiedPages(): NRUPage[] {
    const usedRecentlyAndModifiedPages = this._memory.filter(nruPage => {
      const idleTime = this.time - nruPage.lastTimeUsed
      const isPageUsedRecently = (idleTime <= this.recentUsageTimeThreshold)

      return isPageUsedRecently && nruPage.modified
    })

    return usedRecentlyAndModifiedPages
  }

  private findPageIndexById(pageId: string): number {
    return this._memory.findIndex(nruPage => nruPage.id === pageId)
  }

  public addPageToMemory(page: Page): void {
    const isPageAlreadyAdded = this._memory.find(nruPage => nruPage.id === page.id) ? true : false

    if (isPageAlreadyAdded) {
      console.error(`Error: This page with id \`${page.id}\` was already added.`)
      return
    }
    if (this._memory.length === this.memorySize) {
      const notUsedRecentlyAndNotModifiedPages = this.findNotUsedRecentlyAndNotModifiedPages()
      if (notUsedRecentlyAndNotModifiedPages.length > 0) {
        const randomNotUsedRecentlyAndNotModifiedPageIndex = Math.floor(Math.random() * notUsedRecentlyAndNotModifiedPages.length)

        const pageIndexInMemory = this.findPageIndexById(notUsedRecentlyAndNotModifiedPages[randomNotUsedRecentlyAndNotModifiedPageIndex].id)

        this._memory[pageIndexInMemory] = new NRUPage(page.id, this.time)
        this.time++
        return
      }

      const notUsedRecentlyAndModifiedPages = this.findNotUsedRecentlyAndModifiedPages()
      if (notUsedRecentlyAndModifiedPages.length > 0) {
        const randomNotUsedRecentlyAndModifiedPageIndex = Math.floor(Math.random() * notUsedRecentlyAndModifiedPages.length)

        const pageIndexInMemory = this.findPageIndexById(notUsedRecentlyAndModifiedPages[randomNotUsedRecentlyAndModifiedPageIndex].id)

        this._memory[pageIndexInMemory] = new NRUPage(page.id, this.time)
        this.time++
        return
      }

      const usedRecentlyAndNotModifiedPages = this.findUsedRecentlyAndNotModifiedPages()
      if (usedRecentlyAndNotModifiedPages.length > 0) {
        const randomUsedRecentlyAndNotModifiedPageIndex = Math.floor(Math.random() * usedRecentlyAndNotModifiedPages.length)

        const pageIndexInMemory = this.findPageIndexById(usedRecentlyAndNotModifiedPages[randomUsedRecentlyAndNotModifiedPageIndex].id)

        this._memory[pageIndexInMemory] = new NRUPage(page.id, this.time)
        this.time++
        return
      }

      const usedRecentlyAndModifiedPages = this.findUsedRecentlyAndModifiedPages()
      if (usedRecentlyAndModifiedPages.length > 0) {
        const randomUsedRecentlyAndModifiedPageIndex = Math.floor(Math.random() * usedRecentlyAndModifiedPages.length)

        const pageIndexInMemory = this.findPageIndexById(usedRecentlyAndModifiedPages[randomUsedRecentlyAndModifiedPageIndex].id)

        this._memory[pageIndexInMemory] = new NRUPage(page.id, this.time)
        this.time++
      }
      return
    }

    this._memory.push(new NRUPage(page.id, this.time))
    this.time++
  }

  public usePage(pageId: string): void {
    const pageIndex = this.findPageIndexById(pageId)

    if (pageIndex === -1) {
      console.error(`Error: Page with id \`${pageId}\` not found.`)
      return
    }

    this._memory[pageIndex].lastTimeUsed = this.time
    this.time++
  }

  public modifyPage(pageId: string): void {
    const pageIndex = this.findPageIndexById(pageId)

    if (pageIndex === -1) {
      console.error(`Error: Page with id \`${pageId}\` not found.`)
      return
    }

    this._memory[pageIndex].modified = true
  }

  public get memory(): NRUPage[] {
    return this._memory
  }
}

export default NRU
