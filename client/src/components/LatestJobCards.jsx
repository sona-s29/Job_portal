import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} 

        className='p-6 rounded-2xl shadow-xl border border-gray-700 bg-slate-900/70 text-white cursor-pointer transition-transform transform hover:scale-105 duration-300'>
                 <div>
                <h1 className='font-medium text-lg text-white'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-400'>India</p>
            </div>
            <div className='mt-4'>
                <h1 className='font-bold text-lg my-2 text-cyan-400'>{job?.title}</h1>
                <p className='text-sm text-gray-300'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4 flex-wrap'>
                {/* Updated badge styling for a cohesive look */}
                <Badge className='bg-blue-800 text-blue-200 hover:bg-blue-700'>
                    {job?.position} Positions
                </Badge>
                <Badge className='bg-red-800 text-red-200 hover:bg-red-700'>
                    {job?.jobType}
                </Badge>
                <Badge className='bg-purple-800 text-purple-200 hover:bg-purple-700'>
                    {job?.salary}LPA
                </Badge>
            </div>

        </div>
    )
}

export default LatestJobCards