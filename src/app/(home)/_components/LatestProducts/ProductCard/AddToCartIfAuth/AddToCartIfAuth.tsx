'use client'

import { Button } from '@/components/Button'
import { useUserStore } from '@/stores/user/context'

import type { ProductDTO } from '@/backend'

export interface AddToCartIfAuthProps {
  productId: ProductDTO['id'],
}

export const AddToCartIfAuth = (_: AddToCartIfAuthProps) => {
  const user = useUserStore((store) => store.user)

  if (!user) return <div role="presentation" className="button-placeholder" />

  return <Button className="button">Add to cart</Button>
}
