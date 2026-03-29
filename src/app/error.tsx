'use client'

import { usePathname } from 'next/navigation'

import { AppLink } from '@/components/AppLink'

import s from './_layout-styles/error.module.scss'

interface ErrorProps {
  error: Error & { digest?: string },
  unstable_retry: () => void,
}

export default function Error({ error }: ErrorProps) {
  const pathname = usePathname()

  const isHomePage = pathname === '/'

  return (
    <main className={s.container}>
      <h1 className={s.title}>An unexpected error has occurred.</h1>

      <div className={s.subtitle}>We are already working on it.</div>

      {isHomePage ? (
        <div>Please try to visit this page later.</div>
      ) : (
        <AppLink href="/" className={`button ${s.homeLink}`}>
          Home
        </AppLink>
      )}

      <span className={s.digest}>{error.digest}</span>
    </main>
  )
}
