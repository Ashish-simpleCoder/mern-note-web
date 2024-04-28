import { NextFunction, Request, Response } from 'express'
import { isEmptyObj } from '../utils'

export function isBodyEmpty(req: Request, res: Response, next: NextFunction) {
   if (isEmptyObj(req.body)) {
      return res.status(400).send({ status: 'error', message: 'Please add body' })
   }
   next()
}
