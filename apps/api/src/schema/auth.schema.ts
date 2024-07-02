import { z } from 'zod'

export const emailValidation = z
   .string({ required_error: 'email is required', invalid_type_error: 'email is invalid' })
   .trim()
   .email('provide valid email')

export const passwordValidation = z
   .string({ required_error: 'password is required', invalid_type_error: 'password is invalid' })
   .trim()

export const SignUpSchema = z.object({
   email: emailValidation,
   password: passwordValidation.min(4, 'password length must be greater than 4 characters'),
})
export const LoginSchema = z.object({
   email: emailValidation,
   password: passwordValidation,
})
