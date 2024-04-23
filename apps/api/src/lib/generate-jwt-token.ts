import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { ENV } from '../config/env.config'
import { ExpireTime, Expires } from '../const/expires.in'

type Options = {
   expiresIn?: ExpireTime
}

export function generateJwtToken(
   values: {
      email: string
      _id: Types.ObjectId
   },
   options?: Options
) {
   return jwt.sign(values, ENV.token_secret, {
      expiresIn: options?.expiresIn ?? Expires.in('1 hour'),
   })
}
