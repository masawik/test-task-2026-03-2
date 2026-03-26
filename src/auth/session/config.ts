import { addDays, addMins } from '@/lib/datetime'

import { encodeSessionPayload } from './sessionCrypto'

import type { TokensDTO } from '@/backend'

export const SESSION_COOKIE_NAME = 'session'
export const SESSION_COOKIE_EXPIRES_IN_DAYS = 7
export const SESSION_COOKIE_CONFIG = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax' as const,
  path: '/',
}

export const buildSessionEncoding = async (
  tokens: TokensDTO,
  expiresInMins: number,
) => {
  const now = new Date()
  const expiresAt = addDays(now, SESSION_COOKIE_EXPIRES_IN_DAYS)
  const refreshAfter = addMins(now, expiresInMins)
  const encodedSession = await encodeSessionPayload({
    ...tokens,
    refreshAfter,
  })
  return { encodedSession, expiresAt }
}
