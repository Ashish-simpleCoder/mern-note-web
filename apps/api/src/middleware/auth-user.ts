import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export function authUser(req: Request, res: Response, next: NextFunction) {
   const secret = process.env.TOKEN_SECRET || 'yoursecretkey'
   const token = req.headers?.authorization?.split(' ')?.[1]
   if (!token) {
      return res.send({ status: 401, error: 'unauthorized user' })
   }

   verify(token, secret, { complete: true }, (err, decoded_token) => {
      if (err) return res.send({ status: 401, error: 'unauthorized user' })
      next()
   })
}
