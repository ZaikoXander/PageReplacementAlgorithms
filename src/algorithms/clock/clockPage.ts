import Page from "../../page"

class ClockPage extends Page {
  public used: boolean

  constructor(id: string) {
    super(id)

    this.used = true
  }
}

export default ClockPage
