import { z } from 'zod'

export const VerifyOtpSchema = z.object({
   email: z
      .string({ required_error: 'Email is required', invalid_type_error: 'Email is invalid' })
      .trim()
      .email('Provide valid email'),
   otp: z.string({ required_error: 'Otp is required', invalid_type_error: 'Otp is invalid' }).trim(),
})
