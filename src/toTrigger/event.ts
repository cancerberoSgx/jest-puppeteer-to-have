function asArray<T>(selectors: T | T[]): T[] {
  return Array.isArray(selectors) ? selectors : [selectors]
}

export type FireEventNames = 'mousedown' | 'mouseup' | 'click' | 'focus' | 'change' | 'blur' | 'select' | 'input'

function eventTools() {
  /**
   * Fire an event handler to the specified node. Event handlers can detect that the event was fired programmatically
   * by testing for a 'synthetic=true' property on the event object
   * @param {HTMLNode} node The node to fire the event handler on.
   * @param {String} eventName The name of the event without the "on" (e.g., "focus")
   */
  function fireEvent(node: Element, eventName: FireEventNames) {
    // Make sure we use the ownerDocument from the provided node to avoid cross-window problems
    var doc: HTMLDocument
    if (node.ownerDocument) {
      doc = node.ownerDocument
    } else if (node.nodeType == 9) {
      // the node may be the document itself, nodeType 9 = DOCUMENT_NODE
      doc = (node as any) as HTMLDocument
    } else {
      throw new Error('Invalid node passed to fireEvent: ' + node.id)
    }

    if (node.dispatchEvent) {
      // Gecko-style approach (now the standard) takes more work
      var eventClass = ''

      // Different events have different event classes.
      // If this switch statement can't map an eventName to an eventClass,
      // the event firing is going to fail.
      switch (eventName) {
        case 'click': // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
        case 'mousedown':
        case 'mouseup':
          eventClass = 'MouseEvents'
          break

        case 'focus':
        case 'change':
        case 'input':
        case 'blur':
        case 'select':
          eventClass = 'HTMLEvents'
          break

        default:
          throw "fireEvent: Couldn't find an event class for event '" + eventName + "'."
      }
      const event = doc.createEvent(eventClass)
      event.initEvent(eventName, true, true) // All events created as bubbling and cancelable.
      ;(event as any).synthetic = true // allow detection of synthetic events
      // The second parameter says go ahead with the default action
      //@ts-ignore
      node.dispatchEvent(event, true)
      //@ts-ignore
    } else if (node.fireEvent) {
      // IE-old school style, you can drop this if you don't need to support IE8 and lower
      const event = (doc as any).createEventObject()
      event.synthetic = true // allow detection of synthetic events
      //@ts-ignore
      node.fireEvent('on' + eventName, event)
    }
  }

  function check(el: HTMLElement, checked: boolean) {
    if (checked) {
      el.setAttribute('checked', 'checked')
      ;(el as any).checked = true
    } else {
      el.removeAttribute('checked')
      ;(el as any).checked = false
    }
    fireEvent(el, 'change')
    fireEvent(el, 'input')
    fireEvent(el, 'blur')
    el.blur()
  }

  function select(el: Element, values: string[] | string) {
    const v = asArray(values)
    const allOptions = Array.from(el.querySelectorAll('option'))
    const options = allOptions.filter(o => v.includes(o.value))
    if (options.length === 0) {
      console.warn(`No select option with value [${v.join(',')}] not found`)
      return
    }
    allOptions.forEach(o => (o.selected = false))

    options.forEach(option => {
      option.selected = true
    })
    fireEvent(el, 'change')
  }

  return {fireEvent, select, check}
}

export const eventAuxFunctions = `
(
${eventTools.toString()}
)()
`

/** @internal */
export interface EventTool {
  fireEvent(node: Element, eventName: FireEventNames): void
  select(el: Element, values: string[] | string): void
  check(el: Element, checked: boolean): void
}
