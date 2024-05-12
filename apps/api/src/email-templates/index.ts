import { VerifyEmailTemplate } from './verify-email.template'

export const EmailTemplates = {
   'verify-email': VerifyEmailTemplate,
   'forgot-password': VerifyEmailTemplate,
   'reset-password': VerifyEmailTemplate,
} as const

export type EmailTemplate = keyof typeof EmailTemplates
