import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])
    return (
        <div className='professional-card overflow-hidden'>
            <div className='border-b border-slate-200 bg-white px-6 py-5'>
                <h1 className='text-xl font-bold text-slate-950'>Companies List</h1>
                <p className='mt-1 text-sm text-slate-500'>Review and update your registered companies.</p>
            </div>
            <Table>
                <TableCaption className="p-4 text-center text-sm text-slate-500">A list of your registered companies</TableCaption>
                <TableHeader className="bg-slate-50">
                    <TableRow>
                        <TableHead className="font-semibold text-slate-600">Logo</TableHead>
                        <TableHead className="font-semibold text-slate-600">Name</TableHead>
                        <TableHead className="font-semibold text-slate-600">Date</TableHead>
                        <TableHead className="text-right font-semibold text-slate-600">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <TableRow key={company?._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo}/>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="font-medium text-slate-950">{company.name}</TableCell>
                                <TableCell className="text-slate-600">{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-teal-50 hover:text-brand-primary">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 border-slate-200 bg-white text-slate-700 shadow-lg">
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 rounded-md px-2 py-1.5 cursor-pointer transition hover:bg-slate-50 hover:text-brand-primary'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
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

export default CompaniesTable
