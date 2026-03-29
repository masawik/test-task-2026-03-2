'use client'

import {
  createContext,
  useState,
  useContext,
  use,
  useEffectEvent,
  useEffect,
} from 'react'
import { useStore } from 'zustand'

import { createUserStore } from './store'

import type { UserStore } from './store'
import type { UserDTO } from '@/backend'

export type UserStoreApi = ReturnType<typeof createUserStore>

export const UserStoreContext = createContext<UserStoreApi | undefined>(
  undefined,
)

export type UserStoreProviderProps = React.PropsWithChildren & {
  initialState?: Parameters<typeof createUserStore>[0],
}

export const UserStoreProvider = ({
  children,
  initialState,
}: UserStoreProviderProps) => {
  const [ store ] = useState(() => createUserStore(initialState))

  return (
    <UserStoreContext.Provider value={store}>
      {children}
    </UserStoreContext.Provider>
  )
}

export interface HydrateUserProps {
  userPromise: Promise<null | UserDTO>,
}

export function HydrateUser({ userPromise }: HydrateUserProps) {
  const user = use(userPromise)
  const setUser = useUserStore((s) => s.setUser)

  const dataId = user?.id || user

  const updateUser = useEffectEvent(() => setUser(user))
  useEffect(updateUser, [ dataId, updateUser ])

  return null
}

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const ctx = useContext(UserStoreContext)
  if (!ctx) {
    throw new Error(`useUserStore must be used within UserStoreProvider`)
  }

  return useStore(ctx, selector)
}
