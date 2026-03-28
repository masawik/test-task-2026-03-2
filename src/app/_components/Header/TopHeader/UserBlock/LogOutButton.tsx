'use client'

import { useTransition } from 'react'

import { logOut } from '@/auth/actions'
import { User } from '@/components/icons'
import { cn } from '@/lib/cn'

import s from './LogOutButton.module.scss'

export const LogOutButton = () => {
  const [ isPending, startTransition ] = useTransition()

  const handleClick = () => startTransition(logOut)

  return (
    <button
      onClick={handleClick}
      className={cn(s.button, {
        [`${s.pending}`]: isPending,
      })}
    >
      <User />
      Logout
    </button>
  )
}
