import { createStore } from 'zustand/vanilla'

import { type UserDTO } from '@/backend'

export type UserState = { user: UserDTO | null }

export type UserStoreActions = {
  setUser: (user: UserDTO | null) => void,
}
export type UserStore = UserState & UserStoreActions

export const defaultInitState: UserState = { user: null }

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUser: (user) => set((state) => ({ ...state, user })),
  }))
}
