import clsx from 'clsx'
import NextLink, { LinkProps } from 'next/link'
import React from 'react'

type Props = React.PropsWithChildren<LinkProps> & { hoverStyles?: boolean }

export function Link({ children, hoverStyles = true, ...props }: Props) {
  return (
    <NextLink {...props} className={clsx({ underline: hoverStyles })}>
      {children}
    </NextLink>
  )
}
