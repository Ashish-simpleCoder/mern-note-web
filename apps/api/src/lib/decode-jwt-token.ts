import jwt from 'jsonwebtoken'
import { ENV } from '../config/env.config'

export function decodeJwtToken(token: string) {
   try {
      const decoded_token = jwt.verify(token, ENV.token_secret)
      return decoded_token
   } catch (err) {}
}
