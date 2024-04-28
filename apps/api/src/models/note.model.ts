import type { ObjectId } from 'mongoose'
import mongoose, { Schema } from 'mongoose'

const noteSchema = new mongoose.Schema({
   title: {
      type: String,
   },
   body: {
      type: String,
   },
   bg_color: {
      type: String,
   },
   user_id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
   },
})

export type Note = Document & {
   _id: ObjectId
   title: string
   body: string
   bg_color: string
   user_id: ObjectId
}
export const NoteModel = mongoose.model('notes', noteSchema)
