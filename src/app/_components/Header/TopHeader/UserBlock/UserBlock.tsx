'use client'

import { AppLink } from '@/components/AppLink'
import { User } from '@/components/icons'
import { useUserStore } from '@/stores/user/context'

import { LogOutButton } from './LogOutButton'
import s from './UserBlock.module.scss'

export const UserBlock = () => {
  const user = useUserStore((s) => s.user)

  if (!user) {
    return (
      <AppLink className={`${s.link}`} href="/login" prefetch="hover">
        <User />
        Login
      </AppLink>
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
