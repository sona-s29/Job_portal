import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { FaMapMarkerAlt } from "react-icons/fa";

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);

    // ✅ Helper function to check if user applied
    const checkIfApplied = (job, userId) => {
        return job?.applications?.some(application => {
            // handle if applicant is string OR populated object
            if (typeof application.applicant === "string") {
                return application.applicant === userId;
            }
            return application.applicant?._id === userId;
        }) || false;
    };

    const [isApplied, setIsApplied] = useState(false);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                // ✅ Option 1: update local job manually
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [
                        ...singleJob.applications,
                        { applicant: user?._id } // ensure consistent format
                    ]
                };

                dispatch(setSingleJob(updatedSingleJob));
                setIsApplied(true);
                toast.success(res.data.message);

                // ✅ Option 2 (Better): if backend returns updated job
                // dispatch(setSingleJob(res.data.updatedJob));
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(checkIfApplied(res.data.job, user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <><Navbar />
        <div className='max-w-7xl mx-auto my-10 bg-gray-900 text-white p-8 rounded-lg shadow-xl'>
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                <div className="flex-1">
                    <h1 className='font-bold text-3xl text-cyan-400'>{singleJob?.title}</h1>
                    
                    <div className='flex items-center gap-2 mt-4 flex-wrap'>
                        <Badge className={'bg-[#1e3a8a] text-cyan-400 font-bold'} variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge className={'bg-[#1e3a8a] text-purple-400 font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'bg-[#1e3a8a] text-lime-400 font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
                    </div>
                     
                    <div className='mt-4'>
                        
                        <FaMapMarkerAlt className='inline text-gray-400' />
                        <span className='font-normal px-2 text-gray-300'>{singleJob?.location}</span>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg whitespace-nowrap ${isApplied ? 'bg-gray-700 text-gray-400' : 'bg-cyan-500 hover:bg-cyan-600 text-white'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-700 font-medium py-4 text-xl mt-8'>Job Description</h1>

            <div className='my-6 space-y-4'>
                <div className="flex items-start">
                    <h1 className='font-bold min-w-[120px]'>Role:</h1>
                    <span className='pl-4 font-normal text-gray-300'>{singleJob?.title}</span>
                </div>
               
                <div className="flex items-start">
                    <h1 className='font-bold min-w-[120px]'>Description:</h1>
                    <span className='pl-4 font-normal text-gray-300'>{singleJob?.description}</span>
                </div>
                <div className="flex items-start">
                    <h1 className='font-bold min-w-[120px]'>Experience:</h1>
                    <span className='pl-4 font-normal text-gray-300'>{singleJob?.experience} yrs</span>
                </div>
                <div className="flex items-start">
                    <h1 className='font-bold min-w-[120px]'>Salary:</h1>
                    <span className='pl-4 font-normal text-gray-300'>{singleJob?.salary}LPA</span>
                </div>
                <div className="flex items-start">
                    <h1 className='font-bold min-w-[120px]'>Total Applicants:</h1>
                    <span className='pl-4 font-normal text-gray-300'>{singleJob?.applications?.length}</span>
                </div>
                <div className="flex items-start">
                    <h1 className='font-bold min-w-[120px]'>Posted Date:</h1>
                    <span className='pl-4 font-normal text-gray-300'>{singleJob?.createdAt?.split("T")[0]}</span>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default JobDescription;