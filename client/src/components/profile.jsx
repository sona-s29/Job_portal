import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div>
            <Navbar />
            <main className='page-shell py-8'>
            <div className='professional-card mx-auto max-w-4xl p-4 sm:p-6 md:p-8'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-20 w-20 ring-4 ring-teal-50 sm:h-24 sm:w-24">
                            <AvatarImage src={user.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='text-lg font-bold text-slate-950 sm:text-xl'>{user?.fullname}</h1>
                            <p className='max-w-[65ch] break-words text-sm text-slate-600 sm:text-base'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="self-start rounded-md primary-gradient sm:self-auto text-sm sm:text-base"><Pen className='mr-2 h-4 w-4' />Edit</Button>
                </div>
                <div className='my-4 sm:my-5'>
                    <div className='flex items-center gap-2 sm:gap-3 my-2 text-sm sm:text-base'>
                        <Mail className='h-5 w-5 text-teal-600' />Email:
                        <span className='truncate max-w-full text-slate-600 sm:max-w-none'>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-2 sm:gap-3 my-2 text-sm sm:text-base'>
                        <Contact className='h-5 w-5 text-teal-600' />Contact:
                        <span className='text-slate-600'>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-4 sm:my-5'>
                    <h1 className='font-extrabold text-slate-950'>Skills:</h1>
                    <div className='flex flex-wrap items-center gap-1 sm:gap-2'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge className="rounded-md bg-teal-50 text-teal-700 hover:bg-teal-100" key={index}>{item}</Badge>) : <span className='text-slate-500'>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold text-slate-950">Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='w-full cursor-pointer break-all text-teal-700 hover:underline'>{user?.profile?.resumeOriginalName}</a> : <span className='text-slate-500'>NA</span>
                    }
                </div>
            </div>
            <div className='mx-auto max-w-4xl px-0 pt-6'>
                <AppliedJobTable />
            </div>
            </main>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile
