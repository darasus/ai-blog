import NextLink, { LinkProps } from 'next/link'
import React from 'react'

type Props = React.PropsWithChildren<LinkProps> & {
  colorScheme?: 'white' | 'blue' | 'secondary'
}

export function LinkButton({
  children,
  colorScheme = 'white',
  ...props
}: Props) {
  if (colorScheme === 'white') {
    return (
      <NextLink {...props}>
        <a className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          {children}
        </a>
      </NextLink>
    )
  }

  if (colorScheme === 'blue') {
    return (
      <NextLink {...props}>
        <a className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          {children}
        </a>
      </NextLink>
    )
  }

  if (colorScheme === 'secondary') {
    return (
      <NextLink {...props}>
        <a className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium leading-4 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          {children}
        </a>
      </NextLink>
    )
  }

  return null
}
