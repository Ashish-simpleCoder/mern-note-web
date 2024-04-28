import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { decodeJwtToken } from '../lib/decode-jwt-token'
import { User } from '../models/user.model'

export function authUser(req: Request, res: Response, next: NextFunction) {
   const secret = process.env.TOKEN_SECRET || 'yoursecretkey'
   const token = req.headers?.authorization?.split(' ')?.[1]
   if (!token) {
      return res.send({ status: 401, error: 'unauthorized user' })
   }

   verify(token, secret, { complete: true }, (err, decoded_token) => {
      if (err) return res.send({ status: 401, error: 'unauthorized user' })

      const user = decodeJwtToken(token)
      if (!user) {
         return res.send({ status: 401, error: 'unauthorized user' })
      }
      ;(req as Request & { user: User }).user = user as User
      next()
   })
}
