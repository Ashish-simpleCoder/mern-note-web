import { Router } from 'express'
import { userLogin, userLogout, userRegister } from '../controllers/user.controller'
import { getAllNotes, noteCreate, noteDelete, noteUpdate } from '../controllers/note.controller'
import { authUser } from '../middleware/auth-user'

const router = Router()

router.route('/api/v1/user').post(userRegister)
router.route('/api/v1/user/login').post(userLogin)
router.route('/api/v1/user/logout').get(userLogout)

router.use(authUser).route('/api/v1/user/note').post(noteCreate).get(getAllNotes)
router.use(authUser).route('/api/v1/user/notes/:id').patch(noteUpdate).delete(noteDelete)

export default router
