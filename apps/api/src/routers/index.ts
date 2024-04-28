import { Router } from 'express'
import { userLogin, userLogout, userRegister } from '../controllers/user.controller'
import { getAllNotes, noteCreate, noteDelete, noteUpdate } from '../controllers/note.controller'
import { authUser } from '../middleware/auth-user'
import { isBodyEmpty } from '../middleware/is-body-empty'

const router = Router()

// auth
router.post('/api/user/register', isBodyEmpty, userRegister)
router.post('/api/user/login', isBodyEmpty, userLogin)
router.route('/api/user/logout').get(userLogout)

// notes
router.post('/api/user/note', authUser, isBodyEmpty, noteCreate)
router.use(authUser).route('/api/user/notes').get(getAllNotes)
router.use(authUser).route('/api/user/note/:id').patch(noteUpdate).delete(noteDelete)

export default router
