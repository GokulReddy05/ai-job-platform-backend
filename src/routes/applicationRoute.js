import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { allowJobSeeker } from '../middleware/roleMiddleware.js';
import { createApplications,getApplications } from '../controllers/applicationController.js'

const router = express.Router()

router.post('/',authMiddleware,allowJobSeeker,createApplications)
router.get('/',authMiddleware,getApplications)


export default router;