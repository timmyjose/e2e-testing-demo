import { config } from 'detox/internals'
import { ENV_NAME } from '../constants'

export function isDebugMode() {
  return config.configurationName.endsWith('.debug')
}
