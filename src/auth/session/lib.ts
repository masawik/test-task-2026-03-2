'use server'
import { cookies } from 'next/headers'
import { cache } from 'react'

import { appEnv } from '@/appEnv'

import {
  buildSessionEncoding,
  SESSION_COOKIE_CONFIG,
  SESSION_COOKIE_NAME,
} from './config'
import { decodeSessionPayload } from './sessionCrypto'

import type { TokensDTO } from '@/backend'

export const setSessionByTokens = async (tokens: TokensDTO) => {
  const { encodedSession, expiresAt } = await buildSessionEncoding(
    tokens,
    appEnv.DUMMY_TOKEN_EXPIRES_IN_MINS,
  )

  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE_NAME, encodedSession, {
    ...SESSION_COOKIE_CONFIG,
    expires: expiresAt,
  })
}

export const getSession = cache(async () => {
  const session = (await cookies()).get(SESSION_COOKIE_NAME)?.value
  if (!session) return

  const payload = await decodeSessionPayload(session)
  return payload || undefined
})

export const clearSession = async () => {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
