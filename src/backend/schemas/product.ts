import z from 'zod'

import { ResponseItemsOptionsSchema, SelectOptionSchema } from './shared'

const dimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
  depth: z.number(),
})

const reviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  date: z.string(),
  reviewerName: z.string(),
  reviewerEmail: z.string(),
})

const metaSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  barcode: z.string(),
  qrCode: z.string(),
})

export const ProductDTOSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  tags: z.array(z.string()),
  brand: z.string(),
  sku: z.string(),
  weight: z.number(),
  dimensions: dimensionsSchema,
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  availabilityStatus: z.string(),
  reviews: z.array(reviewSchema),
  returnPolicy: z.string(),
  minimumOrderQuantity: z.number(),
  meta: metaSchema,
  images: z.array(z.string()),
  thumbnail: z.string(),
})
export type ProductDTO = z.infer<typeof ProductDTOSchema>

export const ProductsRequestOptionsSchema = SelectOptionSchema
export type ProductsRequestOptions = z.infer<
  typeof ProductsRequestOptionsSchema
>

export const ProductsResponseSchema = ResponseItemsOptionsSchema.extend({
  products: z.array(ProductDTOSchema),
})
export type ProductsResponse<
  Select extends keyof ProductDTO = keyof ProductDTO,
> = Omit<z.infer<typeof ProductsResponseSchema>, 'products'> & {
  products: Pick<ProductDTO, Select>[],
}
