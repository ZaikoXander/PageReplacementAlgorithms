import { randomUUID } from "node:crypto"

class Page {
  private _id: string

  constructor(id: string) {
    this._id = id || randomUUID()
  }
  
  public get id(): string {
    return this._id
  }
}

export default Page