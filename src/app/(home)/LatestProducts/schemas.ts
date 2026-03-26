import { ProductDTOSchema } from '@/backend'

import type z from 'zod'

export const LatestProductsItemSchema = ProductDTOSchema.pick({
  id: true,
  title: true,
  category: true,
  price: true,
  thumbnail: true,
})
export type LatestProductsItem = z.infer<typeof LatestProductsItemSchema>
