'use server'
import { cookies } from 'next/headers'

import { appEnv } from '@/appEnv'
import { parseJSON } from '@/lib'
import { addDays, addMins } from '@/lib/datetime'

import { SessionPayloadSchema } from './schemas'

import type { SessionPayload } from './schemas'
import type { TokensDTO } from '@/backend'
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

const secretKey = process.env.SESSION_SECRET
const SESSION_COOKIE_EXPIRES_IN_DAYS = 7
const SESSION_COOKIE_CONFIG = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  path: '/',
} as const satisfies Partial<ResponseCookie>

const getEncryptionKey = async () => {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secretKey),
    'HKDF',
    false,
    [ 'deriveKey' ],
  )

  return crypto.subtle.deriveKey(
    {
      name: 'HKDF',
      hash: 'SHA-256',
      salt: new Uint8Array(0),
      info: new TextEncoder().encode('session-v1'),
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    [ 'encrypt', 'decrypt' ],
  )
}

const encodeSessionPayload = async (payload: SessionPayload) => {
  const key = await getEncryptionKey()
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(JSON.stringify(payload)),
  )

  const combined = new Uint8Array(iv.byteLength + ciphertext.byteLength)
  combined.set(iv, 0)
  combined.set(new Uint8Array(ciphertext), iv.byteLength)

  return btoa(String.fromCharCode(...combined))
}

const decodeSessionPayload = async (encodedPayload: string) => {
  try {
    const key = await getEncryptionKey()
    const combined = Uint8Array.from(atob(encodedPayload), (c) =>
      c.charCodeAt(0),
    )
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: combined.slice(0, 12) },
      key,
      combined.slice(12),
    )

    const json = new TextDecoder().decode(decrypted)

    return parseJSON(json, {
      safe: true,
      validator: (data: unknown): data is SessionPayload =>
        SessionPayloadSchema.safeParse(data).success,
    })
  } catch {
    return null
  }
}

export const setSessionByTokens = async (tokens: TokensDTO) => {
  const now = new Date()
  const expiresAt = addDays(now, SESSION_COOKIE_EXPIRES_IN_DAYS)
  const refreshAfter = addMins(now, appEnv.DUMMY_TOKEN_EXPIRES_IN_MINS)

  const session = await encodeSessionPayload({
    ...tokens,
    refreshAfter,
  })

  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    ...SESSION_COOKIE_CONFIG,
    expires: expiresAt,
  })
}

export const getSession = async () => {
  const session = (await cookies()).get('session')?.value
  if (!session) return

  const payload = await decodeSessionPayload(session)
  return payload || undefined
}
