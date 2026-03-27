import { getCurrentUser } from '@/auth/currentUser'

import { CurrentYear } from './CurrentYear'
import s from './Footer.module.scss'

export const Footer = async () => {
  const user = await getCurrentUser()

  return (
    <footer className={s.container}>
      <div className={s.content}>
        {null}

        <CurrentYear className={s.year} />

        {user && <span className={s.user}>Logged as {user.email}</span>}
      </div>
    </footer>
  )
}
