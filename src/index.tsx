import React, { useLayoutEffect, useCallback, useRef, useState, createElement, forwardRef, memo, FC, SyntheticEvent } from 'react'
import { setup, styled } from 'goober'

import { MiniMapProps, TinyMapProps, InitialMiniMapState } from './type'
import { calcPlacement, rafThrottle } from './util'
import { DEFAULTS, DEFAULT_POINTER_STATE } from './constant'
import { init, pos, center, moveHelper } from './dom'
import Item from './child'
import Pointer from './pointer'

export * from './type'
 
setup(createElement)

const Container = styled('div')`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translate(0, 0);
`

// todo clean any
const MiniMap = styled('div', forwardRef)(({ width, height, placement, gutter }: MiniMapProps) => ({
  position: 'fixed',
  zIndex: 1001,
  backgroundColor: 'rgba(10, 10, 10, 0.15)',
  width: `${width}px`,
  height: `${height}px`,
  ...calcPlacement(placement, gutter) as any
}))

const Child = styled('div', forwardRef)`
  width: 100%;
  height: 100%;
  overflow: scroll;
  position: relative;
`

const TinyMap: FC<TinyMapProps> = ({
  className,
  miniMapClassName,
  selector,
  placement = 'bottomRight',
  gutter = DEFAULTS.GUTTER,
  width = DEFAULTS.WIDTH,
  height = DEFAULTS.HEIGHT,
  keepAspectRatio = DEFAULTS.KEEP_ASPECT_RATIO,
  renderChild,
  renderViewPort,
  children
}) => {
  const [store, updateStore] = useState<InitialMiniMapState>({ width, height, nodes: [], pointer: DEFAULT_POINTER_STATE })
  const source = useRef<HTMLDivElement>(null)
  const minimap = useRef<HTMLDivElement>(null)
  const dragStart = useRef<boolean>(false)
  const centerRef = useRef<{x: number, y: number}>({x: 0, y: 0})

  useLayoutEffect(() => {
    if (!source.current || !minimap.current) return

    const initial = init(source.current!, width, height, keepAspectRatio, selector)
    updateStore(initial)

    // resize
    const resize = rafThrottle(() => {
      const pointer = pos(source.current!, store.width, store.height)
      updateStore(prev => ({ ...prev, ...{ pointer }}))
    })
    window.addEventListener('resize', resize as any);
    () => {
      window.removeEventListener('resize', resize as any)
    }
  }, [source, selector, width, height, keepAspectRatio])

  const sync = rafThrottle((e: SyntheticEvent) => {
    const pointer = pos(e.target as any, store.width, store.height)
    updateStore(prev => ({ ...prev, ...{ pointer }}))
  })

  const down = (e: SyntheticEvent) => {
    dragStart.current = true
    centerRef.current = center(e.target as any, store.pointer)
  }

  const up = useCallback(() => {
    dragStart.current = false
  }, [])

  const move = rafThrottle((e: SyntheticEvent) => {
    if (dragStart.current === false || !source.current) return
    const {
      pointer,
      center,
      scroll: { scrollLeft, scrollTop }
    } = moveHelper(e, centerRef.current, store, source.current)
    centerRef.current = center
    updateStore(prev => ({ ...prev, ...{ pointer} }))
    source.current.scrollLeft = scrollLeft
    source.current.scrollTop = scrollTop
  })

  return (
    <Container className={className}>
      <MiniMap
        onMouseDown={down}
        onTouchStart={down}
        onMouseMove={move}
        onTouchMove={move}
        onMouseUp={up}
        onTouchEnd={up}
        ref={minimap}
        {...{ width: store.width, height: store.height, placement, gutter, className: miniMapClassName}}
      >
        { <Pointer {...store.pointer} render={renderViewPort}/> }
        { store.nodes.map(n => <Item {...n} render={renderChild}/>) }
      </MiniMap>
      <Child ref={source} onScroll={sync}>
        { children }
      </Child>
    </Container>
  )
}

export default memo(TinyMap)




