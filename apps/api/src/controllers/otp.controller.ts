import type { NextFunction, Request, Response } from 'express'
import { VerifyOtpSchema } from '../schema/otp.schema'
import { generateZodErrorObj } from '../utils/generator-zod-error-obj'
import { UserModel } from '../models/user.model'
import { generateJwtToken } from '../lib/generate-jwt-token'
import { logger } from '../lib/logger'
import { API_STATUS_RECORDS } from '@repo/constants/api.const'

export async function verifyOtp(req: Request, res: Response, next: NextFunction) {
   try {
      // get time for comparing the otp expiration
      const time = new Date()

      const schemaResult = VerifyOtpSchema.safeParse(req.body)
      if (schemaResult.success === false) {
         const errObj = generateZodErrorObj(schemaResult.error.issues)
         return res
            .status(API_STATUS_RECORDS['bad-request'])
            .send({ status: 'error', errors: errObj, message: 'Invalid payload.' })
      }
      const { email, otp } = req.body
      const user = await UserModel.findOne({ email, otp })
      if (!user) {
         return res
            .status(API_STATUS_RECORDS['bad-request'])
            .send({ status: 'error', message: 'Otp verification failed.' })
      }

      // otp is expired
      if (user.otp_expires_at && time > user.otp_expires_at) {
         return res.status(API_STATUS_RECORDS['bad-request']).send({
            status: 'error',
            message: 'Otp expired.',
         })
      }

      // reset otp details and update verification status
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
      res.status(API_STATUS_RECORDS['bad-request']).send({ status: 'error', message: 'Otp verification failed.' })
   }
}
