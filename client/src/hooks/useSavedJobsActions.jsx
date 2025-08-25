import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { setSavedJobs, setSavedJobsLoading } from "@/redux/savedJobSlice";
import { toast } from "sonner";

export const fetchSavedJobs = () => async (dispatch) => {
  try {
    dispatch(setSavedJobsLoading(true));
     const { data } = await axios.get(`${JOB_API_END_POINT}/saved`, { withCredentials: true });
    dispatch(setSavedJobs(data.savedJobs));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setSavedJobsLoading(false));
  }
};

export const toggleSaveJob = (jobId, isSaved) => async (dispatch) => {
  try {
    dispatch(setSavedJobsLoading(true));

    let response;
    if (isSaved) {
      response = await axios.delete(
        `${JOB_API_END_POINT}/${jobId}/unsave`,
        { withCredentials: true }
      );
      toast.success("Job removed from saved list");
    } else {
      response = await axios.post(
        `${JOB_API_END_POINT}/${jobId}/save`,
        {},
        { withCredentials: true }
      );
      toast.success("Job saved successfully");
    }

    dispatch(setSavedJobs(response.data.savedJobs));
  } catch (e) {
    console.log(e);
    toast.error("Something went wrong");
  } finally {
    dispatch(setSavedJobsLoading(false));
  }
};