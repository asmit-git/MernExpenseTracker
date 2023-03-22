import express from 'express'
import { loginController, registerController } from "../controllers/authControllers.js"
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

/* router object */
const router = express.Router()

/* ...................... Routing ........................... */
/* User Register Route || Method POST */
router.post('/register', registerController)

/* User Login Route || Method POST */
router.post('/login', loginController)

/* Protected Auth Route for user */
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ success: true });
})



export default router