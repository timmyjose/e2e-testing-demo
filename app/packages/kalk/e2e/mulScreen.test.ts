import { expect, device, element, by } from 'detox'
import { beforeEach, beforeAll, describe, it } from '@jest/globals'
import { swipeIntros } from './swipeIntroSlider'

describe('Mul Screen', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true
    })
  })

  beforeEach(async () => {
    await device.reloadReactNative()

    await swipeIntros()

    // go to the 'Mul' screen
    const mulButton = element(by.id('home-mul-button'))
    await mulButton.tap()
  })

  describe('Mul Screen elements should be visible', () => {
    it('Should have the \'Go Back\' button', async () => {
      const goBackButton = element(by.id('mul-go-back-button'))
      await expect(goBackButton).toBeVisible()
    })

    it('Should have the textinputs for the two input numbers', async () => {
      const textInputX = element(by.id('mul-textinput-x'))
      await expect(textInputX).toBeVisible()

      const textInputY = element(by.id('mul-textinput-y'))
      await expect(textInputY).toBeVisible()
    })

    it('Should have the \'Mul\' button', async () => {
      const mulButton = element(by.id('mul-mul-button'))
      await expect(mulButton).toBeVisible()
    })
  })

  describe('Mul Screen operations', () => {
    it('Should go back to the Home Screen upon clicking the \'Go Back\' button', async () => {
      const goBackButton = element(by.id('mul-go-back-button'))
      await goBackButton.tap()

      const homeScreen = element(by.id('home-screen'))
      await expect(homeScreen).toExist()
    })

    it('Should multiply numbers correctly', async () => {
      const textInputX = element(by.id('mul-textinput-x'))
      const textInputY = element(by.id('mul-textinput-y'))
      const mulButton = element(by.id('mul-mul-button'))
      const mulProdText = element(by.id('mul-prod-text'))

      await textInputX.typeText('10')
      await textInputY.typeText('20')
      await mulButton.tap()
      await expect(mulProdText).toHaveText('200')
    })
  })
})
