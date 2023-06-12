import Page from "../../page"
import ClockPage from "./clockPage"

class Clock {
  private memorySize: number
  private _memory: ClockPage[]
  private index: number

  constructor(memorySize: number) {
    this.memorySize = memorySize
    this._memory = new Array<ClockPage>()
    this.index = 0
  }

  public addPageToMemory(page: Page): void {
    const isPageAlreadyAdded = this._memory.find(clockPage => clockPage.id === page.id) ? true : false

    if (isPageAlreadyAdded) {
      console.error(`Error: This page with id \`${page.id}\` was already added.`)
      return
    }

    if (this._memory.length === this.memorySize) {
      while (true) {
        const actualPage = this._memory[this.index]

        if (!actualPage.used) {
          this._memory[this.index] = new ClockPage(page.id)
          break
        } else {
          actualPage.used = false
          this.index = (this.index + 1) % this.memorySize
        }
      }
      return
    }

    this._memory.push(new ClockPage(page.id))
  }

  public usePage(pageId: string): void {
    const pageIndex = this._memory.findIndex(clockPage => clockPage.id === pageId)

    if (pageIndex === -1) {
      console.error(`Error: Page with id \`${pageId}\` not found.`)
      return
    }

    this._memory[pageIndex].used = true
  }

  public get memory(): ClockPage[] {
    return this._memory
  }
}

export default Clock
