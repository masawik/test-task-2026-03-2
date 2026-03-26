import { parseJSON } from '@/lib'

import { SessionPayloadSchema } from './schemas'

import type { SessionPayload } from './schemas'

const getEncryptionKey = async () => {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(process.env.SESSION_SECRET),
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

export const encodeSessionPayload = async (payload: SessionPayload) => {
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

export const decodeSessionPayload = async (encodedPayload: string) => {
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
    const rawPayload = parseJSON(json, { safe: true })
    if (!rawPayload) return null

    const validatedPayload = SessionPayloadSchema.safeParse(rawPayload)
    if (!validatedPayload.success) return null

    return validatedPayload.data
  } catch {
    return null
  }
}
