import { expect, device, element, by } from 'detox'
import { beforeAll, beforeEach, describe, it } from '@jest/globals'
import { swipeIntros } from './swipeIntroSlider'
import { isDebugMode } from './helper'

describe('Home Screen', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true
    })
  })

  beforeEach(async () => {
    await device.reloadReactNative()

    // Swipe through the slider screens
    await swipeIntros()

    if (isDebugMode()) {
      console.log('Running in Debug mode')
    }
  })

  describe('Home Screen elements should be visible', () => {
    describe('\'Add\' button', () => {
      it('Should have the \'Add\' button', async () => {
        const addButton = element(by.id('home-add-button'))
        await expect(addButton).toBeVisible()
      })

      it('Should show the correct text for the \'Add\' button', async () => {
        const addButtonText = element(by.id('home-add-button-text'))
        await expect(addButtonText).toBeVisible()

        const expectedText = 'Add Demo'
        await expect(addButtonText).toHaveText(expectedText)
      })
    })

    describe('\'Sub\' button', () => {
      it('Should have the \'Sub\' button', async () => {
        const subButton = element(by.id('home-sub-button'))
        await expect(subButton).toBeVisible()
      })

      it('Should have the correct text for the \'Sub\' button', async () => {
        const subButtonText = element(by.id('home-sub-button-text'))
        await expect(subButtonText).toBeVisible()

        const expectedText = 'Sub Demo'
        await expect(subButtonText).toHaveText(expectedText)
      })
    })

    describe('\'Mul\' button', () => {
      it('Should have the \'Mul\' button', async () => {
        const mulButton = element(by.id('home-mul-button'))
        await expect(mulButton).toBeVisible()
      })

      it('Should have the correct text for the \'Mul\' button', async () => {
        const mulButtonText = element(by.id('home-mul-button-text'))
        await expect(mulButtonText).toBeVisible()

        const expectedText = 'Mul Demo'
        await expect(mulButtonText).toHaveText(expectedText)
      })
    })

    describe('\'Div\' button', () => {
      it('Should have the \'Div\' button', async () => {
        const divButton = element(by.id('home-div-button'))
        await expect(divButton).toBeVisible()
      })

      it('Should have the correct text for the \'Div\' button', async () => {
        const divButtonText = element(by.id('home-div-button-text'))
        await expect(divButtonText).toBeVisible()

        const expectedText = 'Div Demo'
        await expect(divButtonText).toHaveText(expectedText)
      })
    })
  })

  describe('Home Screen buttons should navigate to the correct screens', () => {
    it('Should navigate to the \'Add\' screen upon clicking the \'Add\' button', async () => {
      const addButton = element(by.id('home-add-button'))
      await addButton.tap()

      const addScreen = element(by.id('add-screen'))
      await expect(addScreen).toExist()
    })

    it('Should navigate to the \'Sub\' screen upon clicking the \'Sub\' button', async () => {
      const subButton = element(by.id('home-sub-button'))
      await subButton.tap()

      const subScreen = element(by.id('sub-screen'))
      await expect(subScreen).toExist()
    })

    it('Should navigate to the \'Mul\' screen upon clicking the \'Mul\' button', async () => {
      const mulButton = element(by.id('home-mul-button'))
      await mulButton.tap()

      const mulScreen = element(by.id('mul-screen'))
      await expect(mulScreen).toExist()
    })

    it('Should navigate to the \'Div\' screen upon clicking the \'Div\' button', async () => {
      const divButton = element(by.id('home-div-button'))
      await divButton.tap()

      const divScreen = element(by.id('div-screen'))
      await expect(divScreen).toExist()
    })
  })
})
