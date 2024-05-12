import type { EmailTemplate } from '../email-templates'

import nodeMailer from 'nodemailer'

import { ENV } from '../config/env.config'
import { EmailTemplates } from '../email-templates'
import { renderView } from '../lib/render-template'

// nodemailer
export async function sendEmailOtp(
   template_type: EmailTemplate,
   { to_email, otp, expire }: { to_email: string; otp: string; expire: string }
) {
   try {
      const payload: nodeMailer.SendMailOptions = {
         from: ENV.emailing.from_email,
         to: to_email,
         subject: 'Email Verification',
         html: renderView(EmailTemplates[template_type], { otp, expire }),
      }
      sendEmail(payload)
   } catch (err) {
      console.log(JSON.stringify(err))
   }
}

export async function sendEmail(payload: nodeMailer.SendMailOptions) {
   try {
      const isDevMode = ENV.mode === 'prod'

      const config = {
         host: 'sandbox.smtp.mailtrap.io',
         port: 2525,
         secure: isDevMode,
         auth: { user: ENV.emailing.user, pass: ENV.emailing.password },
      }

      const transporter = nodeMailer.createTransport(config)

      transporter.sendMail(payload, (error) => {
         if (error) {
            console.log('email error', error)
         } else {
            console.log('sent')
         }
      })
   } catch (err) {
      console.log(JSON.stringify(err))
   }
}

// // sendgrid
// export async function sendEmailOtp(
//    { email, otp, expire }: { email: string; otp: string; expire: string },
//    email_template: EmailTemplate
// ) {
//    try{
//       sgMail.setApiKey(ENV.sg_api_key)
//       const msg_obj: sgMail.MailDataRequired | sgMail.MailDataRequired[] = {
//          to: email,
//          from: 'xtreme.flash0299and9920@protonmail.com',
//          subject: 'Verification Mail',
//          html: 'this is awesome',
//          text:"this is text"
//          // html: renderView(EmailTemplates[email_template], { otp, expire }),
//       }

//       await sgMail.send(msg_obj,false,(err, res)=>{
//          console.log(err, res)
//       })
//    }catch(err){
//       console.log(JSON.stringify(err))
//    }
// }
