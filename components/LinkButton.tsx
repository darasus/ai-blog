import NextLink, { LinkProps } from 'next/link'
import React from 'react'

type Props = React.PropsWithChildren<LinkProps> & {
  colorScheme?: 'white' | 'brand' | 'secondary'
}

export function LinkButton({
  children,
  colorScheme = 'white',
  ...props
}: Props) {
  if (colorScheme === 'white') {
    return (
      <NextLink
        {...props}
        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      >
        {children}
      </NextLink>
    )
  }

  if (colorScheme === 'brand') {
    return (
      <NextLink
        {...props}
        className="inline-flex items-center rounded-md border border-transparent bg-brand-900 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      >
        {children}
      </NextLink>
    )
  }

  if (colorScheme === 'secondary') {
    return (
      <NextLink
        {...props}
        className="inline-flex items-center rounded-md border border-transparent bg-brand-200 px-3 py-2 text-sm font-medium leading-4 text-brand-900 hover:bg-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      >
        {children}
      </NextLink>
    )
  }

  return null
}
