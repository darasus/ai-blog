import clsx from 'clsx'
import React from 'react'

type Props = React.PropsWithChildren<{
  type?: 'h1' | 'h2'
}>

export const PostTitle: React.FC<Props> = ({ type = 'h1', children }) => {
  return (
    <h1
      className={clsx('mt-1 mb-2 font-bold leading-none', {
        ['sm:text-4xl md:text-6xl lg:text-6xl']: type === 'h1',
        ['text-4xl']: type === 'h2',
      })}
    >
      {children}
    </h1>
  )
}
