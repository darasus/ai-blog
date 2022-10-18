import React, { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export function Badge({
  children,
  className,
}: React.PropsWithChildren & HTMLAttributes<HTMLDivElement>) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-700 uppercase',
        className
      )}
    >
      {children}
    </span>
  )
}
