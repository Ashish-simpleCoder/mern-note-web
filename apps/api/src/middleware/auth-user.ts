import type { NextFunction, Request, Response } from 'express'
import type { User } from '../models/user.model'
import { verify } from 'jsonwebtoken'

export function authUser(req: Request, res: Response, next: NextFunction) {
   const secret = process.env.TOKEN_SECRET || 'yoursecretkey'
   const token = req.headers?.authorization?.split(' ')?.[1]
   if (!token) {
      return res.status(401).send({ status: 'error', error: 'unauthorized user' })
   }

   verify(token, secret, { complete: true }, (error, decoded_token) => {
      if (error) {
         return res.status(401).json({ status: 'error', message: 'Session has been expired', name: error?.name })
         // if (error?.name == 'TokenExpiredError') {
         //    return res.status(401).json({ status: 'error', message: 'Session has been expired', name: error?.name });
         // }
         // else if (error?.name == 'JsonWebTokenError') {
         //    return res.status(401).json({ status: 'error', message: '', name:error?.name });
         // }
         // return res.status(401).send({ status: "error", error: 'unauthorized user', errors: error })
      }
      if (decoded_token) {
         ;(req as Request & { user: User }).user = decoded_token.payload as User
      }
      next()
   })
}
