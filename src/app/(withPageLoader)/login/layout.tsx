import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/auth/currentUser'

import type { Metadata } from 'next'

type LogInLayoutProps = React.PropsWithChildren

export const metadata: Metadata = {
  title: 'Login',
}

export default async function LogInLayout({ children }: LogInLayoutProps) {
  const user = await getCurrentUser()

  if (user) return redirect('/', 'replace')

  return children
}
