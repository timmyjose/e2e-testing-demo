import { expect, device, element, by } from 'detox'
import { beforeAll, beforeEach, describe, it } from '@jest/globals'

describe('Home Screen', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true
    })
  })

  beforeEach(async () => {
    await device.reloadReactNative()
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
})
