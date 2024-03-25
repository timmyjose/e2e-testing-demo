import { expect, device, element, by, waitFor } from 'detox'
import { beforeEach, beforeAll, describe, it } from '@jest/globals'
import { swipeIntros } from './swipeIntroSlider'
import { VISUAL_ELEMENTS_TIMEOUT, getText } from '../components/helpers'

describe('Div Screen', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true
    })
  })

  beforeEach(async () => {
    await device.reloadReactNative()

    await swipeIntros()

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

    it('Should have the \'Fetch Data\' button', async () => {
      const fetchDataButton = element(by.id('div-data-loader-fetch-button'))
      await waitFor(fetchDataButton).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)
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

    it('Should divide numbers correctly', async () => {
      const textInputX = element(by.id('div-textinput-x'))
      const textInputY = element(by.id('div-textinput-y'))
      const divQuotText = element(by.id('div-quot-text'))

      const divButton = element(by.id('div-div-button'))
      await waitFor(divButton).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)

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

    it('Should divide numbers correctly by fetching it from the data-loader', async () => {
      const divDataLoaderFetchButton = element(by.id('div-data-loader-fetch-button'))
      await waitFor(divDataLoaderFetchButton).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)
      await divDataLoaderFetchButton.tap()

      const textInputX = element(by.id('div-textinput-x'))
      await waitFor(textInputX).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)
      const xVal = await getText('div-textinput-x')

      const textInputY = element(by.id('div-textinput-y'))
      await waitFor(textInputY).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)
      const yVal = await getText('div-textinput-y')

      const expectedQuotText = Math.floor(parseInt(xVal) / parseInt(yVal))

      const divButton = element(by.id('div-div-button'))
      await waitFor(divButton).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)

      const divQuotText = element(by.id('div-quot-text'))

      await divButton.tap()
      await expect(divQuotText).toHaveText(expectedQuotText.toString())
    })
  })
})
