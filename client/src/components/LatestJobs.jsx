import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];



const LatestJobs = () => {
    // We will use the mock data instead of useSelector to make the component runnable.
    const {allJobs} = useSelector(store=>store.job);
   

    return (
        // Main container with the same dark gradient background.
        <div className=' min-h-screen flex flex-col items-center justify-start p-10 text-white '>
            {/* Main heading with a modern style and color accent */}
            <h1 className='text-4xl font-extrabold text-white text-center mb-12  underline-offset-8 decoration-4 decoration-cyan-400 underline'>
                <span className='text-cyan-400'>Trending</span> Job Openings
            </h1>
            
            {/* Grid container for job cards with a responsive layout */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl'>
                {
                    // Check if there are jobs and map through them to display.
                    allJobs.length <= 0 ? (
                        <span className="text-center text-lg text-gray-400">No Job Available</span>
                    ) : (
                        allJobs.slice(0, 6).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default LatestJobs;



