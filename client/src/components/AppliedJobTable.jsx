import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div className='p-8 bg-[#0f172a]  min-h-screen rounded-xl shadow-lg text-white border'>
              <h1 className='text-2xl text-center font-bold mb-6 '>Applied Jobs</h1>
              
             <Table className="rounded-lg overflow-hidden border border-[#1e3a8a]">
                <TableCaption className="p-4 text-center text-gray-400 text-sm">A list of your applied jobs</TableCaption>
                <TableHeader className="bg-[#1e3a8a] font-bold text-gray-300 text-12x">
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                     {
                        // Check if there are any applied jobs
                        allAppliedJobs.length === 0 ? (
                            <TableRow>
                                <TableCell className="text-center text-gray-500 font-medium py-10 " style={{ flexBasis: '100%' }}>
                                    You haven't applied for any jobs yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            // Map through the jobs and display them
                            allAppliedJobs.map((appliedJob) => (
                                <TableRow >
                                    <TableCell className="flex-1 min-w-0">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell className="flex-1 min-w-0 font-medium text-white">{appliedJob.job?.title}</TableCell>
                                    <TableCell className="flex-1 min-w-0 text-gray-400">{appliedJob.job?.company?.name}</TableCell>
                                    <TableCell className="flex-1 min-w-0 text-right">
                                        <Badge 
                                            className={`${appliedJob?.status === "rejected" ? 'bg-red-600 text-white' : appliedJob.status === 'pending' ? 'bg-gray-600 text-white' : 'bg-cyan-500 text-white'}`}
                                        >
                                            {appliedJob.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable