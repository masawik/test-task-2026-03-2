'use client'

import { HoverPrefetchLink } from '@/components/HoverPrefetchLink'
import { User } from '@/components/icons'
import { useUserStore } from '@/stores/user/context'

import { LogOutButton } from './LogOutButton'
import s from './UserBlock.module.scss'

export const UserBlock = () => {
  const user = useUserStore((s) => s.user)

  if (!user) {
    return (
      <HoverPrefetchLink className={`${s.link}`} href="/login">
        <User />
        Login
      </HoverPrefetchLink>
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
