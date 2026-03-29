import { cacheTag } from 'next/cache'

import { BannerHeader } from './BannerHeader'
import { NavBar } from './NavBar'
import { TopHeader } from './TopHeader'

export const Header = async () => {
  'use cache'
  cacheTag('header')

  return (
    <header>
      {/* TODO МБ position: sticky? */}
      <TopHeader />
      <BannerHeader />
      <NavBar />
    </header>
  )
}
