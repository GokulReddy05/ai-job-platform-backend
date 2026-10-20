import { uploadResumeService, getResumeService } from "../services/documentUploadService.js";
import { AppError } from "../utils/appError.js";

export const uploadResume = async (req, res) => {
    try {
        const resume = req.file;
        const applicant_id = req.user.id;

        if (!resume) {
            throw new AppError("No Document Provided", 400);
        }

        const result = await uploadResumeService(resume, applicant_id);

        const responseData = {
            ...result,
            file_size: result.file_size.toString()
        };

        res.status(201).json({
            message: "Document Uploaded",
            result: responseData
        });

    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.message || "Internal Server Error"
        });
    }
};

export const getResume = async(req,res)=>{
    const applicant_id = req.user.id;

    const resume  = await getResumeService(applicant_id)
    const responseData = resume.map((resume)=>({
        ...resume,
        file_size : resume.file_size.toString()
    }))
    res.status(200).json({
        message : "Resume Fetched",
        responseData
    })
}