import { expect, device, element, by, waitFor } from 'detox'
import { beforeEach, beforeAll, describe, it } from '@jest/globals'
import { swipeIntros } from './swipeIntroSlider'
import { VISUAL_ELEMENTS_TIMEOUT, getText } from '../components/helpers'

describe('Sub Screen', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true
    })
  })

  beforeEach(async () => {
    await device.reloadReactNative()

    await swipeIntros()

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

    it('Should have the \'Fetch Data\' button', async () => {
      const fetchDataButton = element(by.id('sub-data-loader-fetch-button'))
      await waitFor(fetchDataButton).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)
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

    it('Should subtract numbers correctly', async () => {
      const textInputX = element(by.id('sub-textinput-x'))
      const textInputY = element(by.id('sub-textinput-y'))
      const subDiffText = element(by.id('sub-diff-text'))

      const subButton = element(by.id('sub-sub-button'))
      await waitFor(subButton).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)

      await textInputX.typeText('10')
      await textInputY.typeText('20')
      await subButton.tap()
      await expect(subDiffText).toHaveText('-10')
    })

    it('Should subtract numbers correctly by fetching it from the data-loader', async () => {
      const subDataLoaderFetchButton = element(by.id('sub-data-loader-fetch-button'))
      await waitFor(subDataLoaderFetchButton).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)
      await subDataLoaderFetchButton.tap()

      const textInputX = element(by.id('sub-textinput-x'))
      await waitFor(textInputX).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)
      const xVal = await getText('sub-textinput-x')

      const textInputY = element(by.id('sub-textinput-y'))
      await waitFor(textInputY).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)
      const yVal = await getText('sub-textinput-y')

      const expectedDiffText = parseInt(xVal) - parseInt(yVal)

      const subButton = element(by.id('sub-sub-button'))
      await waitFor(subButton).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)

      const subDiffText = element(by.id('sub-diff-text'))

      await subButton.tap()
      await expect(subDiffText).toHaveText(expectedDiffText.toString())
    })
  })
})
