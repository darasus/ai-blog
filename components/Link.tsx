import NextLink, { LinkProps } from 'next/link'
import { Link as ChakraLink } from '@chakra-ui/react'
import React from 'react'

type Props = React.PropsWithChildren<LinkProps> & { hoverStyles?: boolean }

export function Link({ children, hoverStyles = true, ...props }: Props) {
  return (
    <NextLink {...props}>
      <ChakraLink
        _hover={{
          textDecoration: hoverStyles ? 'underline' : 'none',
        }}
      >
        {children}
      </ChakraLink>
    </NextLink>
  )
}
