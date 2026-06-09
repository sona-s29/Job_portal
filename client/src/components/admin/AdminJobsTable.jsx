import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => { 
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(()=>{ 
        console.log('called');
        const filteredJobs = allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    },[allAdminJobs,searchJobByText])
    return (
        <div className='professional-card overflow-hidden'>
            <div className='border-b border-slate-200 bg-white px-6 py-5'>
                <h1 className='text-xl font-bold text-slate-950'>Posted Jobs</h1>
                <p className='mt-1 text-sm text-slate-500'>Manage your job posts and review applicants.</p>
            </div>
            <Table>
                <TableCaption className="p-4 text-center text-sm text-slate-500">A list of your posted jobs</TableCaption>
                <TableHeader className="bg-slate-50">
                    <TableRow>
                        <TableHead className="font-semibold text-slate-600">Company Name</TableHead>
                        <TableHead className="font-semibold text-slate-600">Role</TableHead>
                        <TableHead className="font-semibold text-slate-600">Date</TableHead>
                        <TableHead className="text-right font-semibold text-slate-600">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <TableRow key={job?._id}>
                                <TableCell className="font-medium text-slate-950">{job?.company?.name}</TableCell>
                                <TableCell className="text-slate-700">{job?.title}</TableCell>
                                <TableCell className="text-slate-600">{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-teal-50 hover:text-brand-primary">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 border-slate-200 bg-white text-slate-700 shadow-lg">
                                            <div onClick={()=> navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 rounded-md px-2 py-1.5 cursor-pointer transition hover:bg-slate-50 hover:text-brand-primary'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='mt-1 flex items-center gap-2 rounded-md px-2 py-1.5 cursor-pointer transition hover:bg-slate-50 hover:text-brand-primary'>
                                                <Eye className='w-4'/>
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>

                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable
