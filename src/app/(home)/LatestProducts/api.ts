import { cacheTag } from 'next/cache'

import { backendApi } from '@/backend/api'
import { objectKeys } from '@/lib'

import { LatestProductsItemSchema } from './schemas'

const ITEMS_TO_SHOW = 12

export const getLatestProducts = async () => {
  'use cache'
  cacheTag('latestProducts')

  return backendApi.getProducts({
    select: objectKeys(LatestProductsItemSchema.shape),
    limit: ITEMS_TO_SHOW,
  })
}
