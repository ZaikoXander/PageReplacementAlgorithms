import { faker } from "@faker-js/faker"

import ClockPage from "@src/algorithms/clock/clockPage"

//* yarn test:watch ./tests/algorithms/clock/clockPage.spec.ts

describe('Clock Page expectations', () => {
  it('should be able to create a page instance', () => {
    const id = faker.string.alpha({
      casing: "upper"
    })
    const page = new ClockPage(id)

    expect(page).toBeTruthy()
    expect(page).toBeInstanceOf(ClockPage)
  })

  const id = faker.string.alpha({
    casing: "upper"
  })
  const page = new ClockPage(id)

  it('should be able to get page id', () => {
    expect(page.id).toBeTruthy()
    expect(page.id).toBe(id)
    expect(typeof page.id).toBe("string")
  })

  describe('Page `used` property expectations', () => {
    it('should be able to get page `used` property', () => {
      expect(page.used).toBeTruthy()
      expect(page.used).toBe(true)
      expect(typeof page.used).toBe("boolean")
    })
  
    it('should be able to set page `used` property', () => {
      const isPageUsedBeforeChanges = page.used
  
      page.used = false
  
      expect(page.used).not.toBe(isPageUsedBeforeChanges)
      expect(page.used).toBe(false)
      expect(page.used).toBe(!isPageUsedBeforeChanges)
    })
  })
})
