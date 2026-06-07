import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Footer from './shared/Footer';

// const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <>
        <Navbar />
        <main className='min-h-screen py-12'>
            <div className='page-shell'>
                <div className='mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end'>
                    <div>
                        <p className='section-eyebrow'>Search results</p>
                        <h1 className='section-title mt-2'>{allJobs.length} matching jobs</h1>
                    </div>
                    <p className='text-sm text-slate-600'>Review details, save roles, and apply when the fit looks right.</p>
                </div>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                            );
                        })
                    }
                </div>
            </div>
        </main>
         <Footer />
        </>

    )
}

export default Browse;
