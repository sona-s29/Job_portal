import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Code2,
  Database,
  Headphones,
  HeartPulse,
  LineChart,
  Megaphone,
  Palette,
  PenTool,
  Search,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react'
import { Button } from './ui/button'

const categories = [
  { name: 'Engineering', count: '18,240', icon: Code2 },
  { name: 'Design', count: '7,810', icon: Palette },
  { name: 'Marketing', count: '9,420', icon: Megaphone },
  { name: 'Data', count: '6,770', icon: Database },
  { name: 'Product', count: '5,360', icon: PenTool },
  { name: 'Sales', count: '8,950', icon: LineChart },
  { name: 'Support', count: '4,110', icon: Headphones },
  { name: 'Healthcare', count: '3,580', icon: HeartPulse },
]

const seekerSteps = [
  { title: 'Create Profile', copy: 'Add skills, resume, and career preferences.', icon: Users },
  { title: 'Search Jobs', copy: 'Filter roles by title, location, salary, and remote type.', icon: Search },
  { title: 'Get Hired', copy: 'Apply faster and track your application status.', icon: BadgeCheck },
]

const employerSteps = [
  { title: 'Post Job', copy: 'Publish complete job descriptions and requirements.', icon: BriefcaseBusiness },
  { title: 'Review Applications', copy: 'Sort candidates and track hiring stages.', icon: ShieldCheck },
  { title: 'Hire Talent', copy: 'Move applicants to interviews and final offers.', icon: Users },
]

const testimonials = [
  { name: 'Ananya Mehta', role: 'Frontend Engineer at NovaTech', quote: 'CareerHive helped me find a role that matched my React skills and remote preference.' },
  { name: 'Rahul Verma', role: 'Product Analyst at BluePeak', quote: 'The saved jobs and application tracking made my job search feel organized.' },
  { name: 'Mira Iyer', role: 'UX Designer at CloudMint', quote: 'I found better-fit companies and applied with confidence.' },
]

export const JobCategories = () => (
  <section className="py-16">
    <div className="page-shell">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="section-eyebrow">Explore categories</p>
          <h2 className="section-title mt-2">Find jobs by specialization</h2>
        </div>
        <Link to="/jobs" className="font-semibold text-brand-accent hover:underline">View all categories</Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <motion.article key={category.name} whileHover={{ y: -4 }} className="professional-card p-6">
              <motion.div whileHover={{ y: -4 }} className="flex h-14 w-14 items-center justify-center rounded-lg bg-teal-50 text-brand-primary">
                <Icon className="h-7 w-7" />
              </motion.div>
              <h3 className="mt-5 text-xl font-bold text-brand-text">{category.name}</h3>
              <p className="mt-2 inline-flex rounded-md bg-slate-100 px-3 py-1 text-sm font-semibold text-brand-muted">{category.count} jobs</p>
            </motion.article>
          )
        })}
      </div>
    </div>
  </section>
)

export const HowItWorks = () => {
  const [mode, setMode] = useState('seekers')
  const steps = mode === 'seekers' ? seekerSteps : employerSteps

  return (
    <section className="bg-white py-16">
      <div className="page-shell">
        <div className="mb-8 text-center">
          <p className="section-eyebrow">How it works</p>
          <h2 className="section-title mt-2">Simple workflow for every user</h2>
          <div className="mt-6 inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1">
            {[
              ['seekers', 'Job Seekers'],
              ['employers', 'Employers'],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setMode(value)}
                className={`relative min-h-11 rounded-md px-5 text-sm font-semibold ${mode === value ? 'text-white' : 'text-brand-muted'}`}
              >
                {mode === value && <motion.span layoutId="mode-pill" className="absolute inset-0 rounded-md bg-brand-primary" />}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="grid gap-5 md:grid-cols-3"
          >
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <article key={step.title} className="professional-card p-6">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-brand-primary">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-sm font-bold text-brand-accent">Step {index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-brand-text">{step.title}</h3>
                  <p className="mt-2 leading-6 text-brand-muted">{step.copy}</p>
                </article>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export const Testimonials = () => (
  <section className="py-16">
    <div className="page-shell">
      <div className="mb-10 text-center">
        <p className="section-eyebrow">Success stories</p>
        <h2 className="section-title mt-2">Candidates growing through CareerHive</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((item) => (
          <motion.article key={item.name} whileHover={{ y: -4 }} className="professional-card p-6">
            <img loading="lazy" className="h-14 w-14 rounded-full" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=0F766E&color=fff`} alt={`${item.name} avatar`} />
            <div className="mt-4 flex gap-1 text-brand-warning">
              {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="mt-4 leading-7 text-brand-muted">"{item.quote}"</p>
            <h3 className="mt-5 font-bold text-brand-text">{item.name}</h3>
            <p className="text-sm text-brand-muted">{item.role}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
)

export const SplitCTA = () => (
  <section className="pb-16">
    <div className="page-shell">
      <div className="grid overflow-hidden rounded-lg md:grid-cols-2">
        <div className="bg-brand-primary p-8 text-white md:p-10">
          <h2 className="text-3xl font-bold">Ready to find better work?</h2>
          <p className="mt-3 text-teal-100">Create your profile, save jobs, and apply to verified openings.</p>
          <Link to="/signup">
            <Button className="mt-6 rounded-md bg-white text-brand-primary hover:bg-teal-50">Join as Job Seeker <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
        </div>
        <div className="bg-brand-primary p-8 text-white md:p-10">
          <h2 className="text-3xl font-bold">Hiring for your team?</h2>
          <p className="mt-3 text-teal-100">Post roles, manage applicants, and hire quality talent faster.</p>
          <Link to="/signup">
            <Button className="mt-6 rounded-md bg-white text-brand-primary hover:bg-teal-50">Start Hiring <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
)
