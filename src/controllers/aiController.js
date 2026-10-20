import { matchResumeToJobService } from "../services/aiService.js";

export const matchResumeToJob = async (req, res) => {
    try {
        const { resumeId, jobId } = req.body;
        const userId = req.user.id;

        if (!resumeId || !jobId) {
            return res.status(400).json({
                message: "resumeId and jobId are required",
            });
        }

        const result = await matchResumeToJobService(
            resumeId,
            jobId,
            userId
        );

        return res.status(200).json({
            message: "Resume-job matching completed successfully",
            result,
        });
    } catch (error) {
        console.error("AI matching error:", error);

        return res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : "Failed to match resume with job",
        });
    }
};
