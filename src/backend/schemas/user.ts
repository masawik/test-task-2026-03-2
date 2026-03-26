import z from 'zod'

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
