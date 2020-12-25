import * as React from 'react';

const color_map = {
  green: 'dodgerblue',
  orange: 'orange',
  pink: 'pink'
}

interface BlockProps {
  className?: string
  color: 'pink' | 'orange' | 'green'
  style: { [key: string]: any }
  label: string
}

export const Block = ({ className, color, style, label }: BlockProps) => {
  return (
    <div className={className} style={style}>
      <div className='box' style={{backgroundColor: color_map[color]}}>
        <h1>{label}</h1>
      </div>
    </div>
  )
}
