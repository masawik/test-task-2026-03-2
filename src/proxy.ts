import { NextResponse } from 'next/server'

import { handleSessionRefresh } from '@/auth/session/proxy'

import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const refreshedResponse = await handleSessionRefresh(request)
  if (refreshedResponse) return refreshedResponse

  return NextResponse.next()
}

export const config = {
  matcher: [ '/((?!_next/static|_next/image|favicon).*)' ],
}
