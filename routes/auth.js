import express from 'express';
import {
  loginAdmin,
}  from '../controllers/admincontroller.js';

const router = express.Router();

router.post('/api/v1', loginAdmin);

export default router;

