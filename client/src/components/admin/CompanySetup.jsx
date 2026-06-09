import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant.js'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'


const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany]);

    return (
        <div>
            <Navbar />
            <main className='page-shell my-10'>
            <div className='professional-card mx-auto max-w-3xl overflow-hidden'>
                <form onSubmit={submitHandler}>
                    <div className='flex flex-col gap-4 border-b border-slate-200 bg-white px-6 py-5 sm:flex-row sm:items-center sm:px-8'>
                        <Button type="button" variant="outline" onClick={() => navigate("/admin/companies")}  className="flex w-fit items-center gap-2 border-slate-200 text-slate-700 hover:bg-slate-50">
                            <ArrowLeft className='h-4 w-4' />
                            <span>Back</span>
                           
                        </Button>
                        <div>
                            <h1 className='text-2xl font-bold text-slate-950'>Company Setup</h1>
                            <p className='mt-1 text-sm text-slate-500'>Update company profile details shown to candidates.</p>
                        </div>
                    </div>
                    <div className='grid gap-4 p-6 sm:grid-cols-2 sm:p-8'>
                        <div>
                            <Label className="text-slate-700">Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="mt-1 bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-slate-700">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="mt-1 bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-slate-700">Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="mt-1 bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-slate-700">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="mt-1 bg-white"
                            />
                        </div>
                        <div className='sm:col-span-2'>
                            <Label className="text-slate-700">Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="mt-1 cursor-pointer bg-white file:mr-3 file:rounded-md file:border-0 file:bg-teal-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-brand-primary"
                            />
                        </div>
                    </div>
                    <div className='border-t border-slate-200 px-6 py-5 sm:px-8'>
                    {
                        loading ? <Button className="w-full primary-gradient" disabled> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full primary-gradient">Update</Button>
                    }
                    </div>
                </form>
            </div>
            </main>
        </div>
    )
}

export default CompanySetup
