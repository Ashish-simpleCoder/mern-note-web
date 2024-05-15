// @ts-nocheck
import type { NextFunction, Request, Response } from 'express'
import { compare } from 'bcrypt'

import { generateJwtToken } from '../lib/generate-jwt-token'
import { UserModel } from '../models/user.model'
import * as otpService from '../services/otp.service'
import { generateOtp } from '../utils/generate-otp'
import { MongooseError } from 'mongoose'
import { logger } from '../lib/logger'
import { LoginSchema } from '../schema/auth.schema'
import { generateZodErrorObj } from '../utils/generator-zod-error-obj'

export async function register(req: Request, res: Response, next: NextFunction) {
   try {
      const schemaError = LoginSchema.safeParse(req.body)
      if (schemaError.success === false) {
         const errObj = generateZodErrorObj(schemaError.error.issues)
         return res.status(400).send({ status: 'error', error: errObj })
      }

      const otp_obj = generateOtp()
      const user = await UserModel.create({ ...req.body, ...otp_obj })
      if (!user) {
         return res.status(500).send({
            status: 'error',
            message: 'Failed to register the user.',
         })
      }

      await otpService.sendEmailOtp('verify-email', { to_email: req.body.email, otp: otp_obj.otp, expire: '2 minutes' })

      res.status(201).send({
         status: 'success',
         message: 'We have sent an OTP on your email for verification.',
      })
   } catch (err) {
      logger.error('Error on creating user: ', err)
      if (err instanceof MongooseError && err.message.includes('validation failed')) {
         const errObj = Object.keys(err.errors).reduce((acc, key) => {
            acc[key] = err.errors[key].message
            return acc
         }, {})
         return res.status(400).send({
            status: 'error',
            message: 'Failed to register the user.',
            error: errObj,
         })
      }
      res.status(500).send({
         status: 'error',
         message: 'Failed to register the user.',
         error: err,
      })
   }
}

export async function login(req: Request, res: Response, next: NextFunction) {
   try {
      const { email, password } = req.body

      const user = await UserModel.findOne({ email })
      if (!user) {
         return res.status(400).send({ status: 'error', message: 'Invalid credentials' })
      }

      const isPasswordMatched = await compare(password, user.password)
      if (!isPasswordMatched) {
         return res.status(400).send({ status: 'error', message: 'Invalid credentials' })
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
      logger.error('Error on login: ', err)
      res.status(400).send({ status: 'error', message: 'Invalid credentials' })
   }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
   try {
   } catch (err) {}
}
