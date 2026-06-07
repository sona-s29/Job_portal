import React, { useEffect, useMemo, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard, { defaultFilters } from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Footer from './shared/Footer';
import { Button } from './ui/button';
import { BriefcaseBusiness, ChevronLeft, ChevronRight, MapPin, Search, SlidersHorizontal, SortDesc, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const sortOptions = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Date', value: 'date' },
    { label: 'Salary', value: 'salary' },
]

const pageSizeOptions = [6, 9, 12];

const salaryMatches = (salary, selected) => {
    if (!selected) return true;
    const value = Number(salary) || 0;
    if (selected === '0-5 LPA') return value <= 5;
    if (selected === '5-10 LPA') return value >= 5 && value <= 10;
    if (selected === '10-20 LPA') return value >= 10 && value <= 20;
    if (selected === '20+ LPA') return value >= 20;
    return true;
}

const dateMatches = (createdAt, selected) => {
    if (!selected) return true;
    const days = Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24));
    if (selected === 'Last 24 hours') return days <= 1;
    if (selected === 'Last 7 days') return days <= 7;
    if (selected === 'Last 30 days') return days <= 30;
    return true;
}

const readFiltersFromParams = (params) => ({
    keyword: params.get('keyword') || '',
    location: params.get('location') || '',
    jobType: params.get('jobType') || '',
    salary: params.get('salary') || '',
    datePosted: params.get('datePosted') || '',
})

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState(() => readFiltersFromParams(searchParams));
    const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'relevance');
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [pageSize, setPageSize] = useState(Number(searchParams.get('pageSize')) || 6);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    useEffect(() => {
        if (searchedQuery && !filters.keyword) {
            setFilters((current) => ({ ...current, keyword: searchedQuery }));
        }
    }, [searchedQuery]);

    useEffect(() => {
        const nextParams = {};
        Object.entries(filters).forEach(([key, value]) => {
            if (value) nextParams[key] = value;
        });
        if (sortBy !== 'relevance') nextParams.sort = sortBy;
        if (page > 1) nextParams.page = String(page);
        if (pageSize !== 6) nextParams.pageSize = String(pageSize);
        setSearchParams(nextParams, { replace: true });
    }, [filters, sortBy, page, pageSize, setSearchParams]);

    const updateFilter = (key, value) => {
        setFilters((current) => ({ ...current, [key]: value }));
        setPage(1);
    }

    const clearFilters = () => {
        setFilters(defaultFilters);
        setPage(1);
    }

    const filteredJobs = useMemo(() => {
        const keyword = filters.keyword.toLowerCase().trim();
        const location = filters.location.toLowerCase().trim();

        const filtered = allJobs.filter((job) => {
            const searchable = `${job?.title || ''} ${job?.description || ''} ${job?.company?.name || ''}`.toLowerCase();
            const jobLocation = `${job?.location || ''}`.toLowerCase();
            const jobType = `${job?.jobType || ''}`.toLowerCase();

            return (!keyword || searchable.includes(keyword)) &&
                (!location || jobLocation.includes(location) || (location === 'remote' && searchable.includes('remote'))) &&
                (!filters.jobType || jobType === filters.jobType.toLowerCase()) &&
                salaryMatches(job?.salary, filters.salary) &&
                dateMatches(job?.createdAt, filters.datePosted);
        });

        return [...filtered].sort((a, b) => {
            if (sortBy === 'date') return new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0);
            if (sortBy === 'salary') return (Number(b?.salary) || 0) - (Number(a?.salary) || 0);
            return 0;
        });
    }, [allJobs, filters, sortBy]);

    const totalPages = Math.max(Math.ceil(filteredJobs.length / pageSize), 1);
    const visibleJobs = filteredJobs.slice((page - 1) * pageSize, page * pageSize);
    const activeFilters = Object.entries(filters).filter(([, value]) => Boolean(value));

    return (
        <>
            <Navbar />
            <main className='pb-12'>
                <section className='relative overflow-hidden bg-gradient-to-br from-teal-50 via-slate-50 to-emerald-50 py-10'>
                    <div className='page-shell'>
                        <div className='grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center'>
                            <div>
                                <p className='section-eyebrow'>Explore roles</p>
                                <h1 className='mt-3 max-w-3xl text-4xl font-black leading-tight text-brand-text md:text-6xl'>
                                    Discover jobs tailored to you
                                </h1>
                                <p className='mt-4 max-w-2xl text-brand-muted'>
                                    Browse verified companies, advanced filters, instant job alerts, and cards designed for quick decisions.
                                </p>
                            </div>
                            <div className='hidden rounded-md bg-white p-5 shadow-2xl shadow-teal-100 lg:block'>
                                <div className='soft-gradient-panel rounded-md p-6 text-white'>
                                    <p className='text-sm text-teal-100'>Hiring pulse</p>
                                    <p className='mt-2 text-4xl font-black'>{filteredJobs.length}</p>
                                    <p className='mt-1 text-sm text-teal-100'>matching roles right now</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='page-shell -mt-6'>
                    <div className='professional-card rounded-md p-3 shadow-xl shadow-teal-100 md:p-4'>
                        <div className='grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-center'>
                            <label className='field-surface flex h-12 min-w-0 items-center gap-3 px-4'>
                                <Search className='h-5 w-5 text-brand-primary' />
                                <input
                                    value={filters.keyword}
                                    onChange={(e) => updateFilter('keyword', e.target.value)}
                                    placeholder='Search job title, company, or skill'
                                    className='min-w-0 w-full bg-transparent text-sm outline-none'
                                />
                            </label>
                            <label className='field-surface flex h-12 min-w-0 items-center gap-3 px-4'>
                                <MapPin className='h-5 w-5 text-brand-secondary' />
                                <input
                                    value={filters.location}
                                    onChange={(e) => updateFilter('location', e.target.value)}
                                    placeholder='Location or remote'
                                    className='min-w-0 w-full bg-transparent text-sm outline-none'
                                />
                            </label>
                            <Button className='h-12 w-full rounded-md primary-gradient lg:w-auto lg:px-7'>
                                <Search className='mr-2 h-4 w-4' />
                                Search
                            </Button>
                        </div>
                        <Button onClick={() => setMobileFiltersOpen(true)} variant="outline" className='mt-3 h-12 w-full rounded-md border-teal-100 lg:hidden'>
                            <SlidersHorizontal className='mr-2 h-4 w-4' />
                            Filters
                        </Button>
                    </div>
                </section>

                <section className='page-shell mt-8'>
                    <div className='flex flex-col gap-6 lg:flex-row'>
                        <div className='hidden w-full lg:block lg:w-80 lg:shrink-0'>
                            <FilterCard filters={filters} onChange={updateFilter} onClear={clearFilters} />
                        </div>

                        {mobileFiltersOpen && (
                            <div className='fixed inset-0 z-50 bg-slate-950/40 p-4 backdrop-blur-sm lg:hidden'>
                                <div className='ml-auto max-h-[92vh] max-w-sm overflow-y-auto'>
                                    <div className='mb-3 flex justify-end'>
                                        <Button onClick={() => setMobileFiltersOpen(false)} size="icon" className='rounded-lg bg-white text-brand-text hover:bg-white'>
                                            <X className='h-5 w-5' />
                                        </Button>
                                    </div>
                                    <FilterCard filters={filters} onChange={updateFilter} onClear={clearFilters} />
                                </div>
                            </div>
                        )}

                        <div className='min-w-0 flex-1'>
                                <div className='mb-5 flex flex-col gap-4 rounded-md bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between'>
                                <div>
                                    <p className='font-bold text-brand-text'>{filteredJobs.length} jobs found</p>
                                    <p className='text-sm text-brand-muted'>Filter state is saved in the URL for easy sharing.</p>
                                </div>
                                <div className='flex flex-wrap items-center gap-2'>
                                    <span className='flex items-center gap-1 text-sm font-semibold text-brand-muted'>
                                        <SortDesc className='h-4 w-4' />
                                        Sort
                                    </span>
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setSortBy(option.value)}
                                            className={`min-h-10 rounded-md px-4 text-sm font-semibold transition ${
                                                sortBy === option.value ? 'bg-brand-primary text-white' : 'bg-slate-50 text-brand-muted hover:bg-teal-50 hover:text-brand-primary'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {activeFilters.length > 0 && (
                                <div className='mb-5 flex flex-wrap gap-2'>
                                    {activeFilters.map(([key, value]) => (
                                        <button
                                            key={key}
                                            onClick={() => updateFilter(key, '')}
                                            className='inline-flex min-h-10 items-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-brand-primary shadow-sm hover:bg-teal-50'
                                        >
                                            {value}
                                            <X className='h-4 w-4' />
                                        </button>
                                    ))}
                                    <button onClick={clearFilters} className='min-h-10 rounded-md px-4 text-sm font-semibold text-brand-muted hover:text-brand-primary'>Clear all</button>
                                </div>
                            )}

                            {visibleJobs.length <= 0 ? (
                                <div className='rounded-md border border-dashed border-teal-200 bg-white p-12 text-center'>
                                    <BriefcaseBusiness className='mx-auto h-12 w-12 text-brand-primary' />
                                    <h2 className='mt-4 text-2xl font-bold text-brand-text'>No matching jobs</h2>
                                    <p className='mt-2 text-brand-muted'>Try clearing filters or searching a different role.</p>
                                    <Button onClick={clearFilters} className='mt-5 rounded-md primary-gradient'>Clear Filters</Button>
                                </div>
                            ) : (
                                <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
                                    {visibleJobs.map((job, index) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.25, delay: index * 0.03 }}
                                            key={job?._id}
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            <div className='mt-8 flex flex-col gap-4 rounded-md bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between'>
                                <div className='flex items-center gap-2 text-sm text-brand-muted'>
                                    Page size
                                    <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className='h-10 rounded-md border border-slate-200 bg-white px-3 outline-none focus:ring-2 focus:ring-brand-primary'>
                                        {pageSizeOptions.map((size) => <option key={size} value={size}>{size}</option>)}
                                    </select>
                                </div>
                                <div className='flex items-center justify-center gap-2'>
                                    <Button disabled={page === 1} onClick={() => setPage((value) => Math.max(value - 1, 1))} variant="outline" className='rounded-md'>
                                        <ChevronLeft className='h-4 w-4' />
                                        Prev
                                    </Button>
                                    <span className='rounded-md bg-teal-50 px-4 py-2 text-sm font-bold text-brand-primary'>{page} / {totalPages}</span>
                                    <Button disabled={page === totalPages} onClick={() => setPage((value) => Math.min(value + 1, totalPages))} variant="outline" className='rounded-md'>
                                        Next
                                        <ChevronRight className='h-4 w-4' />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Jobs
