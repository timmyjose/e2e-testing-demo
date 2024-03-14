import { expect, device, element, by } from 'detox'
import { beforeEach, beforeAll, describe, it } from '@jest/globals'

describe('Div Screen', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true
    })
  })

  beforeEach(async () => {
    await device.reloadReactNative()

    // go to the 'Div' screen
    const divButton = element(by.id('home-div-button'))
    await divButton.tap()
  })

  describe('Div Screen elements should be visible', () => {
    it('Should have the \'Go Back\' button', async () => {
      const goBackButton = element(by.id('div-go-back-button'))
      await expect(goBackButton).toBeVisible()
    })

    it('Should have the textinputs for the two input numbers', async () => {
      const textInputX = element(by.id('div-textinput-x'))
      await expect(textInputX).toBeVisible()

      const textInputY = element(by.id('div-textinput-y'))
      await expect(textInputY).toBeVisible()
    })

    it('Should have the \'Div\' button', async () => {
      const divButton = element(by.id('div-div-button'))
      await expect(divButton).toBeVisible()
    })
  })

  describe('Div Screen operations', () => {
    it('Should go back to the Home Screen upon clicking the \'Go Back\' button', async () => {
      const goBackButton = element(by.id('div-go-back-button'))
      await goBackButton.tap()

      const homeScreen = element(by.id('home-screen'))
      await expect(homeScreen).toExist()
    })

    it('Should add numbers correctly', async () => {
      const textInputX = element(by.id('div-textinput-x'))
      const textInputY = element(by.id('div-textinput-y'))
      const divButton = element(by.id('div-div-button'))
      const divQuotText = element(by.id('div-quot-text'))

      await textInputX.typeText('20')
      await textInputY.typeText('10')
      await divButton.tap()
      await expect(divQuotText).toHaveText('2')

      await textInputX.clearText()
      await textInputY.clearText()

      await textInputX.typeText('20')
      await textInputY.typeText('0')
      await divButton.tap()
      await expect(divQuotText).toHaveText('0')
    })
  })
})
