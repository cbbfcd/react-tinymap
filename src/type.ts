import { FC } from 'react'

export interface ChildNeedProps {
  key: string
  width: number
  height: number
  left: number
  top: number
  node: HTMLElement
}

export interface TinyMapProps extends MiniMapProps {
  // the wrapper class name
  className?: string
  // use this selector found all the children should show in tiny-map
  selector: string
  // use css control the tiny-map style
  miniMapClassName?: string
  // whether keep aspect ratio
  keepAspectRatio?: boolean | 0 | 1
  // render child in minimap what u want
  renderChild?: FC<ChildNeedProps>
  // render view pointer in minimap
  renderViewPort?: FC<Pick<ChildNeedProps, 'height' | 'top' | 'left' | 'width'>>
}

export type Placement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

export interface MiniMapProps {
  // tiny-map box width
  width: number
  // tiny-map box height
  height: number
  // the tiny-map placement
  placement: Placement
  // the tiny-map box gutter
  gutter?: number
}

export type Pos = 
| { left: string, top: string }
| { right: string, top: string }
| { left: string, bottom: string }
| { right: string, bottom: string }

export interface MiniMapRect {
  width: number
  height: number
}

export interface InitialMiniMapState {
  width: number
  height: number
  nodes: Array<ChildNeedProps>
  pointer: Pick<ChildNeedProps, 'height' | 'top' | 'left' | 'width'>
}
