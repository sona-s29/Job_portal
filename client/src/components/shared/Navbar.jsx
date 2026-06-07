import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Bell, BriefcaseBusiness, LogOut, Menu, Search, User2, X } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                setMobileOpen(false);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    const links = user && user.role === 'recruiter'
        ? [
            { to: "/admin/companies", label: "Companies" },
            { to: "/admin/jobs", label: "Jobs" },
            { to: "/employer/dashboard", label: "Dashboard" },
        ]
        : [
            { to: "/", label: "Home" },
            { to: "/jobs", label: "Jobs" },
            { to: "/companies", label: "Companies" },
            { to: "/courses", label: "Courses" },
            { to: "/blog", label: "Blog" },
        ];

    const renderNavLink = (link) => (
        <NavLink key={link.to} to={link.to} className="relative px-2 py-2 text-sm font-semibold text-brand-muted transition hover:text-brand-text">
            {({ isActive }) => (
                <>
                    <span className={isActive ? "text-brand-text" : ""}>{link.label}</span>
                    {isActive && <motion.span layoutId="nav-underline" className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-brand-primary" />}
                </>
            )}
        </NavLink>
    );

    return (
        <header className='sticky top-0 z-50 border-b border-slate-200 bg-white/90 text-brand-text shadow-sm backdrop-blur'>
            <div className='page-shell flex h-14 items-center justify-between md:h-16'>
                <Link to="/" className="flex flex-shrink-0 items-center gap-3">
                    <span className='flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary text-white'>
                        <BriefcaseBusiness className='h-5 w-5' />
                    </span>
                    <h1 className='bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-2xl font-bold text-transparent'>
                        CareerHive
                    </h1>
                </Link>

                <nav className='hidden items-center gap-5 lg:flex' aria-label="Primary navigation">
                    {links.map(renderNavLink)}
                </nav>

                <div className='hidden items-center gap-3 lg:flex'>
                    <button aria-label="Search jobs" onClick={() => navigate('/jobs')} className="flex h-10 w-10 items-center justify-center rounded-md text-brand-muted transition hover:bg-slate-100 hover:text-brand-text">
                        <Search className="h-5 w-5" />
                    </button>
                    <Link to="/notifications" aria-label="Notifications" className="relative flex h-10 w-10 items-center justify-center rounded-md text-brand-muted transition hover:bg-slate-100 hover:text-brand-text">
                        <Bell className="h-5 w-5" />
                        <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-brand-error ring-2 ring-white" />
                    </Link>

                    {!user ? (
                        <div className='flex items-center gap-3'>
                            <Link to="/login">
                                <Button variant="outline" className="rounded-lg border-slate-300 text-brand-muted hover:bg-slate-50">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="rounded-md primary-gradient">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer ring-2 ring-slate-100">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || "Profile"} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 border-slate-200 bg-white text-brand-text">
                                <div className='space-y-4 p-2'>
                                    <div className='flex items-center gap-4'>
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || "Profile"} />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium text-brand-text'>{user?.fullname}</h4>
                                            <p className='text-sm text-brand-muted'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col space-y-2 text-brand-muted'>
                                        {user && user.role === 'student' && (
                                            <Button variant="ghost" className="justify-start rounded-md px-2 hover:bg-slate-100">
                                                <User2 className='mr-2 h-4 w-4' />
                                                <Link to="/profile">View Profile</Link>
                                            </Button>
                                        )}
                                        <Button onClick={logoutHandler} variant="ghost" className="justify-start rounded-md px-2 text-brand-error hover:bg-red-50">
                                            <LogOut className='mr-2 h-4 w-4' />
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                <Button
                    aria-label="Open menu"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-md border-slate-300 lg:hidden"
                    onClick={() => setMobileOpen(true)}
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.button
                            aria-label="Close mobile menu backdrop"
                            className='fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm lg:hidden'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.aside
                            className='fixed right-0 top-0 z-50 h-screen w-80 max-w-[86vw] border-l border-slate-200 bg-white p-5 shadow-2xl lg:hidden'
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                        >
                            <div className='flex items-center justify-between'>
                                <h2 className='font-bold text-brand-text'>Menu</h2>
                                <Button aria-label="Close menu" variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            <nav className='mt-6 grid gap-2' aria-label="Mobile navigation">
                                {links.map((link) => (
                                    <NavLink key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-3 text-sm font-semibold text-brand-muted hover:bg-slate-50">
                                        {link.label}
                                    </NavLink>
                                ))}
                                <Link to="/notifications" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-3 text-sm font-semibold text-brand-muted hover:bg-slate-50">Notifications</Link>
                            </nav>
                            {!user ? (
                                <div className='mt-6 grid grid-cols-2 gap-3'>
                                    <Link to="/login" onClick={() => setMobileOpen(false)}>
                                        <Button variant="outline" className="w-full rounded-lg border-slate-300">Login</Button>
                                    </Link>
                                    <Link to="/signup" onClick={() => setMobileOpen(false)}>
                                        <Button className="w-full rounded-md primary-gradient">Signup</Button>
                                    </Link>
                                </div>
                            ) : (
                                <Button onClick={logoutHandler} variant="outline" className="mt-6 w-full justify-start rounded-md border-red-200 text-brand-error hover:bg-red-50">
                                    <LogOut className='mr-2 h-4 w-4' />
                                    Logout
                                </Button>
                            )}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
