import React, { useState } from 'react'
import { Button } from './ui/button'
import { BriefcaseBusiness, MapPin, Search, TrendingUp } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const popularTags = ["Remote", "Full-time", "React Developer", "Product Manager", "Data Analyst"];

const stats = [
    { label: "Total Jobs", value: "500K+", delay: "" },
    { label: "Companies Hiring", value: "10K+", delay: "delay-100" },
    { label: "Candidates Placed", value: "2M+", delay: "delay-200" },
];

const HeroSection = () => {
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (tag) => {
        const query = tag || [keyword, location].filter(Boolean).join(" ");
        dispatch(setSearchedQuery(query));
        navigate("/jobs");
    }

    return (
        <section className='hero-gradient relative overflow-hidden text-white'>
            <div className='page-shell grid min-h-[calc(100vh-64px)] items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20'>
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
                    <span className='inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur'>
                        <TrendingUp className='h-4 w-4 text-teal-100' />
                        Join 2 million+ professionals finding better opportunities
                    </span>

                    <h1 className='mt-6 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl'>
                        Find Your <span className='typewriter-word text-teal-100'></span>
                    </h1>

                    <p className='mt-5 max-w-2xl text-lg leading-8 text-teal-50'>
                        Search verified roles, save opportunities, apply faster, and connect with employers from one professional job portal.
                    </p>

                    <div className='mt-8 rounded-lg border border-white/20 bg-white p-2 shadow-2xl'>
                        <div className='grid gap-2 md:grid-cols-[1fr_1fr_auto] md:items-center'>
                            <label className='flex h-12 items-center gap-3 rounded-md bg-slate-50 px-4 text-slate-700'>
                                <Search className='h-5 w-5 text-brand-primary' />
                                <input
                                    className='w-full bg-transparent outline-none'
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    placeholder='Job title or keyword'
                                />
                            </label>
                            <label className='flex h-12 items-center gap-3 rounded-md bg-slate-50 px-4 text-slate-700'>
                                <MapPin className='h-5 w-5 text-brand-accent' />
                                <input
                                    className='w-full bg-transparent outline-none'
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder='City or remote'
                                />
                            </label>
                            <Button onClick={() => searchJobHandler()} className="h-12 rounded-md primary-gradient">
                                Search Jobs
                            </Button>
                        </div>
                    </div>

                    <div className='mt-5 flex flex-wrap gap-2'>
                        {popularTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => searchJobHandler(tag)}
                                className='min-h-11 rounded-lg border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white'
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    <div className='mt-10 grid gap-4 sm:grid-cols-3'>
                        {stats.map((stat) => (
                            <div key={stat.label} className={`counter-pop rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur ${stat.delay}`}>
                                <p className='text-3xl font-bold'>{stat.value}</p>
                                <p className='mt-1 text-sm text-teal-100'>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.12 }} className='hidden lg:block'>
                    <div className='relative ml-auto max-w-md rounded-lg bg-white p-4 text-brand-text shadow-2xl'>
                        <img loading="lazy" className='aspect-[4/3] w-full rounded-lg object-cover' src='https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80' alt='Professionals collaborating in an office' />
                        <div className='absolute -bottom-8 -left-8 rounded-lg bg-white p-5 shadow-xl'>
                            <div className='flex items-center gap-3'>
                                <span className='flex h-11 w-11 items-center justify-center rounded-md bg-teal-50 text-brand-accent'>
                                    <BriefcaseBusiness className='h-5 w-5' />
                                </span>
                                <div>
                                    <p className='text-sm text-brand-muted'>New interviews</p>
                                    <p className='text-2xl font-bold text-brand-text'>+1,248</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection
