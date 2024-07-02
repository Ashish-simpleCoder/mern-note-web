import type { Prettify } from '@repo/types'
import type { Types } from 'mongoose'
import jwt from 'jsonwebtoken'
import { ENV } from '../config/env.config'
import type { ExpireTime } from '../const/expires.in'
import { Expires } from '../const/expires.in'

type Options = {
   expiresIn?: ExpireTime
}

export function generateJwtToken(
   values: {
      email: string
      _id: Types.ObjectId
   },
   options?: Prettify<Options>
) {
   return jwt.sign(values, ENV.token_secret, {
      expiresIn: options?.expiresIn ?? Expires.in('1 hour'),
   })
}
