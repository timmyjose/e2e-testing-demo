import { expect, device, element, by } from 'detox'
import { beforeEach, beforeAll, describe, it } from '@jest/globals'
import { swipeIntros } from './swipeIntroSlider'

describe('Json Placeholder Screen', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true
    })
  })

  beforeEach(async () => {
    await device.reloadReactNative()

    // Swipe through the slider screens
    await swipeIntros()

    // go to the 'Add' screen
    const addButton = element(by.id('home-json-placeholder-button'))
    await addButton.tap()
  })

  describe('Add Screen elements should be visible', () => {
    it('Should have the \'Go Back\' button', async () => {
      const goBackButton = element(by.id('json-placeholder-go-back-button'))
      await expect(goBackButton).toBeVisible()
    })

    it('Should have the \'Fetch\' button', async () => {
      const fetchButton = element(by.id('json-placeholder-fetch-button'))
      await expect(fetchButton).toBeVisible()
    })
  })

  describe('Json Placeholder Screen operations', () => {
    it('Should go back to the Home Screen upon clicking the \'Go Back\' button', async () => {
      const goBackButton = element(by.id('json-placeholder-go-back-button'))
      await goBackButton.tap()

      const homeScreen = element(by.id('home-screen'))
      await expect(homeScreen).toExist()
    })

    it('Should fetch Json correctly', async () => {
      const fetchButton = element(by.id('json-placeholder-fetch-button'))
      const todoText = element(by.id('json-placeholder-todo-text'))

      await fetchButton.tap()

      const expectedTodoText = '{\n' +
      '  "userId": 1,\n' +
      '  "id": 1,\n' +
      '  "title": "delectus aut autem",\n' +
      '  "completed": false\n' +
      '}'

      await expect(todoText).toHaveText(expectedTodoText)
    })
  })
})
