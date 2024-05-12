import otpGenerator from 'otp-generator'

import { ENV } from '../config/env.config'
import { addMinutesToDate } from './add-minutes-to-date'


export function generateOtp() {
    return {
       otp: otpGenerator.generate(ENV.otp_length, {
          digits: true,
          lowerCaseAlphabets: false,
          specialChars: false,
          upperCaseAlphabets: false,
       }),
       otp_expires_at: addMinutesToDate(new Date(), ENV.otp_expire_min),
    }
 }