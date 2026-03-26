import { LatestProducts } from './_components/LatestProducts/LatestProducts'
import s from './page.module.scss'

export default async function Home() {
  return (
    <main className={s.container}>
      <LatestProducts />
    </main>
  )
}
