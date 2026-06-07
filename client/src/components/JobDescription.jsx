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
import { MapPin } from "lucide-react";

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
                    console.log("Fetched job:", res.data.job);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    
    }, [jobId, dispatch, user?._id]);

    return (
        <><Navbar />
        <main className='page-shell py-10'>
        <div className='professional-card p-6 md:p-8'>
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                <div className="flex-1">
                    <h1 className='font-bold text-3xl text-slate-950'>{singleJob?.title}</h1>
                    
                    <div className='flex items-center gap-2 mt-4 flex-wrap'>
                        <Badge className={'rounded-md bg-teal-50 text-brand-primary font-bold'} variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge className={'rounded-md bg-slate-100 text-brand-secondary font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'rounded-md bg-teal-50 text-brand-accent font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
                    </div>
                     
                    <div className='mt-4'>
                        
                        <MapPin className='inline h-4 w-4 text-brand-primary' />
                        <span className='font-normal px-2 text-slate-600'>{singleJob?.location}</span>
                    </div>
                </div>
               <Button
    onClick={isApplied ? null : applyJobHandler}
    disabled={isApplied}
    className={`rounded-lg whitespace-nowrap ${
        isApplied
            ? 'rounded-md bg-slate-200 text-slate-500 cursor-not-allowed'
            : 'rounded-md primary-gradient'
    }`}>
    {isApplied ? 'Already Applied' : 'Apply Now'}
</Button>
            </div>
            <h1 className='border-b border-b-slate-200 font-semibold py-4 text-xl mt-8 text-slate-950'>Job Description</h1>

            <div className='my-6 space-y-4'>
                <div className="flex items-start">
                    <h1 className='font-bold min-w-[120px] text-slate-900'>Role:</h1>
                    <span className='pl-4 font-normal text-slate-600'>{singleJob?.title}</span>
                </div>
               
                <div className="flex items-start">
                    <h1 className='font-bold min-w-[120px] text-slate-900'>Description:</h1>
                    <span className='pl-4 font-normal text-slate-600'>{singleJob?.description}</span>
                </div>
                <div className="flex items-start">
                    <h1 className='font-bold min-w-[120px] text-slate-900'>Experience:</h1>
                    <span className='pl-4 font-normal text-slate-600'>{singleJob?.experience} yrs</span>
                </div>
                <div className="flex items-start">
                    <h1 className='font-bold min-w-[120px] text-slate-900'>Salary:</h1>
                    <span className='pl-4 font-normal text-slate-600'>{singleJob?.salary}LPA</span>
                </div>
                <div className="flex items-start">
                    <h1 className='font-bold min-w-[120px] text-slate-900'>Total Applicants:</h1>
                    <span className='pl-4 font-normal text-slate-600'>{singleJob?.applications?.length}</span>
                </div>
                <div className="flex items-start">
                    <h1 className='font-bold min-w-[120px] text-slate-900'>Posted Date:</h1>
                    <span className='pl-4 font-normal text-slate-600'>{singleJob?.createdAt?.split("T")[0]}</span>
                </div>
            </div>
        </div>
        </main>
        <Footer />
        </>
    )
}

export default JobDescription;
