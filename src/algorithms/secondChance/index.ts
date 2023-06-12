import Page from "../../page"
import SecondChancePage from "./secondChancePage"

class SecondChance {
  private memorySize: number
  private _memory: SecondChancePage[]

  constructor(memorySize: number) {
    this.memorySize = memorySize
    this._memory = new Array<SecondChancePage>()
  }

  public addPageToMemory(page: Page): void {
    const isPageAlreadyAdded = this._memory.find(clockPage => clockPage.id === page.id) ? true : false

    if (isPageAlreadyAdded) {
      console.error(`Error: This page with id \`${page.id}\` was already added.`)
      return
    }

    if (this._memory.length === this.memorySize) {
      while (true) {
        const actualPage = this._memory[0]

        if (!actualPage.used) {
          this._memory.splice(0, 1)
          this._memory.push(new SecondChancePage(page.id))
          break
        } else {
          actualPage.used = false
          this._memory.splice(0, 1)
          this._memory.push(actualPage)
        }
      }
      return
    }

    this._memory.push(new SecondChancePage(page.id))
  }

  public usePage(pageId: string): void {
    const pageIndex = this._memory.findIndex(clockPage => clockPage.id === pageId)

    if (pageIndex === -1) {
      console.error(`Error: Page with id \`${pageId}\` not found.`)
      return
    }

    this._memory[pageIndex].used = true
  }

  public get memory(): SecondChancePage[] {
    return this._memory
  }
}

export default SecondChance
