import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Footer from '../shared/Footer'

const companyArray = [];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <main className='page-shell my-10'>
                <form onSubmit={submitHandler} className='professional-card mx-auto max-w-4xl overflow-hidden'>
                    <div className='border-b border-slate-200 bg-white px-6 py-5 sm:px-8'>
                        <h1 className='text-2xl font-bold text-slate-950'>Add Your Latest Job</h1>
                        <p className='mt-1 text-sm text-slate-500'>Create a clear job post for candidates to discover and apply.</p>
                    </div>
                    <div className='grid gap-4 p-6 sm:grid-cols-2 sm:p-8'>
                       
                        <div>
                            <Label className="text-slate-700">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="my-1 bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-slate-700">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="my-1 bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-slate-700">Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="my-1 bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-slate-700">Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="my-1 bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-slate-700">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="my-1 bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-slate-700">Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="my-1 bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-slate-700">Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="my-1 bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-slate-700">No of Position</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="my-1 bg-white"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div className='sm:col-span-2'>
                                    <Label className="text-slate-700">Company</Label>
                                    <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="mt-1 w-full border-slate-200 bg-white">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent className="border-slate-200 bg-white text-slate-700 shadow-lg">
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        <SelectItem key={company?._id} value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                    )
                                                })
                                            }

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                </div>
                            )
                        }
                    </div> 
                    <div className='border-t border-slate-200 px-6 py-5 sm:px-8'>
                    {
                        loading ? <Button className="w-full primary-gradient" disabled> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full primary-gradient">Post New Job</Button>
                    }
                    {
                        companies.length === 0 && <p className='my-3 text-center text-xs font-bold text-brand-error'>*Please register a company first, before posting a job</p>
                    }
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    )
}

export default PostJob
