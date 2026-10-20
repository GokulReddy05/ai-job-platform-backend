import { createApplicationService,getApplicationService } from '../services/applicationService.js'
import { AppError } from '../utils/appError.js'

export const createApplications = async(req,res)=>{
    try {
        const { job_id } = req.body
        const applicant_id = req.user.id

        const application = await createApplicationService(job_id,applicant_id)
        res.status(201).json({
            message: "Application Created",
            application
        })
    } catch (error) {
        console.error(error);
    
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                message: error.message,
            });
        }
    
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export const getApplications = async(req,res)=>{
    try {
        const applicant_id = req.user.id;

        const fetchApplication = await getApplicationService(applicant_id);
        res.status(200).json({
            message: "Applications Found",
            fetchApplication
        })
    } catch (error) {
        console.error(error);
    
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                message: error.message,
            });
        }
    
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}