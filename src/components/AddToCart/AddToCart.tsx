'use client'

import { Button } from '../Button'

import type { ProductDTO } from '@/backend'

export interface AddToCartProps {
  productId: ProductDTO['id'],
}

export const AddToCart = (_: AddToCartProps) => {
  return <Button className="button">Add to cart</Button>
}
