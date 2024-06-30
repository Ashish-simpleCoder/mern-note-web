import type { NextFunction, Request, Response } from 'express'
import { VerifyOtpSchema } from '../schema/otp.schema'
import { generateZodErrorObj } from '../utils/generator-zod-error-obj'
import { UserModel } from '../models/user.model'
import { generateJwtToken } from '../lib/generate-jwt-token'
import { logger } from '../lib/logger'

export async function verifyOtp(req: Request, res: Response, next: NextFunction) {
   try {
      const schemaResult = VerifyOtpSchema.safeParse(req.body)
      if (schemaResult.success === false) {
         const errObj = generateZodErrorObj(schemaResult.error.issues)
         return res.status(400).send({ status: 'error', error: errObj, message: 'Invalid payload.' })
      }
      const { email, otp } = req.body
      const user = await UserModel.findOne({ email, otp })
      if (!user) {
         return res.status(400).send({ status: 'error', message: 'Otp verification failed.' })
      }
      await user.updateOne({ otp: '', otp_expires_at: '', is_verified: true })

      res.send({
         status: 'success',
         message: 'Otp verified successfully.',
         id: user._id,
         email,
         accessToken: generateJwtToken({ email: user.email, _id: user._id }),
         refreshToken: generateJwtToken({ email: user.email, _id: user._id }, { expiresIn: '1 day' }),
      })
   } catch (err) {
      logger.error('Error on login: ', err)
      res.status(400).send({ status: 'error', message: 'Otp verification failed.' })
   }
}
