import { device, element, by, waitFor } from 'detox'
import { beforeEach, beforeAll, describe, it } from '@jest/globals'
import { swipeIntros } from './swipeIntroSlider'
import { VISUAL_ELEMENTS_TIMEOUT } from '../components/helpers'
import jsQR from 'jsqr'
import * as _Jimp from 'jimp'
// @ts-expect-error 'A bug in Jimp: https://github.com/jimp-dev/jimp/issues/1194#issuecomment-1501177825'
const Jimp = (typeof self !== 'undefined') ? (self.Jimp || _Jimp) : _Jimp

describe('QR Code Screen', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true
    })
  })

  beforeEach(async () => {
    await device.reloadReactNative()

    // Swipe through the slider screens
    await swipeIntros()

    // go to the 'QR Code' screen
    const qrcodeButton = element(by.id('home-qrcode-button'))
    await qrcodeButton.tap()
  })

  describe('QR Code should work correctly', () => {
    it('Should take a screenshot, and open the URL in the QR Code in the screenshot', async () => {
      // Generate a QR Code
      const generateQRCodeButton = element(by.id('qrcode-generate-button'))
      await waitFor(generateQRCodeButton).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)
      await generateQRCodeButton.tap()

      // take a screenshot
      const screenshotPath = await device.takeScreenshot('qr-code-url')
      console.log('screenshot path = ', screenshotPath)

      // Read the QR code from the screenshot
      try {
        const qrCodeImage = await Jimp.read(screenshotPath)

        const imageData = {
          data: qrCodeImage.bitmap.data,
          width: qrCodeImage.bitmap.width,
          height: qrCodeImage.bitmap.height
        }

        const decodedQR = jsQR(imageData.data, imageData.width, imageData.height)

        if (!decodedQR) {
          throw new Error('Could not decode QR Code from screenshot')
        }
        console.log('Decoded QR Code data = ', decodedQR.data)
      } catch (err: any) {
        throw new Error('Could not decode QR Code from screenshot, ', err)
      }
    })
  })
})
