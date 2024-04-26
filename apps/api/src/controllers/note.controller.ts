import { NextFunction, Request, Response } from 'express'
import { NoteModel } from '../models/note.model'
import { getAuthToken } from '../utils/get-auth-token'
import { decodeJwtToken } from '../lib/decode-jwt-token'
import { User } from 'src/models/user.model'

export async function noteCreate(req: Request, res: Response, next: NextFunction) {
   try {
      const token = getAuthToken(req)
      if (!token) {
         return res.send({ status: 401, error: 'unauthorized user' })
      }
      const user = decodeJwtToken(token)
      if (!user) {
         return res.send({ status: 401, error: 'unauthorized user' })
      }

      const note = await NoteModel.create({ ...req.body, user_id: (user as User)._id })
      if (!note) {
         return res.status(500).send({
            status: 'error',
            message: 'Failed to create the note.',
         })
      }
      res.status(201).send({
         status: 'success',
         message: 'Note created successfully',
         note,
      })
   } catch (err) {
      res.status(500).send({
         status: 'error',
         message: 'Failed to create the note.',
         error: err,
      })
   }
}

export async function getAllNotes(req: Request, res: Response, next: NextFunction) {
   try {
      const token = getAuthToken(req)
      if (!token) {
         return res.send({ status: 401, error: 'unauthorized user' })
      }
      const user = decodeJwtToken(token)
      if (!user) {
         return res.send({ status: 401, error: 'unauthorized user' })
      }

      const notes = (await NoteModel.find({ user_id: (user as User)._id })).reverse()

      if (!notes) {
         return res.status(500).send({
            status: 'error',
            message: 'Failed to get the notes.',
         })
      }
      res.status(201).send({
         status: 'success',
         message: 'Notes fetched successfully.',
         notes,
      })
   } catch (err) {
      return res.status(500).send({
         status: 'error',
         message: 'Failed to get the notes.',
      })
   }
}

export async function noteUpdate(req: Request, res: Response, next: NextFunction) {
   try {
   } catch (err) {}
}

export async function noteDelete(req: Request, res: Response, next: NextFunction) {
   try {
      const token = getAuthToken(req)
      if (!token) {
         return res.send({ status: 401, error: 'unauthorized user' })
      }
      const user = decodeJwtToken(token)
      if (!user) {
         return res.send({ status: 401, error: 'unauthorized user' })
      }

      const note = await NoteModel.findOneAndDelete({ _id: req.params.id, user_id: (user as User)._id })
      if (!note) {
         return res.status(404).send({ status: 'error', message: 'Note not found.' })
      }

      return res.send({ status: 'success', message: 'Note deleted successfully.' })
   } catch (err) {
      return res.status(500).send({ status: 'error', message: 'Something went wrong.', err })
   }
}
