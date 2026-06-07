import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const statusClassName = (status) => {
    if (status === "rejected") return "bg-red-50 text-red-700 hover:bg-red-100";
    if (status === "pending") return "bg-amber-50 text-amber-700 hover:bg-amber-100";
    return "bg-teal-50 text-teal-700 hover:bg-teal-100";
}

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div className='professional-card p-6'>
            <h1 className='mb-6 text-center text-2xl font-bold text-slate-950'>Applied Jobs</h1>

            <Table className="overflow-hidden rounded-lg border border-slate-200">
                <TableCaption className="p-4 text-center text-sm text-slate-500">A list of your applied jobs</TableCaption>
                <TableHeader className="bg-slate-50 font-bold text-slate-600">
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="py-10 text-center font-medium text-slate-500">
                                You have not applied for any jobs yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob?._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="font-medium text-slate-950">{appliedJob.job?.title}</TableCell>
                                <TableCell className="text-slate-600">{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={`rounded-md ${statusClassName(appliedJob?.status)}`}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
