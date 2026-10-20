import { getJobsService,createJobService,getJobByIdService } from '../services/jobService.js';

export const getAllJobs = async(req,res)=>{
    try {
        const jobs = await getJobsService()
        res.status(200).json({
            message : "Available Jobs",
            jobs
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

export const createJobs = async(req,res)=>{
    try {
        const { title, company,description, location,employment_type,status, salary_min,salary_max } = req.body
        const createdJobs = await createJobService({ title,company, description, location,employment_type,status,salary_min, salary_max}, req.user.id);
        res.status(201).json({
            message: "Job Created",
            createdJobs
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await getJobByIdService(jobId)
        res.status(200).json({
            message: "Requested Jobs",
            job
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};