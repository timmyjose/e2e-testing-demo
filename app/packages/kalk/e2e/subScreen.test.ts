import { expect, device, element, by } from 'detox'
import { beforeEach, beforeAll, describe, it } from '@jest/globals'

describe('Sub Screen', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true
    })
  })

  beforeEach(async () => {
    await device.reloadReactNative()

    // go to the 'Sub' screen
    const subButton = element(by.id('home-sub-button'))
    await subButton.tap()
  })

  describe('Sub Screen elements should be visible', () => {
    it('Should have the \'Go Back\' button', async () => {
      const goBackButton = element(by.id('sub-go-back-button'))
      await expect(goBackButton).toBeVisible()
    })

    it('Should have the textinputs for the two input numbers', async () => {
      const textInputX = element(by.id('sub-textinput-x'))
      await expect(textInputX).toBeVisible()

      const textInputY = element(by.id('sub-textinput-y'))
      await expect(textInputY).toBeVisible()
    })

    it('Should have the \'Sub\' button', async () => {
      const subButton = element(by.id('sub-sub-button'))
      await expect(subButton).toBeVisible()
    })
  })

  describe('Sub Screen operations', () => {
    it('Should go back to the Home Screen upon clicking the \'Go Back\' button', async () => {
      const goBackButton = element(by.id('sub-go-back-button'))
      await goBackButton.tap()

      const homeScreen = element(by.id('home-screen'))
      await expect(homeScreen).toExist()
    })

    it('Should add numbers correctly', async () => {
      const textInputX = element(by.id('sub-textinput-x'))
      const textInputY = element(by.id('sub-textinput-y'))
      const subButton = element(by.id('sub-sub-button'))
      const subDiffText = element(by.id('sub-diff-text'))

      await textInputX.typeText('10')
      await textInputY.typeText('20')
      await subButton.tap()
      await expect(subDiffText).toHaveText('-10')
    })
  })
})
