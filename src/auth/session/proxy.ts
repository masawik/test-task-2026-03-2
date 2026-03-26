import { NextResponse } from 'next/server'

import { isAfter } from '@/lib/datetime'

import {
  buildSessionEncoding,
  SESSION_COOKIE_CONFIG,
  SESSION_COOKIE_NAME,
} from './config'
import { decodeSessionPayload } from './sessionCrypto'

import type { TokensDTO } from '@/backend'
import type { NextRequest } from 'next/server'

/** Убирает cookie с именем `name` из заголовка `Cookie` (для проброса в SSR). */
const cookieHeaderWithoutName = (cookieHeader: string, name: string) => {
  const next = cookieHeader
    .split('; ')
    .filter((c) => !c.startsWith(`${name}=`))
    .join('; ')
  return next.length > 0 ? next : null
}

const fetchRefreshedTokens = async (
  refreshToken: string,
): Promise<TokensDTO | null> => {
  try {
    const response = await fetch(`${process.env.API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken,
        expiresInMins: Number(process.env.DUMMY_TOKEN_EXPIRES_IN_MINS),
      }),
    })

    if (!response.ok) return null

    return response.json() as Promise<TokensDTO>
  } catch {
    return null
  }
}

/**
 * Проверяет сессию и проактивно обновляет токены, если истёк refreshAfter.
 * Возвращает NextResponse при успешном рефреше, при сбросе сессии (рефреш не удался)
 * или null, если рефреш не требовался.
 */
export const handleSessionRefresh = async (
  request: NextRequest,
): Promise<NextResponse | null> => {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value
  if (!sessionCookie) return null

  const session = await decodeSessionPayload(sessionCookie)
  if (!session) return null

  if (!isAfter(new Date(), session.refreshAfter)) return null

  const newTokens = await fetchRefreshedTokens(session.refreshToken)
  if (!newTokens) {
    const requestHeaders = new Headers(request.headers)
    const existingCookies = request.headers.get('cookie') ?? ''
    const withoutSession = cookieHeaderWithoutName(
      existingCookies,
      SESSION_COOKIE_NAME,
    )
    if (withoutSession) {
      requestHeaders.set('cookie', withoutSession)
    } else {
      requestHeaders.delete('cookie')
    }

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    })
    response.cookies.delete({
      name: SESSION_COOKIE_NAME,
      ...SESSION_COOKIE_CONFIG,
    })
    return response
  }

  const { encodedSession, expiresAt } = await buildSessionEncoding(
    newTokens,
    Number(process.env.DUMMY_TOKEN_EXPIRES_IN_MINS),
  )

  // Обновляем cookie в заголовках запроса, чтобы SSR-рендеринг
  // на этом же запросе уже видел свежую сессию
  const requestHeaders = new Headers(request.headers)
  const existingCookies = request.headers.get('cookie') ?? ''
  const updatedCookies = [
    cookieHeaderWithoutName(existingCookies, SESSION_COOKIE_NAME) ?? '',
    `${SESSION_COOKIE_NAME}=${encodedSession}`,
  ]
    .filter(Boolean)
    .join('; ')
  requestHeaders.set('cookie', updatedCookies)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  // Устанавливаем обновлённую cookie на ответ браузеру
  response.cookies.set(SESSION_COOKIE_NAME, encodedSession, {
    ...SESSION_COOKIE_CONFIG,
    expires: expiresAt,
  })

  return response
}
