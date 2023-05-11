/**
 * NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT
 */

// Forked and modified from nprogress v0.2.0

interface NProgressOptions {
  minimum: number
  template: string
  easing: string
  speed: number
  trickle: boolean
  trickleRate: number
  trickleSpeed: number
  parent: string
  barSelector: string
}

interface NProgress {
  settings: NProgressOptions
  status: number | null

  set(number: number): NProgress
  isStarted(): boolean
  start(): NProgress
  done(force?: boolean): NProgress
  inc(amount?: number): NProgress
  trickle(): NProgress

  /* Internal */

  render(fromStart?: boolean): HTMLDivElement
  remove(): void
  isRendered(): boolean
}

export const nprogress: NProgress = {
  settings: {
    minimum: 0.08,
    easing: 'ease',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    barSelector: '[role="bar"]',
    parent: 'body',
    template: '<div class="bar" role="bar"></div>',
  },
  status: null,
  set: (n) => {
    const started = nprogress.isStarted()
    n = clamp(n, nprogress.settings.minimum, 1)
    nprogress.status = n === 1 ? null : n
    const progress = nprogress.render(!started)
    const bar = progress.querySelector<HTMLElement>(
      nprogress.settings.barSelector
    )!
    const speed = nprogress.settings.speed
    const ease = nprogress.settings.easing

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    progress.offsetWidth /* Repaint */

    queue((next) => {
      // Add transition
      css(bar, {
        transform: 'translate3d(' + toBarPerc(n) + '%,0,0)',
        transition: 'all ' + speed + 'ms ' + ease,
      })

      if (n === 1) {
        // Fade out
        css(progress, {
          transition: 'none',
          opacity: '1',
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        progress.offsetWidth /* Repaint */

        setTimeout(function () {
          css(progress, {
            transition: 'all ' + speed + 'ms linear',
            opacity: '0',
          })
          setTimeout(function () {
            nprogress.remove()
            next()
          }, speed)
        }, speed)
      } else {
        setTimeout(() => next(), speed)
      }
    })
    return nprogress
  },

  isStarted: () => typeof nprogress.status === 'number',

  start: () => {
    if (!nprogress.status) nprogress.set(0)

    const work = (): void => {
      setTimeout(() => {
        if (!nprogress.status) return
        nprogress.trickle()
        work()
      }, nprogress.settings.trickleSpeed)
    }

    if (nprogress.settings.trickle) work()

    return nprogress
  },

  done: (force) => {
    if (!force && !nprogress.status) return nprogress
    return nprogress.inc(0.3 + 0.5 * Math.random()).set(1)
  },

  inc: (amount) => {
    let n = nprogress.status
    if (!n) {
      return nprogress.start()
    }

    if (typeof amount !== 'number') {
      amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95)
    }
    n = clamp(n + amount, 0, 0.994)
    return nprogress.set(n)
  },

  trickle: () => nprogress.inc(Math.random() * nprogress.settings.trickleRate),

  render: (fromStart) => {
    if (nprogress.isRendered()) {
      return document.getElementById('nprogress') as HTMLDivElement
    }

    addClass(document.documentElement, 'nprogress-busy')

    const progress = document.createElement('div')
    progress.id = 'nprogress'
    progress.innerHTML = nprogress.settings.template

    const bar = progress.querySelector<HTMLElement>(
      nprogress.settings.barSelector
    )!
    const perc = fromStart ? '-100' : toBarPerc(nprogress.status || 0)
    const parent = document.querySelector<HTMLElement>(
      nprogress.settings.parent
    )!

    css(bar, {
      transition: 'all 0 linear',
      transform: 'translate3d(' + perc + '%,0,0)',
    })

    if (parent !== document.body) {
      addClass(parent, 'nprogress-custom-parent')
    }

    parent?.appendChild(progress)
    return progress
  },

  remove: () => {
    removeClass(document.documentElement, 'nprogress-busy')
    removeClass(
      document.querySelector(nprogress.settings.parent)!,
      'nprogress-custom-parent'
    )
    const progress = document.getElementById('nprogress')
    progress && removeElement(progress)
  },

  isRendered: () => !!document.getElementById('nprogress'),
}

const clamp = (n: number, min: number, max: number): number => {
  if (n < min) return min
  if (n > max) return max
  return n
}
const toBarPerc = (n: number): number => (-1 + n) * 100
const queue = (function () {
  const pending: ((next: () => void) => void)[] = []
  function next(): void {
    const fn = pending.shift()
    if (fn) {
      fn(next)
    }
  }
  return function (fn) {
    pending.push(fn)
    if (pending.length === 1) next()
  }
})()
const css = (function () {
  const cssPrefixes = ['Webkit', 'O', 'Moz', 'ms']
  const cssProps = {}

  function camelCase(string: string): string {
    return string
      .replace(/^-ms-/, 'ms-')
      .replace(/-([\da-z])/gi, function (match, letter) {
        return letter.toUpperCase()
      })
  }

  function getVendorProp(name: string): string {
    const style = document.body.style
    if (name in style) return name
    let i = cssPrefixes.length
    const capName = name.charAt(0).toUpperCase() + name.slice(1)
    let vendorName
    while (i--) {
      vendorName = cssPrefixes[i] + capName
      if (vendorName in style) return vendorName
    }
    return name
  }

  function getStyleProp(name: string): string {
    name = camelCase(name)
    return (cssProps[name] ??= getVendorProp(name))
  }

  function applyCss(element: HTMLElement, prop: string, value: string): void {
    prop = getStyleProp(prop)
    element.style[prop] = value
  }

  return function (element: HTMLElement, properties: Record<string, string>) {
    for (const prop in properties) {
      const value = properties[prop]
      if (
        value !== undefined &&
        Object.prototype.hasOwnProperty.call(properties, prop)
      )
        applyCss(element, prop, value)
    }
  }
})()

const hasClass = (element: Element | string, name: string): boolean => {
  const list = typeof element === 'string' ? element : classList(element)
  return list.indexOf(' ' + name + ' ') >= 0
}
const addClass = (element: Element, name: string): void => {
  const oldList = classList(element)
  const newList = oldList + name
  if (hasClass(oldList, name)) return
  element.className = newList.substring(1)
}

const removeClass = (element: Element, name: string): void => {
  const oldList = classList(element)
  if (!hasClass(element, name)) return
  const newList = oldList.replace(' ' + name + ' ', ' ')
  element.className = newList.substring(1, newList.length - 1)
}

const classList = (element: Element): string => {
  return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ')
}

const removeElement = (element: Element): void => {
  element && element.parentNode && element.parentNode.removeChild(element)
}
