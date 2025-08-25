import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

export const postJob = async (req, res) =>{
    try {
        const {title, description, requirements, salary,  location ,  jobType,  experience, position, companyId,} = req.body;
        const userId = req.id;

        if(!title || !description || !requirements || !salary || !location || !jobType || !experience ||  !position || !companyId){
            return res.status(401).json({
                message:"Something is missing",
                success:false
            })
        }

        const job =  await Job.create({
            title, 
            description, 
            requirements: requirements.split(","), 
            salary:Number(salary),
            location ,  
            jobType,
            experienceLevel:experience, 
            position,  
            company: companyId,
            created_by:userId
           
        });

        return res.status(200).json({
             message:"New job successfully created",
             job,
             success:true
        })
        
    } catch (err) {
        console.log(err);
    }
}

export const getAllJobs = async (req, res) =>{
    try {
        const keyword = req.query.keywod || "";
        const query = {
            $or:[
                {title:{$regex:keyword, $options:"i"}},  
                {description:{$regex:keyword, $options:"i"}}
            ]
        };

        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1})
        if(!jobs){
             return res.status(401).json({
                message:"Jobs not found.",
                success:false
            })
        };
          return res.status(200).json({
             jobs,
             success:true
        })
        

    } catch (err) {
        console.log(err);
    }
}

export const jobById = async (req, res) =>{
    try {
         const { id: jobId } = req.params;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if(!job){
            return res.status(401).json({
                message:"Jobs not found.",
                success:false
            })
        }
return res.status(200).json({
             job,
             success:true
})

    } catch (err) {
         console.log(err); 
    }
}

export const getAdminJob = async (req, res) =>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId}) .populate("company")  
                              .sort({ createdAt: -1 });
        if(!jobs){
           return res.status(401).json({
                message:"Jobs not found.",
                success:false
            })  
        };

        return res.status(200).json({
             jobs,
             success:true
        });

    } catch (err) {
          console.log(err); 
    }
}


/** Save a job (idempotent) */
export const saveJob = async (req, res) => {
  try {
    const userId = req.id;                 // ✅ your auth sets req.id
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ success:false, message: "Job not found" });

    // use $addToSet to avoid duplicates
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedJobs: jobId } },
      { new: true }
    );

    const user = await User.findById(userId)
      .populate({ path: "savedJobs", populate: { path: "company" } });

    return res.status(200).json({
      success: true,
      message: "Job saved",
      savedJobs: user.savedJobs, // array of full Job docs (company populated)
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success:false, message: "Error saving job" });
  }
};

/** Unsave a job */
export const unsaveJob = async (req, res) => {
  try {
    const userId = req.id;
    const { jobId } = req.params;

    await User.findByIdAndUpdate(
      userId,
      { $pull: { savedJobs: jobId } },
      { new: true }
    );

    const user = await User.findById(userId)
      .populate({ path: "savedJobs", populate: { path: "company" } });

    return res.status(200).json({
      success: true,
      message: "Job removed from saved list",
      savedJobs: user.savedJobs,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success:false, message: "Error unsaving job" });
  }
};

/** Get all saved jobs for the logged-in user */
export const getSavedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId)
      .populate({ 
        path: "savedJobs", 
        populate: { path: "company" } });

    return res.status(200).json({
      success: true,
      savedJobs: user?.savedJobs || [],
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success:false, message: "Error fetching saved jobs" });
  }
};