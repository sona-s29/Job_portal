import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJob, getAllJobs, getSavedJobs, jobById, postJob, saveJob, unsaveJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob)
router.route("/get").get(isAuthenticated, getAllJobs)
router.route("/getadminjobs").get(isAuthenticated, getAdminJob)
router.route("/get/:id").get(isAuthenticated, jobById)

// Save and unsave job routes
router.post("/:jobId/save", isAuthenticated, saveJob);
router.delete("/:jobId/unsave", isAuthenticated, unsaveJob);
router.get("/saved", isAuthenticated, getSavedJobs);

export default router;