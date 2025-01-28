import express from 'express'
import saveUserInfo from '../controllers/auth.controller.js';

const authRoute = express.Router();

authRoute.post("/login", saveUserInfo)

export default authRoute;