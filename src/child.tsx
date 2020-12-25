import React, { memo } from 'react'
import { styled } from 'goober'

import { ChildNeedProps } from './type'
import { CHILD_BACKGROUND_COLOR } from './constant'

const Child = styled('div')(({ width, height, left, top }: Omit<ChildNeedProps, 'node' | 'key'>) => ({
  position: 'absolute',
  left: `${left}px`,
  top: `${top}px`,
  width: `${width}px`,
  height: `${height}px`,
  backgroundColor: CHILD_BACKGROUND_COLOR
}))

// todo clean any
export default memo(({render, ...rest}: any) => {
  if (render) return render(rest)
  return <Child {...rest}/>
})
