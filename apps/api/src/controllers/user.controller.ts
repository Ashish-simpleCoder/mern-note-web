import type { NextFunction, Request, Response } from 'express'
import { compare } from 'bcrypt'
import { MongooseError } from 'mongoose'

import { generateJwtToken } from '../lib/generate-jwt-token'
import { UserModel } from '../models/user.model'
import * as otpService from '../services/otp.service'
import { generateOtp } from '../utils/generate-otp'
import { logger } from '../lib/logger'
import { LoginSchema, SignUpSchema } from '../schema/auth.schema'
import { generateZodErrorObj } from '../utils/generator-zod-error-obj'
import { API_STATUS_RECORDS } from '@repo/constants/api.const'

export async function register(req: Request, res: Response, next: NextFunction) {
   try {
      const schemaError = SignUpSchema.safeParse(req.body)
      if (schemaError.success === false) {
         const errObj = generateZodErrorObj(schemaError.error.issues)
         return res
            .status(API_STATUS_RECORDS['bad-request'])
            .send({ status: 'error', errors: errObj, message: 'validation error.' })
      }

      const otp_obj = generateOtp()
      await UserModel.create({ ...req.body, ...otp_obj })
      await otpService.sendEmailOtp('verify-email', { to_email: req.body.email, otp: otp_obj.otp, expire: '2 minutes' })

      res.status(API_STATUS_RECORDS.created).send({
         status: 'success',
         message: 'We have sent an OTP on your email for verification.',
      })
   } catch (err) {
      logger.error('Error on creating user: ', err)
      if (err instanceof MongooseError && err.message.includes('validation error.')) {
         // @ts-ignore
         const errObj = Object.keys(err.errors).reduce((acc, key) => {
            // @ts-ignore
            acc[key] = err.errors[key].message
            return acc
         }, {})
         return res.status(API_STATUS_RECORDS['bad-request']).send({
            status: 'error',
            message: 'Failed to register the user. Please try again.',
            errors: errObj,
         })
      }
      // @ts-ignore
      if ('errorResponse' in err && err.errorResponse.code && err.errorResponse.code == 11000) {
         return res.status(API_STATUS_RECORDS['bad-request']).send({
            status: 'error',
            message: 'Email is already registered. Please provide different email.',
         })
      }
      res.status(API_STATUS_RECORDS['unprocessable-entity']).send({
         status: 'error',
         message: 'Failed to register the user. Please try again.',
         errors: err,
      })
   }
}

export async function login(req: Request, res: Response, next: NextFunction) {
   try {
      const { email, password } = req.body
      const schemaError = LoginSchema.safeParse(req.body)
      if (schemaError.success === false) {
         const errObj = generateZodErrorObj(schemaError.error.issues)
         return res.status(API_STATUS_RECORDS['bad-request']).send({ status: 'error', errors: errObj })
      }

      const user = await UserModel.findOne({ email })
      if (!user) {
         logger.error('Login: User not found with email=', email)
         return res.status(API_STATUS_RECORDS['bad-request']).send({ status: 'error', message: 'Invalid credentials' })
      }

      const isPasswordMatched = await compare(password, user.password)
      if (!isPasswordMatched) {
         logger.error('Login: Password is invalid for email=', email)
         return res.status(API_STATUS_RECORDS['bad-request']).send({ status: 'error', message: 'Invalid credentials' })
      }

      res.send({
         status: 'success',
         message: 'User logged in successfully.',
         id: user._id,
         email,
         accessToken: generateJwtToken({ email: user.email, _id: user._id }),
         refreshToken: generateJwtToken({ email: user.email, _id: user._id }, { expiresIn: '1 day' }),
      })
   } catch (err) {
      logger.error('Login: Error=', err)
      res.status(API_STATUS_RECORDS['bad-request']).send({ status: 'error', message: 'Invalid credentials' })
   }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
   try {
   } catch (err) {}
}
