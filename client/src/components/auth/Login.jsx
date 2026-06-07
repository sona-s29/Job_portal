import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import Footer from '../shared/Footer'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[user, navigate])

    return (
        <div>
            <Navbar />
            <main className='page-shell flex min-h-[calc(100vh-5rem)] items-center justify-center py-12'>
                <form onSubmit={submitHandler} className='professional-card w-full max-w-xl p-8'>
                    <p className='section-eyebrow text-center'>Welcome back</p>
                    <h1 className='mb-8 mt-2 text-center text-3xl font-bold text-slate-950'>Login to CareerHive</h1>
                    <div className='my-4'>
                        <Label className="text-slate-700">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="example@gmail.com"
                            className="mt-2"
                        />
                    </div>

                    <div className='relative my-4'>
                        <Label className="text-slate-700">Password</Label>
                        <Input
                            type={showPassword ? "text" : "password"}
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="password"
                            className="mt-2 pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-9 text-slate-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    <RadioGroup className="my-5 flex flex-wrap items-center gap-4">
                        <label className="flex items-center space-x-2 rounded-md border border-slate-200 px-3 py-2">
                            <Input
                                type="radio"
                                name="role"
                                value="student"
                                checked={input.role === 'student'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <span className="text-sm font-medium text-slate-700">Student</span>
                        </label>
                        <label className="flex items-center space-x-2 rounded-md border border-slate-200 px-3 py-2">
                            <Input
                                type="radio"
                                name="role"
                                value="recruiter"
                                checked={input.role === 'recruiter'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <span className="text-sm font-medium text-slate-700">Recruiter</span>
                        </label>
                    </RadioGroup>
                    {loading ? (
                        <Button className="my-4 w-full rounded-md primary-gradient">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="my-4 w-full rounded-md primary-gradient">Login</Button>
                    )}
                    <span className='text-sm text-slate-600'>Do not have an account? <Link to="/signup" className='font-semibold text-teal-700'>Signup</Link></span>
                </form>
            </main>
            <Footer />
        </div>
    )
}

export default Login
