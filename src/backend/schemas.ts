import z from 'zod'

export const TokenExpiresRequestOptionSchema = z.object({
  expiresInMins: z.number().optional(),
})
export type TokenExpiresRequestOption = z.infer<
  typeof TokenExpiresRequestOptionSchema
>

export const TokensDTOSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})
export type TokensDTO = z.infer<typeof TokensDTOSchema>

export const LogInRequestDataDTOSchema = TokenExpiresRequestOptionSchema.extend(
  {
    username: z.string(),
    password: z.string(),
  },
)
export type LogInRequestDataDTO = z.infer<typeof LogInRequestDataDTOSchema>

export const UserDTOSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  image: z.string(),
})
export type UserDTO = z.infer<typeof UserDTOSchema>

export const LogInResponseDTOSchema = TokensDTOSchema.extend(
  UserDTOSchema.pick({
    id: true,
    username: true,
    email: true,
    firstName: true,
    lastName: true,
    gender: true,
    image: true,
  }).shape,
)
export type LogInResponseDTO = z.infer<typeof LogInResponseDTOSchema>

export const RefreshRequestDTOSchema = TokenExpiresRequestOptionSchema.extend(
  TokensDTOSchema.pick({ refreshToken: true }).shape,
)
export type RefreshRequestDTO = z.infer<typeof RefreshRequestDTOSchema>

export const RefreshResponseDTOSchema = TokensDTOSchema
export type RefreshResponseDTO = z.infer<typeof RefreshResponseDTOSchema>

export const ApiErrorSchema = z.object({
  message: z.string(),
})
export type ApiError = z.infer<typeof ApiErrorSchema>
