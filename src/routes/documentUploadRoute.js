import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { allowJobSeeker } from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { uploadResume, getResume } from "../controllers/documentUploadController.js";

const router = express.Router()

router.post('/',authMiddleware,allowJobSeeker,upload.single("resume"),uploadResume)
router.get('/',authMiddleware,allowJobSeeker,getResume)

export default router;