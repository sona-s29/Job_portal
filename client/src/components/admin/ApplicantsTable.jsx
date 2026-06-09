import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant.js';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='professional-card overflow-hidden'>
            <div className='border-b border-slate-200 bg-white px-6 py-5'>
                <h1 className='text-xl font-bold text-slate-950'>Applicants List</h1>
                <p className='mt-1 text-sm text-slate-500'>Review recent applicants and update their status.</p>
            </div>
            <Table>
                <TableCaption className="p-4 text-center text-sm text-slate-500">A list of the recent applicants</TableCaption>
                <TableHeader className="bg-slate-50">
                    <TableRow>
                        <TableHead className="font-semibold text-slate-600">Full Name</TableHead>
                        <TableHead className="font-semibold text-slate-600">Email</TableHead>
                        <TableHead className="font-semibold text-slate-600">Contact</TableHead>
                        <TableHead className="font-semibold text-slate-600">Resume</TableHead>
                        <TableHead className="font-semibold text-slate-600">Date</TableHead>
                        <TableHead className="text-right font-semibold text-slate-600">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell className="font-medium text-slate-950">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="text-slate-700">{item?.applicant?.email}</TableCell>
                                <TableCell className="text-slate-600">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell >
                                    {
                                        item.applicant?.profile?.resume ? <a className="font-medium text-brand-primary cursor-pointer hover:text-brand-secondary" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span className="text-slate-400">NA</span>
                                    }
                                </TableCell>
                                <TableCell className="text-slate-600">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-teal-50 hover:text-brand-primary">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 border-slate-200 bg-white text-slate-700 shadow-lg">
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex items-center rounded-md px-2 py-1.5 cursor-pointer transition hover:bg-slate-50 hover:text-brand-primary'>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
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

export default ApplicantsTable
