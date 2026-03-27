import { getCurrentUser } from '@/auth/currentUser'

import s from './Footer.module.scss'

export const Footer = async () => {
  const currentYear = new Date().getFullYear()
  const user = await getCurrentUser()

  return (
    <footer className={s.container}>
      <div className={s.content}>
        {null}

        <span className={s.year}>{currentYear}</span>

        {user && <span className={s.user}>Logged as {user.email}</span>}
      </div>
    </footer>
  )
}
