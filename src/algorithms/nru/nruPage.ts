import Page from "../../page"

class NRUPage extends Page {
  public lastTimeUsed: number
  public modified: boolean

  constructor(id: string, lastTimeUsed: number) {
    super(id)
    this.lastTimeUsed = lastTimeUsed
    this.modified = false
  } 
}

export default NRUPage
