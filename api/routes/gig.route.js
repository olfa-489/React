import express from 'express';
import {
  addGig,
  deleteGig,
  getGig,
  getGigs,
} from '../controllers/gig.controller.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

router.post('/addGig', verifyToken, addGig);
router.delete('/:id', verifyToken, deleteGig);
router.get('/single/:id', getGig);
router.get('/', getGigs);

export default router;
