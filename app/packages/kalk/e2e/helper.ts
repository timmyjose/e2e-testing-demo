import { config } from 'detox/internals'
import { ENV_NAME } from '../constants'

export function isDebugMode() {
  console.log('APP ENV_NAME = ', ENV_NAME)
  return config.configurationName.endsWith('.debug')
}
