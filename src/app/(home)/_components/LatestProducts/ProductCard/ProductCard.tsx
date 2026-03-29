import Image from 'next/image'

import { AppLink } from '@/components/AppLink'
import { cn } from '@/lib/cn'

import { AddToCartIfAuth } from './AddToCartIfAuth'
import s from './ProductCard.module.scss'

import type { LatestProductsItem } from '../schemas'

export interface ProductCardProps {
  product: LatestProductsItem,
  priorityImage?: boolean,
  className?: string,
}

const CURRENCY_CHAR = '$'

export const ProductCard = ({
  product,
  priorityImage,
  className,
}: ProductCardProps) => {
  return (
    <article className={cn(s.Card, className)}>
      {/* TODO Schema.org */}
      <div className={s.imageContainer}>
        <Image
          className={s.image}
          src={product.thumbnail}
          alt={product.title}
          loading={priorityImage ? 'eager' : undefined}
          fetchPriority={priorityImage ? 'high' : 'auto'}
          width={300}
          height={300}
        />
      </div>

      <div className={s.info}>
        <AppLink href="/test" className={s.title}>
          {product.title}
        </AppLink>
        <div className={s.category}>{product.category}</div>
        <div className={s.price}>
          {CURRENCY_CHAR}
          {product.price}
        </div>
      </div>

      <AddToCartIfAuth productId={product.id} />
    </article>
  )
}
