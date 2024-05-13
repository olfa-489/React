import express from 'express';
import {
  createMessage,
  getMessages,
} from '../controllers/message.controller.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

router.post('/createMessage', verifyToken, createMessage);
router.get('/:id', verifyToken, getMessages);

export default router;
