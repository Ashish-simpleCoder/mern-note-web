import Mongoose from 'mongoose'

export type Prettify<T> = {
   [K in keyof T]: T[K]
} & {}

export type Note = Mongoose.Document & {
   _id: Mongoose.ObjectId
   title: string
   body: string
   bg_color: string
   user_id: Mongoose.ObjectId
}
