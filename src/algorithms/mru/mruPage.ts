import Page from "../../page"

class MRUPage extends Page {
  public lastTimeUsed: number

  constructor(id: string, lastTimeUsed: number) {
    super(id)
    this.lastTimeUsed = lastTimeUsed
  }
}

export default MRUPage
