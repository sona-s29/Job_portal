import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   

    return (
        <section className='py-16'>
            <div className='page-shell'>
                <div className='mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end'>
                    <div>
                        <p className='section-eyebrow'>Fresh opportunities</p>
                        <h1 className='section-title mt-2'>Trending job openings</h1>
                    </div>
                    <p className='max-w-xl text-sm leading-6 text-slate-600'>
                        Explore roles from growing teams with clear job details, salary information,
                        and simple save or apply actions.
                    </p>
                </div>

                <div className='grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
                {
                    allJobs.length <= 0 ? (
                        <span className="col-span-full rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">No jobs available yet</span>
                    ) : (
                        allJobs.slice(0, 6).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))
                    )
                }
                </div>
            </div>
        </section>
    );
};

export default LatestJobs;



