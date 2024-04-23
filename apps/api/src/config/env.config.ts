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
} as const
