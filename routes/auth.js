import express from 'express';
import { register, login } from '../controllers/authcontroller.js';
import {
  loginAdmin,
}  from '../controllers/admincontroller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/api/v1', loginAdmin);

export default router;

