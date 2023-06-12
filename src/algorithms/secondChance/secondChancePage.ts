import Page from "../../page"

class SecondChancePage extends Page {
  public used: boolean

  constructor(id: string) {
    super(id)

    this.used = true
  }
}

export default SecondChancePage
