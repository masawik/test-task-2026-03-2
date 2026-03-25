'use client'

import Link, { type LinkProps } from 'next/link'
import { useState } from 'react'

export type HoverPrefetchLinkProps = Omit<LinkProps, 'prefetch'> &
  Exclude<React.ComponentProps<'a'>, keyof LinkProps> &
  React.PropsWithChildren

export const HoverPrefetchLink = (props: HoverPrefetchLinkProps) => {
  const [ active, setActive ] = useState(false)

  return (
    <Link
      {...props}
      prefetch={active ? true : false}
      onMouseEnter={() => setActive(true)}
    />
  )
}
