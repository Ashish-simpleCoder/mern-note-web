export type ExpireTime =
   | '1 min'
   | '30 mins'
   | '1 hour'
   | '2 hours'
   | '5 hours'
   | '10 hours'
   | '1 day'
   | '15 days'
   | '30 days'

export const Expires = {
   in(time: ExpireTime) {
      switch (time) {
         case '1 min':
            return 1000 * 60
         case '30 mins':
            return 1000 * 60 * 30
         case '1 hour':
            return 1000 * 60 * 60
         case '2 hours':
            return 1000 * 60 * 60 * 2
         case '5 hours':
            return 1000 * 60 * 60 * 5
         case '10 hours':
            return 1000 * 60 * 60 * 10
         case '1 day':
            return 1000 * 60 * 60 * 24
         case '15 days':
            return 1000 * 60 * 60 * 24 * 15
         case '30 days':
            return 1000 * 60 * 60 * 24 * 30

         default:
            return 1000 * 60
      }
   },
}
