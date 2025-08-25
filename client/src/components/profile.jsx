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
            <div className=' text-white max-w-4xl mx-auto bg-[#0f172a] border rounded-2xl my-4 sm:my-5 p-4 sm:p-6 md:p-8'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                            <AvatarImage src={user.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-lg sm:text-xl'>{user?.fullname}</h1>
                            <p className='text-sm sm:text-base break-words max-w-[65ch]'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="self-start sm:self-auto text-sm sm:text-base"><Pen />Edit</Button>
                </div>
                <div className='my-4 sm:my-5'>
                    <div className='flex items-center gap-2 sm:gap-3 my-2 text-sm sm:text-base'>
                        <Mail />Email:
                        <span className='text-blue-400 truncate max-w-full sm:max-w-none'>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-2 sm:gap-3 my-2 text-sm sm:text-base'>
                        <Contact />Contact:
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-4 sm:my-5'>
                    <h1 className='font-extrabold'>Skills:</h1>
                    <div className='flex flex-wrap items-center gap-1 sm:gap-2'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer break-all'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto px-3 sm:px-0'>
                {/* Applied Job Table   */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile