import { expect, device, element, by, waitFor } from 'detox'
import { beforeEach, beforeAll, describe, it } from '@jest/globals'
import { swipeIntros } from './swipeIntroSlider'
import { getText, VISUAL_ELEMENTS_TIMEOUT } from '../components/helpers'

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

    it('Should have the \'Fetch Data\' button', async () => {
      const fetchDataButton = element(by.id('add-data-loader-fetch-button'))
      await waitFor(fetchDataButton).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)
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
      const addSumText = element(by.id('add-sum-text'))

      const addButton = element(by.id('add-add-button'))
      await waitFor(addButton).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)

      await textInputX.typeText('10')
      await textInputY.typeText('20')
      await addButton.tap()
      await expect(addSumText).toHaveText('30')
    })

    it('Should add numbers correctly by fetching it from the data-loader', async () => {
      const addDataLoaderFetchButton = element(by.id('add-data-loader-fetch-button'))
      await waitFor(addDataLoaderFetchButton).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)
      await addDataLoaderFetchButton.tap()

      const textInputX = element(by.id('add-textinput-x'))
      await waitFor(textInputX).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)
      const xVal = await getText('add-textinput-x')

      const textInputY = element(by.id('add-textinput-y'))
      await waitFor(textInputY).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)
      const yVal = await getText('add-textinput-y')

      const expectedSumText = parseInt(xVal) + parseInt(yVal)

      const addButton = element(by.id('add-add-button'))
      await waitFor(addButton).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)

      const addSumText = element(by.id('add-sum-text'))

      await addButton.tap()
      await expect(addSumText).toHaveText(expectedSumText.toString())
    })
  })
})
