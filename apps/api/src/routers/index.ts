import { Router } from 'express'

import * as userController from '../controllers/user.controller'
import { getAllNotes, noteCreate, noteDelete, noteUpdate } from '../controllers/note.controller'
import { authUser } from '../middleware/auth-user'
import { isBodyEmpty } from '../middleware/is-body-empty'

const router = Router()

router.use('*', (req, res, next) => {
   if (req.method == 'POST') {
      isBodyEmpty(req, res, next)
   }
   next()
})

// auth
router.post('/api/user/register', userController.register)
router.post('/api/user/otp-verify', userController.register)
router.post('/api/user/login', userController.login)
router.route('/api/user/logout').get(userController.logout)

// notes
router.post('/api/user/note', authUser, isBodyEmpty, noteCreate)
router.get('/api/user/notes', authUser, getAllNotes)
router.route('/api/user/note/:id').patch(authUser, noteUpdate).delete(authUser, noteDelete)

// route not found
router.get('*', (req, res) => res.status(404).send({ status: 'error', message: 'Route not found.' }))
router.post('*', (req, res) => res.status(404).send({ status: 'error', message: 'Route not found.' }))
router.put('*', (req, res) => res.status(404).send({ status: 'error', message: 'Route not found.' }))
router.patch('*', (req, res) => res.status(404).send({ status: 'error', message: 'Route not found.' }))

export default router
