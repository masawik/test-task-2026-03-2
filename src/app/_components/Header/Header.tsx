import { BannerHeader } from './BannerHeader'
import { NavBar } from './NavBar'
import { TopHeader } from './TopHeader'

export const Header = () => {
  return (
    <header>
      {/* TODO МБ position: sticky? */}
      <TopHeader />
      <BannerHeader />
      <NavBar />
    </header>
  )
}
