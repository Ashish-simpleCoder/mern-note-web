import type { Dialect } from 'sequelize'

export const ENV = {
   mode: process.env.MODE,
   url: process.env.API_URL,
   port: process.env.API_PORT,
   token_secret: process.env.TOKEN_SECRET!,
   db: {
      host: process.env.DB_HOST!,
      name: process.env.DB_NAME!,
      username: process.env.DB_USERNAME!,
      password: process.env.DB_PASSWORD!,
      cluster_url: process.env.CLUSTER_URL!,
      dialect: process.env.DB_DIALECT as Dialect | undefined,
   },
   sg_api_key: process.env.SG_API_KEY!,
   emailing: {
      from_email: process.env.FROM_EMAIL!,
      user: process.env.USER_ID!,
      password: process.env.PASSWORD!,
   },
   otp_length: Number(process.env.OTP_LENGTH!),
   otp_expire_min: Number(process.env.OTP_EXPIRE_MIN!),
} as const
