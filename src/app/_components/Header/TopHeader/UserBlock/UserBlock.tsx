import Link from 'next/link'

import { getCurrentUser } from '@/auth/currentUser'
import { User } from '@/components/icons'

import { LogOutButton } from './LogOutButton'
import s from './UserBlock.module.scss'

export const UserBlock = async () => {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <Link className={`${s.link}`} href="/login">
        <User />
        Login
      </Link>
    )
  }

  return (
    <div className={s.container}>
      <div className={s.userInfo}>
        {user.firstName} {user.lastName}
      </div>

      <LogOutButton />
    </div>
  )
}
