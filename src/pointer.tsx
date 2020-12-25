import React, { memo } from "react";
import { styled } from 'goober'

import { ChildNeedProps } from './type'
import { POINTER_BACKGROUND_COLOR } from './constant'

type PointerProps = Pick<ChildNeedProps, 'height' | 'top' | 'left' | 'width'>

const Pointer = styled('div')(({ width, height, left = 0, top = 0 }: PointerProps) => ({
  width: `${width}px`,
  height: `${height}px`,
  left: `${left}px`,
  top: `${top}px`,
  position: 'absolute',
  backgroundColor: POINTER_BACKGROUND_COLOR,
  boxSizing: 'border-box',
  cursor: 'move'
}))

// todo clean any
export default memo(({ render, ...rest }: any) => {
  if (render) return render(rest)
  return <Pointer {...rest}/>
})
