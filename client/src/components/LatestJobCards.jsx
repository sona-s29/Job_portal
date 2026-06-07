import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Building2, MapPin } from 'lucide-react'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <article
            onClick={()=> navigate(`/description/${job._id}`)}
            className='professional-card professional-card-hover flex h-full cursor-pointer flex-col p-6'
        >
            <div className='flex items-start gap-3'>
                <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700'>
                    <Building2 className='h-5 w-5' />
                </div>
                <div className='min-w-0'>
                    <h1 className='truncate text-base font-semibold text-slate-950'>{job?.company?.name || "Company"}</h1>
                    <p className='mt-1 flex items-center gap-1 text-sm text-slate-500'>
                        <MapPin className='h-3.5 w-3.5' />
                        {job?.location || "India"}
                    </p>
                </div>
            </div>

            <div className='mt-5 flex-1'>
                <h2 className='line-clamp-2 text-xl font-bold text-slate-950'>{job?.title}</h2>
                <p className='mt-3 line-clamp-3 text-sm leading-6 text-slate-600'>{job?.description}</p>
            </div>

            <div className='mt-4 flex flex-wrap items-center gap-2'>
                <Badge className='rounded-md bg-teal-50 text-brand-primary hover:bg-teal-100'>
                    {job?.position} Positions
                </Badge>
                <Badge className='rounded-md bg-slate-100 text-brand-secondary hover:bg-slate-200'>
                    {job?.jobType}
                </Badge>
                <Badge className='rounded-md bg-teal-50 text-brand-accent hover:bg-teal-100'>
                    {job?.salary}LPA
                </Badge>
            </div>
        </article>
    )
}

export default LatestJobCards
