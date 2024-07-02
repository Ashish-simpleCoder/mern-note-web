import type { ObjectId } from 'mongoose'
import mongoose from 'mongoose'
import { hash, genSalt } from 'bcrypt'

const userSchema = new mongoose.Schema({
   email: {
      type: String,
      unique: true,
      required: [true, 'email is required'],
      timestamp: true,
   },
   password: {
      type: String,
      required: [true, 'password is required'],
      timestamp: true,
   },
   otp: {
      type: String,
   },
   otp_expires_at: {
      type: Date,
   },
   is_verified: {
      type: Boolean,
      default: false,
   },
})

userSchema.pre('save', async function (next) {
   if (this.isModified('password')) {
      this.password = await hash(this.password, await genSalt(10))
      next()
   }
})
export type User = Document & {
   _id: ObjectId
   email: string
   password: string
}
export const UserModel = mongoose.model('users', userSchema)
