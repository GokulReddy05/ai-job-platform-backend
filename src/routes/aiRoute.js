import express from 'express';
import {matchResumeToJob} from "../controllers/aiController.js";
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router()


router.post('/',authMiddleware,matchResumeToJob)

export default router;