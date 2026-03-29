'use client'

import Link, { useLinkStatus, type LinkProps } from 'next/link'
import { useState } from 'react'

import { cn } from '@/lib/cn'

import s from './AppLink.module.scss'

export type AppLinkProps = Omit<LinkProps, 'prefetch'> &
  Exclude<React.ComponentProps<'a'>, keyof LinkProps> &
  React.PropsWithChildren & {
    prefetch?: LinkProps['prefetch'] | 'hover',
    noLoader?: boolean,
  }

const PendingIndicator = () => {
  const { pending } = useLinkStatus()
  if (!pending) return null
  return <div role="presentation" className={s.pendingIndicator} />
}

export const AppLink = ({
  prefetch,
  className,
  noLoader,
  children,
  ...props
}: AppLinkProps) => {
  'use memo'
  const [ hovered, setHovered ] = useState(false)
  const linkPrefetch = prefetch === 'hover' ? hovered : prefetch

  return (
    <Link
      {...props}
      className={cn(s.link, className)}
      prefetch={linkPrefetch}
      onMouseEnter={() => setHovered(true)}
    >
      {children}

      {!noLoader && <PendingIndicator />}
    </Link>
  )
}
