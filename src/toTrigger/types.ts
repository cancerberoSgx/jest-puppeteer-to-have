import {FireEventNames} from './event'

export interface ToTriggerOptions {
  // type: 'click' | 'select' | 'change'
  select?: string | string[]
  selector: string
  event?: FireEventNames
  check?: boolean
  /** select all text in a textarea, input, contentEditable, etc */
  selectAllText?: boolean
  /** clears all the text in a textarea, input, contentEditable, etc */
  clearAllText?: boolean
  /** enters text in a textarea, input, contentEditable */
  enterText?: string
}
