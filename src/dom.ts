import { round, toArray, min, getCachedBoundingClientRect, max } from './util'
import { InitialMiniMapState } from './type'

export const init = (node: HTMLElement, width: number, height: number, keepAspectRatio: boolean | 0 | 1, selector: string) => {
  const { scrollHeight, scrollWidth, scrollLeft, scrollTop } = node
  const rect = getCachedBoundingClientRect(node)

  const ratioX = width / scrollWidth
  const ratioY = height / scrollHeight

  if (keepAspectRatio) {
    ratioX < ratioY
      ? (height = round((scrollHeight / scrollWidth) * width))
      : (width = round((scrollWidth / scrollHeight) * height))
  }

  const ratio = min(ratioX, ratioY)

  // todo clean any
  const nodes = toArray(node.querySelectorAll(selector)).map((el: any, idx: number) => {
    const { width, height, left, top } = getCachedBoundingClientRect(el)
    const nw = round(width * ratio)
    const nh = round(height * ratio)
    const nl = round((scrollLeft + left - rect.left) * ratio)
    const nt = round((scrollTop + top - rect.top) * ratio)

    return {
      key: `key-${idx}`,
      width: nw,
      height: nh,
      left: nl,
      top: nt,
      node: el as any
    }
  })

  const pointer = pos(node, width, height)

  return {
    width,
    height,
    nodes,
    pointer
  }
}

// calc the pointer view postion
export const pos = (node: HTMLElement, width: number, height: number) => {
  const { scrollHeight, scrollWidth, scrollLeft, scrollTop } = node
  const { width: w, height: h } = getCachedBoundingClientRect(node, true)

  const scaleX = width / scrollWidth
  const scaleY = height / scrollHeight

  return {
    width: round(w * scaleX),
    height: round(h * scaleY),
    left: round(scrollLeft * scaleX),
    top: round(scrollTop * scaleY)
  }
}

export const center = (node: HTMLElement, pointer: InitialMiniMapState['pointer']) => {
  const { left: l, top: t } = getCachedBoundingClientRect(node, true)
  const { left, width, top, height } = pointer
  const x = round(l + left + width / 2)
  const y = round(t + top + height / 2)
  return {
    x,
    y
  }
}

export const moveHelper = (e: any, center: { x: number, y: number }, store: InitialMiniMapState, node: HTMLElement) => {
  const { width, height } = store

  let evt

  e.preventDefault()
  evt = e.type.indexOf('mouse') !== -1 ? e : e.touches[0]

  const clientX = evt.clientX
  const clientY = evt.clientY
 
  let { left: l, top: t, width: w, height: h } = store.pointer
  let { x, y } = center
  let dx = clientX - x
  let dy = clientY - y

  if (l + dx < 0) dx = -l
  if (t + dy < 0) dy = -t
  if (l + dx + w > width) dx = width - l - w
  if (t + dy + h > height) dy = height - t - h

  l += dx
  t += dy

  l = max(l, 0)
  t = max(t, 0)
  
  x += dx
  y += dy

  const scalex = width / node.scrollWidth
  const scaley = height / node.scrollHeight

  return {
    scroll: {
      scrollLeft: round(l / scalex),
      scrollTop: round(t / scaley)
    },
    center: {x, y},
    pointer: { width: w, height: h, left: l, top: t }
  }
}

