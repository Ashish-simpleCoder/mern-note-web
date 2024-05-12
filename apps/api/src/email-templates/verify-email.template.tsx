export function VerifyEmailTemplate({ otp, expire }: { otp: string; expire: string }) {
   return (
      <div>
         <p>Your verification otp is {otp}</p>
         <p>It will expire after {expire}</p>
      </div>
   )
}
