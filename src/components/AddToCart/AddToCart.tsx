'use client'

import type { ProductDTO } from '@/backend'

export interface AddToCartProps {
  productId: ProductDTO['id'],
}

export const AddToCart = (_: AddToCartProps) => {
  return <button className="button">Add to cart</button>
}
