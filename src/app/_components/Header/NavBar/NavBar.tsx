import { AppLink } from '@/components/AppLink'

import s from './NavBar.module.scss'

const ROUTES = [
  { href: '/', title: 'Home' },
  { href: '#', title: 'Hot Deals' },
  { href: '#', title: 'Categories' },
  { href: '#', title: 'Laptops' },
  { href: '#', title: 'Smartphones' },
  { href: '#', title: 'Cameras' },
  { href: '#', title: 'Accessories' },
]

export const NavBar = () => {
  return (
    <nav className={s.container} aria-label="Основное меню">
      <div className={s.content}>
        <ul className={s.list}>
          {ROUTES.map((route) => (
            <li key={route.title}>
              <AppLink href={route.href} className={s.tab}>
                {route.title}
              </AppLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
