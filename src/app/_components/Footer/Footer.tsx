'use client'
import { useUserStore } from '@/stores/user/context'

import s from './Footer.module.scss'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  const user = useUserStore((s) => s.user)

  return (
    <footer className={s.container}>
      <div className={s.content}>
        <span className={s.year}>{currentYear}</span>

        {user && <span className={s.user}>Logged as {user.email}</span>}
      </div>
    </footer>
  )
}
