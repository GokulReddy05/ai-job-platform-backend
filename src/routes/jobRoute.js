import express from 'express';
import { getAllJobs,createJobs,getJobById } from '../controllers/jobController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { allowEmployer } from '../middleware/roleMiddleware.js';



const router = express.Router();

router.get('/',getAllJobs)
router.post('/',authMiddleware,allowEmployer,createJobs)
router.get('/:id',authMiddleware,getJobById)

export default router;