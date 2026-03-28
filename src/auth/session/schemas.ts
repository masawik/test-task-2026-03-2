import { TokensDTOSchema } from '@/backend'
import { stringToDate } from '@/lib/schemaUtils'

import type z from 'zod'

export const SessionPayloadSchema = TokensDTOSchema.extend({
  refreshAfter: stringToDate,
})

export type SessionPayload = z.infer<typeof SessionPayloadSchema>
