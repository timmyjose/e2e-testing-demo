import { by, element, expect } from 'detox'

export async function swipeIntros() {
  const appSlider = element(by.id('app-intro-slider'))
  await expect(appSlider).toExist()

  for (let i = 0; i < 5; i++) {
    await appSlider.swipe('left', 'fast', 1.0)
  }

  const doneButton = element(by.label('Done'))
  await expect(doneButton).toExist()

  await doneButton.tap()
}
