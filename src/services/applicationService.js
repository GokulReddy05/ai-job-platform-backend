import prisma from "../config/db.js"
import { AppError } from "../utils/appError.js"

export const createApplicationService = async(jobId,applicantId)=>{
    const result = await prisma.jobs.findFirst({
        where:{
            id : jobId,
            status : "published"
        }
    })
    if(!result){
        throw new AppError("Job Not found or not available",404)
    }

    const existingAppilcation = await prisma.applications.findUnique({
        where:{
            id : jobId,
            applicant_id : applicantId
        }
    })
    if(existingAppilcation){
        throw new AppError("Already applied for this job",409)
    }

    const application = await prisma.applications.create({
        data :{
            applicant_id : applicantId,
            job_id : jobId
        }
    })

    return application
}


export const getApplicationService = async(applicantId)=>{
    const fetchApplication = await prisma.applications.findMany({
        where :{
            applicant_id : applicantId
        }
    })
    return fetchApplication
}