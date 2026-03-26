import Image from 'next/image'
import Link from 'next/link'

import { getCurrentUser } from '@/auth/currentUser'
import { AddToCart } from '@/components/AddToCart'
import { cn } from '@/lib'

import s from './ProductCard.module.scss'

import type { LatestProductsItem } from '../schemas'

export interface ProductCardProps {
  product: LatestProductsItem,
  priorityImage?: boolean,
  className?: string,
}

const CURRENCY_CHAR = '$'

export const ProductCard = async ({
  product,
  priorityImage,
  className,
}: ProductCardProps) => {
  const user = await getCurrentUser()

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
        <Link href="#" className={s.title}>
          {product.title}
        </Link>
        <div className={s.category}>{product.category}</div>
        <div className={s.price}>
          {CURRENCY_CHAR}
          {product.price}
        </div>
      </div>

      {user && <AddToCart productId={product.id} />}
    </article>
  )
}
