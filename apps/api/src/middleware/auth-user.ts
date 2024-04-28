import type { NextFunction, Request, Response } from 'express'
import type { User } from '../models/user.model'
import { verify } from 'jsonwebtoken'

export function authUser(req: Request, res: Response, next: NextFunction) {
   const secret = process.env.TOKEN_SECRET || 'yoursecretkey'
   const token = req.headers?.authorization?.split(' ')?.[1]
   if (!token) {
      return res.send({ status: 401, error: 'unauthorized user' })
   }

   verify(token, secret, { complete: true }, (err, decoded_token) => {
      if (err || !decoded_token) return res.send({ status: 401, error: 'unauthorized user' })
      ;(req as Request & { user: User }).user = decoded_token.payload as User
      next()
   })
}
