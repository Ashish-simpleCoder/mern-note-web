import { NextFunction, Request, Response } from 'express'
import { generateJwtToken } from '../lib/generate-jwt-token'
import { UserModel } from '../models/user.model'
import { compare } from 'bcrypt'

export async function userRegister(req: Request, res: Response, next: NextFunction) {
   try {
      const user = await UserModel.create(req.body)
      res.status(201).send({
         status: 'success',
         message: 'User registered successfully.',
         id: user._id,
         accessToken: generateJwtToken({ email: user.email, _id: user._id }),
         refreshToken: generateJwtToken({ email: user.email, _id: user._id }, { expiresIn: '1 day' }),
      })
   } catch (err) {
      res.status(500).send({
         status: 'error',
         message: 'Failed to register the user.',
         error: err,
      })
   }
}

export async function userLogin(req: Request, res: Response, next: NextFunction) {
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
      return res.status(400).send({ status: 'error', message: 'Invalid credentials' })
   }
}

export async function userLogout(req: Request, res: Response, next: NextFunction) {
   try {
   } catch (err) {}
}
