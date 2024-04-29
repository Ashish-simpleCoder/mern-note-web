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
router.get('/api/user/notes', authUser, getAllNotes)
router.route('/api/user/note/:id').patch(authUser,noteUpdate).delete(authUser,noteDelete)

router.get("*",(req,res)=> res.status(404).send({status:"error",message:"Route not found."}))
router.post("*",(req,res)=> res.status(404).send({status:"error",message:"Route not found."}))
router.put("*",(req,res)=> res.status(404).send({status:"error",message:"Route not found."}))
router.patch("*",(req,res)=> res.status(404).send({status:"error",message:"Route not found."}))

export default router
