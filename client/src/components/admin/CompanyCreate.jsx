import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant.js'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import Footer from '../shared/Footer'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Navbar />
            <main className='page-shell my-10'>
            <div className='professional-card mx-auto max-w-3xl overflow-hidden'>
                <div className='border-b border-slate-200 bg-white px-6 py-6 sm:px-8'>
                    <h1 className='text-3xl font-bold text-slate-950'>Your Company Name</h1>
                    <p className='mt-2 text-slate-500'>Choose a company name now. You can change it later.</p>
                </div>
                <div className='p-6 sm:p-8'>
                <Label className='text-sm font-semibold text-slate-700'>Company Name</Label>
                <Input
                    type="text"
                    className="my-3 h-14 bg-white text-lg"
                    placeholder="JobHunt, Microsoft etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center'>
                    <Button variant="outline" className='border-slate-200 text-slate-700 hover:bg-slate-50' onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button className='primary-gradient' onClick={registerNewCompany}>Continue</Button>
                </div>
                </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default CompanyCreate
