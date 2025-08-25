import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    // Get user data from Redux store and set up dispatch and navigate hooks
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handler to log out the user
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };
 const navLinkClass = ({ isActive }) =>
  `transition-colors duration-300 ${
    isActive ? "text-sky-500 font-semibold" : "text-white hover:text-sky-500"
  }`;
  

    return (
        // Main navbar container with a dark background and modern styling
        <div className='bg-slate-900 text-white'>
            <div className=' flex items-center justify-between mx-auto max-w-7xl h-20 px-4'>
                {/* Logo section with enhanced styling */}
                <div className="flex-shrink-0">
                    <h1 className='text-3xl font-bold tracking-wider'>
                        Career<span className='text-sky-500'>Hive</span>
                    </h1>
                </div>

                {/* Navigation links section */}
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-6'>
                        {/* Conditional rendering of links based on user role */}
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><NavLink to="/admin/companies" className={navLinkClass}>Companies</NavLink></li>
                                    <li><NavLink to="/admin/jobs" className={navLinkClass}>Jobs</NavLink></li>
                                </>
                            ) : (
                                <>
                                    <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
                                    <li><NavLink to="/jobs" className={navLinkClass}>Jobs</NavLink></li>
                                    <li><NavLink to="/browse" className={navLinkClass}>Browse</NavLink></li>
                                    <li><NavLink to="/saved-jobs" className={navLinkClass}>Saved Jobs</NavLink></li>
                                </>
                            )
                        }
                    </ul>

                    {/* Conditional rendering for user authentication status */}
                    {
                        !user ? (
                            <div className='flex items-center space-x-4'>
                                <Link to="/login">
                                    <Button variant="outline" className="text-gray-200 border-gray-500 hover:bg-gray-700 hover:text-white transition-colors duration-300">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-sky-500 text-white hover:bg-sky-600 transition-colors duration-300">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 bg-gray-900 text-white border-gray-700">
                                    <div className='p-2 space-y-4'>
                                        {/* User profile info in the popover */}
                                        <div className='flex items-center gap-4'>
                                            <Avatar>
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium text-white'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-400'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Profile and Logout links */}
                                        <div className='flex flex-col space-y-2 text-gray-300'>
                                            {
                                                user && user.role === 'student' && (
                                                    <Button variant="ghost" className="justify-start px-2 hover:bg-gray-700">
                                                        <User2 className='mr-2 h-4 w-4' />
                                                        <Link to="/profile">View Profile</Link>
                                                    </Button>
                                                )
                                            }
                                            <Button onClick={logoutHandler} variant="ghost" className="justify-start px-2 hover:bg-gray-700 text-red-400 hover:text-red-300">
                                                <LogOut className='mr-2 h-4 w-4' />
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
