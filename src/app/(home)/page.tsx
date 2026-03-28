import { LatestProducts } from './_components/LatestProducts/LatestProducts'
import s from './page.module.scss'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Abelohost Shop',
}

export default async function Home() {
  return (
    <main className={s.container}>
      <LatestProducts />
    </main>
  )
}
