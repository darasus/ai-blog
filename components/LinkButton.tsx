import NextLink, { LinkProps } from 'next/link'
import { Button } from '@chakra-ui/react'
import React from 'react'

type Props = React.PropsWithChildren<LinkProps>

export function LinkButton({ children, ...props }: Props) {
  return (
    <NextLink {...props}>
      <Button variant={'outline'}>{children}</Button>
    </NextLink>
  )
}
