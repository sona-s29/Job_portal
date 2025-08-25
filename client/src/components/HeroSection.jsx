import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Sparkles, TrendingUp, Users } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative min-h-[80vh] flex items-center justify-center overflow-hidden'>
            {/* Animated Background */}
            <div className='absolute inset-0'>
                <div className='absolute inset-0'></div>
                {/* Animated shapes */}
                <div className='absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-xl animate-pulse'></div>
                <div className='absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-indigo-500/15 to-blue-500/15 rounded-full blur-xl animate-pulse delay-1000'></div>
                <div className='absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-cyan-500/15 to-teal-500/15 rounded-full blur-xl animate-pulse delay-500'></div>
            </div>

            {/* Main Content */}
            <div className='relative z-10 text-center px-6 max-w-6xl mx-auto'>
                <div className='flex flex-col gap-8 my-10'>
                    {/* Badge */}
                    <div className='flex justify-center '>
                        <span className='bg-blue-600 inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm border border-white/20'>
                            <Sparkles className='h-4 w-4' />
                            Leading Global Career Platform
                            <TrendingUp className='h-4 w-4' />
                        </span>
                    </div>

                    {/* Main Heading */}
                    <div className='space-y-4'>
                        <h1 className='text-5xl md:text-7xl font-bold text-white leading-tight'>
                            Advance Your Career <br />
                            Discover{' '}
                            <span className='bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent animate-gradient'>
                                Elite Opportunities
                            </span>
                        </h1>
                        
                        <p className='text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed'>
                            Connect with industry-leading companies and unlock your professional potential. 
                            Access exclusive career opportunities tailored to your expertise.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className='flex justify-center mt-8'>
                        <div className='relative w-full max-w-2xl'>
                            <div className='flex bg-white/95 backdrop-blur-md shadow-2xl border border-white/20 rounded-2xl items-center gap-2 p-2 hover:shadow-3xl transition-all duration-300'>
                                <div className='flex-1 relative'>
                                    <input
                                        type="text"
                                        placeholder='Search executive positions and career opportunities...'
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        className='w-full px-6 py-4 text-lg outline-none border-none bg-transparent placeholder-gray-500 text-gray-800'
                                        onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                                    />
                                </div>
                                <Button 
                                    onClick={searchJobHandler} 
                                    className="h-14 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    <Search className='h-5 w-5 mr-2' />
                                    Explore Roles
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-16'>
                        <div className='text-center'>
                            <div className='bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20'>
                                <div className='text-4xl font-bold text-white mb-2'>50K+</div>
                                <div className='text-gray-300'>Premium Positions</div>
                            </div>
                        </div>
                        <div className='text-center'>
                            <div className='bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20'>
                                <div className='text-4xl font-bold text-white mb-2'>1M+</div>
                                <div className='text-gray-300'>Career Professionals</div>
                            </div>
                        </div>
                        <div className='text-center'>
                            <div className='bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20'>
                                <div className='text-4xl font-bold text-white mb-2'>2K+</div>
                                <div className='text-gray-300'>Enterprise Partners</div>
                            </div>
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className='mt-12'>
                        <p className='text-gray-300 mb-6'>Trusted by executives and professionals at</p>
                        <div className='flex justify-center items-center gap-8 opacity-70'>
                            <div className='bg-gradient-to-r from-slate-700/50 to-slate-600/50 backdrop-blur-md rounded-lg px-6 py-3 text-white font-semibold border border-white/10'>Google</div>
                            <div className='bg-gradient-to-r from-slate-700/50 to-slate-600/50 backdrop-blur-md rounded-lg px-6 py-3 text-white font-semibold border border-white/10'>Microsoft</div>
                            <div className='bg-gradient-to-r from-slate-700/50 to-slate-600/50 backdrop-blur-md rounded-lg px-6 py-3 text-white font-semibold border border-white/10'>Apple</div>
                            <div className='bg-gradient-to-r from-slate-700/50 to-slate-600/50 backdrop-blur-md rounded-lg px-6 py-3 text-white font-semibold border border-white/10'>Amazon</div>
                        </div>
                    </div>
                </div>
            </div>



            <style jsx>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }

                .shadow-3xl {
                    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
                }
            `}</style>
        </div>
    )
}

export default HeroSection