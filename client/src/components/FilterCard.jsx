import React from 'react'
import { Button } from './ui/button'
import { BriefcaseBusiness, Clock3, MapPin, RotateCcw, SlidersHorizontal, WalletCards, X } from 'lucide-react'

export const defaultFilters = {
    keyword: '',
    location: '',
    jobType: '',
    salary: '',
    datePosted: '',
}

const filterGroups = [
    {
        key: 'jobType',
        title: 'Job Type',
        icon: BriefcaseBusiness,
        options: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
    },
    {
        key: 'location',
        title: 'Location',
        icon: MapPin,
        options: ['Remote', 'Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
    },
    {
        key: 'salary',
        title: 'Salary',
        icon: WalletCards,
        options: ['0-5 LPA', '5-10 LPA', '10-20 LPA', '20+ LPA'],
    },
    {
        key: 'datePosted',
        title: 'Date Posted',
        icon: Clock3,
        options: ['Last 24 hours', 'Last 7 days', 'Last 30 days'],
    },
]

const FilterCard = ({ filters, onChange, onClear }) => {
    const hasFilters = Object.values(filters).some(Boolean);

    return (
        <aside className='professional-card sticky top-24 w-full overflow-hidden rounded-md'>
            <div className='soft-gradient-panel p-5 text-white'>
                <div className='flex items-center justify-between gap-3'>
                    <h1 className="flex items-center gap-2 text-lg font-bold">
                        <SlidersHorizontal className="h-5 w-5" /> Filters
                    </h1>
                    {hasFilters && (
                        <Button variant="ghost" size="sm" onClick={onClear} className="h-9 rounded-md px-2 text-white hover:bg-white/15 hover:text-white">
                            <RotateCcw className="mr-1 h-4 w-4" />
                            Reset
                        </Button>
                    )}
                </div>
            </div>

            <div className='space-y-6 p-5'>
                {filterGroups.map((group) => {
                    const Icon = group.icon;
                    return (
                        <section key={group.key}>
                            <h2 className='mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-muted'>
                                <Icon className='h-4 w-4 text-brand-primary' />
                                {group.title}
                            </h2>
                            <div className='flex flex-wrap gap-2'>
                                {group.options.map((item) => {
                                    const active = filters[group.key] === item;
                                    return (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => onChange(group.key, active ? '' : item)}
                                            className={`min-h-11 rounded-md border px-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                                                active
                                                    ? 'border-brand-primary bg-brand-primary text-white shadow-lg shadow-teal-100'
                                                    : 'border-slate-200 bg-white text-brand-muted hover:border-brand-secondary hover:bg-teal-50 hover:text-brand-primary'
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    )
                                })}
                            </div>
                        </section>
                    )
                })}
            </div>

            {hasFilters && (
                <div className='border-t border-slate-100 p-5'>
                    <button type="button" onClick={onClear} className='flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-slate-50 text-sm font-semibold text-brand-muted hover:bg-teal-50 hover:text-brand-primary'>
                        <X className='h-4 w-4' />
                        Clear all filters
                    </button>
                </div>
            )}
        </aside>
    )
}

export default FilterCard
