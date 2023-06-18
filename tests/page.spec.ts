import { faker } from "@faker-js/faker"

import Page from "@src/page"

//* yarn test:watch ./tests/page.spec.ts

describe('Page expectations', () => {
  it('should be able to create a page', () => {
    const id = faker.string.alpha({
      casing: "upper"
    })
    const page = new Page(id)

    expect(page).toBeTruthy()
    expect(page).toBeInstanceOf(Page)
  })

  it('should be able to get page id', () => {
    const id = faker.string.alpha({
      casing: "upper"
    })
    const page = new Page(id)

    expect(page.id).toBeTruthy()
    expect(page.id).toBe(id)
    expect(typeof page.id).toBe("string")
  })
})
