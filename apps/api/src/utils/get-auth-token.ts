import { Request } from 'express'

export function getAuthToken(req: Request) {
   try {
      const token = req.headers?.authorization?.split(' ')?.[1]
      return token
   } catch (err) {}
}
