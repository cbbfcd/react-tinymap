import { Placement, Pos } from './type'

const __cache = new WeakMap()

// todo clean any
export const calcPlacement = (placement: Placement, gutter: number = 6): Pos => {
  const gap = `${gutter}px`
  const matched = placement.match(/^(top)|(bottom)|(left)|(right)/ig)
  if (!matched || !matched.length) {
    return {
      bottom: gap,
      right: gap
    }
  }
  return matched.reduce((ac: any, k: string) => {
    ac[k.toLowerCase()] = gap
    return ac
  }, {})
}

export const round = (n: number) => Math.round(n)
export const min = (a: number, b: number) => Math.min(a, b)
export const max = (a: number, b: number) => Math.max(a, b)

export const rafThrottle = <T>(callback: (...args: T[]) => void) => {

  let requestId: number | null = null
  let lastArgs: T[]

  const later = (context: T) => () => {
    requestId = null
    callback.apply(context, lastArgs)
  }

  const throttle = function(this: any, ...args: T[]) {
    lastArgs = args
    if (requestId === null) {
      requestId = requestAnimationFrame(later(this))
    }
  }

  throttle.cancel = () => {
    cancelAnimationFrame(requestId!)
    requestId = null
  }

  return throttle
}

export function toArray<T>(arrayLike: any): T[] {
  const result: T[] = []

  for (let i = 0, l = arrayLike.length; i < l; i += 1) {
    result.push(arrayLike[i])
  }

  return result
}

export const getCachedBoundingClientRect = (node: HTMLElement, noCache = false) => {
  if (noCache) return node.getBoundingClientRect()
  if (__cache.has(node)) return __cache.get(node)

  const rect = node.getBoundingClientRect()
  __cache.set(node, rect)
  
  return rect 
}
