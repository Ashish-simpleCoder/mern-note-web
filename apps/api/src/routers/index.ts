import { Router } from 'express'

import * as userController from '../controllers/user.controller'
import * as noteController from '../controllers/note.controller'
import { authUser } from '../middleware/auth-user'
import { isBodyEmpty } from '../middleware/is-body-empty'

const router = Router()

// auth
router.post('/api/user/register', isBodyEmpty, userController.register)
router.post('/api/user/otp-verify', isBodyEmpty, userController.register)
router.post('/api/user/login', isBodyEmpty, userController.login)
router.route('/api/user/logout').get(userController.logout)

// notes
router.post('/api/user/note', authUser, isBodyEmpty, noteController.noteCreate)
router.get('/api/user/notes', authUser, noteController.getAllNotes)
router.route('/api/user/note/:id').patch(authUser, noteController.noteUpdate).delete(authUser, noteController.noteDelete)

// route not found
router.get('*', (req, res) => res.status(404).send({ status: 'error', message: 'Route not found.' }))
router.post('*', (req, res) => res.status(404).send({ status: 'error', message: 'Route not found.' }))
router.put('*', (req, res) => res.status(404).send({ status: 'error', message: 'Route not found.' }))
router.patch('*', (req, res) => res.status(404).send({ status: 'error', message: 'Route not found.' }))

export default router
