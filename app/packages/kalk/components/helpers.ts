import { element, by, waitFor } from 'detox'
import { AndroidElementAttributes, IosElementAttributes } from 'detox/detox'

export const VISUAL_ELEMENTS_TIMEOUT = 30000

export async function getText(id: string): Promise<string> {
  const elem = element(by.id(id))
  await waitFor(elem).toBeVisible().withTimeout(VISUAL_ELEMENTS_TIMEOUT)

  const attrs = await elem.getAttributes()

  if ('text' in attrs) {
    return attrs.text ?? '0'
  } else if ('elements' in attrs && ((Array.isArray(attrs as { elements: IosElementAttributes[] }) || Array.isArray(attrs as { elements: AndroidElementAttributes[] })))) {
    return attrs.elements[0].text ?? '0'
  }
  return '0'
}
