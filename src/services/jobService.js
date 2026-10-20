import prisma from "../config/db.js";

export const getJobsService = async()=>{
    const availableJobs = await prisma.jobs.findMany({
        where:{
            status : "published",
        }
    })
    return availableJobs
}

export const createJobService = async (jobData, employerId) => {
    const createdJob = await prisma.jobs.create({
        data: {
            ...jobData,
            status: "published",
            users: {
                connect: {
                    id: employerId
                }
            }
        }
    });

    return createdJob;
};

export const getJobByIdService = async (jobId) => {
    const job = await prisma.jobs.findFirst({
        where: {
            id: jobId,
            status: "published"
        }
    });

    return job;
};