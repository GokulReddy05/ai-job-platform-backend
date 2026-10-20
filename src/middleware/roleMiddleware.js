
export const allowEmployer = (req, res, next) => {
    if(req.user.role !=="employer"){
        return res.status(401).json({
            message : "Only employer can edit this "
        })
    }
    next()
};


export const allowJobSeeker = (req, res, next) => {
    if (req.user.role !== "job_seeker" && req.user.role !== "job seeker") {
        return res.status(403).json({
            message: "Only job seekers can apply for jobs"
        });
    }

    next();
};
