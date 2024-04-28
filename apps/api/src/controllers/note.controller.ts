import { NextFunction, Request, Response } from 'express'
import { NoteModel } from '../models/note.model'
import { User } from '../models/user.model'

export async function noteCreate(req: Request, res: Response, next: NextFunction) {
   try {
      const note = await NoteModel.create({
         ...req.body,
         user_id: ((req as Request & { user: User }).user as User)._id,
      })
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
      const notes = (await NoteModel.find({ user_id: ((req as Request & { user: User }).user as User)._id })).reverse()

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
      const note = await NoteModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      if (!note) {
         return res.status(404).send({ status: 'error', message: 'Note not found.' })
      }
      return res.send({ status: 'success', message: 'Note updated successfully.', note })
   } catch (err) {
      return res.status(500).send({ status: 'error', message: 'Something went wrong.', err })
   }
}

export async function noteDelete(req: Request, res: Response, next: NextFunction) {
   try {
      const note = await NoteModel.findOneAndDelete({
         _id: req.params.id,
         user_id: ((req as Request & { user: User }).user as User)._id,
      })
      if (!note) {
         return res.status(404).send({ status: 'error', message: 'Note not found.' })
      }

      return res.send({ status: 'success', message: 'Note deleted successfully.' })
   } catch (err) {
      return res.status(500).send({ status: 'error', message: 'Something went wrong.', err })
   }
}
