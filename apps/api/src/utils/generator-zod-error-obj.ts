import { ZodIssue } from 'zod'

export function generateZodErrorObj(errors: ZodIssue[]) {
   return errors.reduce(
      (acc, err) => {
         const path = err.path[0]
         if (path) {
            acc[path] = err.message
         }
         return acc
      },
      {} as Record<string, string>
   )
}
