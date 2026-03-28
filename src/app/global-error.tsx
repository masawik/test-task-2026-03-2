'use client'

import s from './_layout-styles/global-error.module.scss'
import { appFontVariableClassNames } from './fonts'

import './styles/main.scss'

export default function GlobalError({
  error: _error,
  unstable_retry,
}: {
  error: Error & { digest?: string },
  unstable_retry: () => void,
}) {
  return (
    <html lang="en" className={appFontVariableClassNames}>
      <body className={s.body}>
        <main className={s.container}>
          <h1 className={s.title}>The service is temporarily unavailable.</h1>

          <p className={s.subtitle}>Please try again later.</p>

          <button
            type="button"
            className={`button ${s.retry}`}
            onClick={() => unstable_retry()}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
