import express from 'express'
import { login, logout, register } from '../controllers/authController.js';

const authRouter = express.Router();
//We send data on this router
 authRouter.post('/register', register); //this endpoint will call 'register' controller function.
 authRouter.post('/login', login);
 authRouter.post('/logout', logout);

export default authRouter;