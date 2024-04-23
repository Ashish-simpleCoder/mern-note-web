import { Router } from 'express'
import { userLogin, userLogout, userRegister } from '../controllers/user.controller'

const router = Router()

router.route('/api/v1/user').post(userRegister)
router.route('/api/v1/user/login').post(userLogin)
router.route('/api/v1/user/logout').get(userLogout)

export default router
