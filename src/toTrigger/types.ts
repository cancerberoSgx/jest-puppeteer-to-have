import {FireEventNames} from './event'

export interface ToTriggerOptions {
  // type: 'click' | 'select' | 'change'
  select?: string | string[]
  selector: string
  event?: FireEventNames
  check?: boolean
}
