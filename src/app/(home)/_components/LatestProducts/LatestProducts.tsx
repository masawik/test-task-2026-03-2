import { cacheTag } from 'next/cache'

import { getLatestProducts } from './api'
import s from './LatestProducts.module.scss'
import { ProductCard } from './ProductCard'

// On the desktop, the first 6 images are above the fold line
const PRIORITY_IMAGES_COUNT = 6

export const LatestProducts = async () => {
  'use cache'
  cacheTag('latestProducts')

  const items = await getLatestProducts()

  return (
    <section className={s.container}>
      <h1 className={s.title}>Latest Products</h1>

      <ul className={s.productsList} aria-label="prducts list">
        {items.products.map((p, index) => (
          <li key={p.id}>
            <ProductCard
              className={s.productsList__item}
              product={p}
              priorityImage={index <= PRIORITY_IMAGES_COUNT}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
