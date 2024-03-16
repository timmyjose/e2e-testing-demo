import { expect, device, element, by } from 'detox'
import { beforeEach, beforeAll, describe, it } from '@jest/globals'
import { swipeIntros } from './swipeIntroSlider'

describe('Add Screen', () => {
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
    const addButton = element(by.id('home-add-button'))
    await addButton.tap()
  })

  describe('Add Screen elements should be visible', () => {
    it('Should have the \'Go Back\' button', async () => {
      const goBackButton = element(by.id('add-go-back-button'))
      await expect(goBackButton).toBeVisible()
    })

    it('Should have the textinputs for the two input numbers', async () => {
      const textInputX = element(by.id('add-textinput-x'))
      await expect(textInputX).toBeVisible()

      const textInputY = element(by.id('add-textinput-y'))
      await expect(textInputY).toBeVisible()
    })

    it('Should have the \'Add\' button', async () => {
      const addButton = element(by.id('add-add-button'))
      await expect(addButton).toBeVisible()
    })
  })

  describe('Add Screen operations', () => {
    it('Should go back to the Home Screen upon clicking the \'Go Back\' button', async () => {
      const goBackButton = element(by.id('add-go-back-button'))
      await goBackButton.tap()

      const homeScreen = element(by.id('home-screen'))
      await expect(homeScreen).toExist()
    })

    it('Should add numbers correctly', async () => {
      const textInputX = element(by.id('add-textinput-x'))
      const textInputY = element(by.id('add-textinput-y'))
      const addButton = element(by.id('add-add-button'))
      const addSumText = element(by.id('add-sum-text'))

      await textInputX.typeText('10')
      await textInputY.typeText('20')
      await addButton.tap()
      await expect(addSumText).toHaveText('30')
    })
  })
})
