import { z } from 'zod'

export const SignUpSchema = z.object({
   email: z
      .string({ required_error: 'Email is required', invalid_type_error: 'Email is invalid' })
      .trim()
      .email('Provide valid email'),
   password: z.string({ required_error: 'Password is required', invalid_type_error: 'Password is invalid' }).trim(),
})
export const LoginSchema = z.object({
   email: z
      .string({ required_error: 'Email is required', invalid_type_error: 'Email is invalid' })
      .trim()
      .email('Provide valid email'),
   password: z.string({ required_error: 'Password is required', invalid_type_error: 'Password is invalid' }).trim(),
})
