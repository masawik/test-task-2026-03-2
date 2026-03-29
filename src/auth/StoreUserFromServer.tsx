import { Suspense } from 'react'

import { HydrateUser } from '@/stores/user/context'

import { getCurrentUser } from './currentUser'

export default async function StoreUserFromServer() {
  const userPromise = getCurrentUser()

  return (
    <Suspense fallback={null}>
      <HydrateUser userPromise={userPromise} />
    </Suspense>
  )
}
