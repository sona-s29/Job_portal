import React, { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Check,
  Cookie,
  DollarSign,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquare,
  Search,
  Settings,
  Shield,
  Star,
  Users,
} from 'lucide-react'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import { Button } from '@/components/ui/button'

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

const pageContent = {
  contact: {
    eyebrow: 'Contact',
    title: 'Talk to the CareerHive team',
    copy: 'Send us hiring questions, partnership ideas, product feedback, or support requests.',
    icon: Mail,
  },
  faq: {
    eyebrow: 'Help center',
    title: 'Answers for job seekers and employers',
    copy: 'Search common questions about profiles, jobs, applications, hiring, billing, and technical support.',
    icon: Search,
  },
  privacy: {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    copy: 'How CareerHive collects, uses, stores, and protects user information.',
    icon: Shield,
  },
  terms: {
    eyebrow: 'Legal',
    title: 'Terms of Service',
    copy: 'Rules and responsibilities for using CareerHive products and services.',
    icon: FileText,
  },
  cookies: {
    eyebrow: 'Preferences',
    title: 'Cookies Policy',
    copy: 'Manage cookie categories used for necessary, analytics, and marketing features.',
    icon: Cookie,
  },
  companies: {
    eyebrow: 'Company directory',
    title: 'Discover teams that are hiring',
    copy: 'Browse featured companies, filter by industry, and jump into open positions.',
    icon: Building2,
  },
  courses: {
    eyebrow: 'Learning',
    title: 'Courses to grow your career',
    copy: 'Skill-building courses for job seekers preparing for interviews and career moves.',
    icon: GraduationCap,
  },
  subscription: {
    eyebrow: 'Pricing',
    title: 'Plans for every hiring journey',
    copy: 'Choose Free, Pro, or Enterprise features for candidates and hiring teams.',
    icon: DollarSign,
  },
  partnership: {
    eyebrow: 'Partners',
    title: 'Grow with CareerHive',
    copy: 'Partnership tiers for universities, bootcamps, communities, and hiring agencies.',
    icon: Users,
  },
  blog: {
    eyebrow: 'Resources',
    title: 'CareerHive Blog',
    copy: 'Hiring insights, job search advice, company stories, and career growth playbooks.',
    icon: BookOpen,
  },
  notifications: {
    eyebrow: 'Updates',
    title: 'Notifications',
    copy: 'Track application changes, saved job updates, system notices, and recruiter activity.',
    icon: Bell,
  },
  messages: {
    eyebrow: 'Inbox',
    title: 'Messages',
    copy: 'A focused two-panel messaging experience for candidates and recruiters.',
    icon: MessageSquare,
  },
  settings: {
    eyebrow: 'Account',
    title: 'Settings',
    copy: 'Manage account, password, notifications, privacy, billing, and danger zone settings.',
    icon: Settings,
  },
  resume: {
    eyebrow: 'Resume builder',
    title: 'Build a polished resume',
    copy: 'Step through your profile, experience, education, skills, and a live preview.',
    icon: FileText,
  },
  salary: {
    eyebrow: 'Insights',
    title: 'Salary Insights',
    copy: 'Compare role, location, and industry salary ranges with percentile benchmarks.',
    icon: DollarSign,
  },
}

const companies = [
  { name: 'NovaTech', industry: 'SaaS', jobs: 42 },
  { name: 'BluePeak', industry: 'FinTech', jobs: 28 },
  { name: 'CloudMint', industry: 'Cloud', jobs: 35 },
  { name: 'CareGrid', industry: 'HealthTech', jobs: 19 },
]

const courses = [
  { title: 'React Interview Mastery', instructor: 'Aarav Sharma', price: '₹1,999', rating: 4.8 },
  { title: 'Backend APIs with Node', instructor: 'Neha Kapoor', price: '₹2,499', rating: 4.7 },
  { title: 'Career Communication', instructor: 'Maya Rao', price: 'Free', rating: 4.6 },
]

const blogPosts = [
  { slug: 'resume-that-gets-shortlisted', title: 'Write a resume that gets shortlisted', category: 'Job Search' },
  { slug: 'hiring-dashboard-metrics', title: 'Metrics every recruiter should watch', category: 'Hiring' },
  { slug: 'salary-negotiation-guide', title: 'A practical salary negotiation guide', category: 'Career' },
]

const faqs = [
  { category: 'Job Seekers', q: 'How do I save jobs?', a: 'Use the bookmark action on any job card and return to Saved Jobs later.' },
  { category: 'Employers', q: 'Can recruiters post jobs?', a: 'Recruiter accounts can create companies, publish jobs, and review applicants.' },
  { category: 'Technical', q: 'Can I update my resume?', a: 'Yes. Use your profile settings to upload a newer resume file.' },
]

const legalSections = ['Overview', 'Information We Collect', 'How We Use Data', 'Security', 'Your Choices', 'Contact']

const PromptPage = ({ type }) => {
  const params = useParams();
  const [query, setQuery] = useState('');
  const [annual, setAnnual] = useState(false);
  const content = pageContent[type] || pageContent.blog;
  const Icon = content.icon;

  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => `${item.category} ${item.q} ${item.a}`.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const renderCards = () => {
    if (type === 'companies' || type === 'companyDetail') {
      return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {companies.map((company) => (
            <motion.article key={company.name} variants={cardVariants} whileHover={{ y: -4 }} className="professional-card p-6">
              <img loading="lazy" className="h-14 w-14 rounded-lg" src={`https://ui-avatars.com/api/?name=${company.name}&background=1E3A5F&color=fff`} alt={`${company.name} logo`} />
              <h3 className="mt-4 text-xl font-bold text-brand-text">{company.name}</h3>
              <p className="text-brand-muted">{company.industry}</p>
              <p className="mt-3 text-sm font-semibold text-brand-accent">{company.jobs} open roles</p>
            </motion.article>
          ))}
        </div>
      )
    }

    if (type === 'courses' || type === 'courseDetail') {
      return (
        <div className="grid gap-5 md:grid-cols-3">
          {courses.map((course) => (
            <motion.article key={course.title} variants={cardVariants} whileHover={{ y: -4 }} className="professional-card overflow-hidden">
              <img loading="lazy" className="aspect-video w-full object-cover" src="https://source.unsplash.com/800x500/?online,learning" alt={course.title} />
              <div className="p-5">
                <h3 className="font-bold text-brand-text">{course.title}</h3>
                <p className="mt-1 text-sm text-brand-muted">{course.instructor}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-brand-primary">{course.price}</span>
                  <span className="flex items-center gap-1 text-sm text-brand-warning"><Star className="h-4 w-4 fill-current" />{course.rating}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )
    }

    if (type === 'blog' || type === 'blogPost') {
      return (
        <div className="grid gap-5 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="professional-card professional-card-hover block overflow-hidden">
              <img loading="lazy" className="aspect-video w-full object-cover" src="https://source.unsplash.com/800x500/?office,writing" alt={post.title} />
              <div className="p-5">
                <span className="rounded-md bg-teal-50 px-3 py-1 text-xs font-semibold text-brand-accent">{post.category}</span>
                <h3 className="mt-4 text-lg font-bold text-brand-text">{post.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      )
    }

    return null;
  }

  const renderSpecial = () => {
    if (type === 'faq') {
      return (
        <div className="professional-card p-6">
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-4">
            <Search className="h-5 w-5 text-brand-muted" />
            <input className="h-12 w-full bg-transparent outline-none" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search questions" />
          </div>
          <div className="mt-6 space-y-4">
            {filteredFaqs.map((item) => (
              <details key={item.q} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <summary className="cursor-pointer font-semibold text-brand-text">{item.category}: {item.q}</summary>
                <p className="mt-3 text-brand-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      )
    }

    if (['privacy', 'terms'].includes(type)) {
      return (
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="professional-card sticky top-24 h-fit p-5">
            {legalSections.map((section) => <a key={section} href={`#${section}`} className="block rounded-md px-3 py-2 text-sm text-brand-muted hover:bg-slate-50">{section}</a>)}
          </aside>
          <article className="professional-card p-8">
            <p className="text-sm text-brand-muted">Last updated: June 4, 2026</p>
            {legalSections.map((section) => (
              <section id={section} key={section} className="mt-8">
                <h2 className="text-2xl font-bold text-brand-text">{section}</h2>
                <p className="mt-3 leading-7 text-brand-muted">
                  CareerHive maintains transparent policies for users, employers, partners, and visitors. This section outlines practical rules and user choices for the platform.
                </p>
              </section>
            ))}
          </article>
        </div>
      )
    }

    if (type === 'cookies') {
      return (
        <div className="professional-card overflow-hidden">
          {['Necessary', 'Analytics', 'Marketing'].map((category) => (
            <div key={category} className="flex items-center justify-between border-b border-slate-200 p-5 last:border-0">
              <div>
                <h3 className="font-bold text-brand-text">{category}</h3>
                <p className="text-sm text-brand-muted">Manage {category.toLowerCase()} cookie preferences.</p>
              </div>
              <button aria-label={`Toggle ${category} cookies`} className="h-7 w-12 rounded-full bg-brand-primary p-1">
                <span className="block h-5 w-5 rounded-full bg-white" />
              </button>
            </div>
          ))}
        </div>
      )
    }

    if (type === 'subscription') {
      const plans = ['Free', 'Pro', 'Enterprise'];
      return (
        <div>
          <div className="mb-6 flex justify-center gap-2">
            <Button variant={!annual ? 'default' : 'outline'} onClick={() => setAnnual(false)} className="rounded-md">Monthly</Button>
            <Button variant={annual ? 'default' : 'outline'} onClick={() => setAnnual(true)} className="rounded-md">Annual</Button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.article key={plan} layout className="professional-card relative p-6">
                {plan === 'Pro' && <span className="absolute right-4 top-4 rounded-md bg-brand-primary px-3 py-1 text-xs font-semibold text-white">Popular</span>}
                <h3 className="text-xl font-bold text-brand-text">{plan}</h3>
                <p className="mt-4 text-4xl font-bold text-brand-primary">{index === 0 ? 'Free' : annual ? `₹${index * 14999}` : `₹${index * 1499}`}</p>
                <ul className="mt-6 space-y-3 text-sm text-brand-muted">
                  {['Smart search', 'Saved jobs', 'Profile tools', 'Priority support'].map((feature) => <li key={feature} className="flex gap-2"><Check className="h-4 w-4 text-brand-success" />{feature}</li>)}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      )
    }

    if (['notifications', 'messages', 'settings', 'resume', 'salary'].includes(type)) {
      return (
        <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
          <aside className="professional-card h-fit p-5">
            {['Overview', 'Applied Jobs', 'Saved Jobs', 'Messages', 'Notifications', 'Settings'].map((item) => <button key={item} className="block w-full rounded-md px-3 py-3 text-left text-sm font-medium text-brand-muted hover:bg-slate-50">{item}</button>)}
          </aside>
          <section className="professional-card p-6">
            <div className="grid gap-4 md:grid-cols-3">
              {['Applications', 'Interviews', 'Profile Views'].map((label, index) => (
                <div key={label} className="rounded-lg bg-slate-50 p-5">
                  <p className="text-sm text-brand-muted">{label}</p>
                  <p className="mt-2 text-3xl font-bold text-brand-text">{(index + 1) * 12}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-dashed border-slate-300 p-8 text-center text-brand-muted">
              Interactive {content.title.toLowerCase()} module foundation.
            </div>
          </section>
        </div>
      )
    }

    if (type === 'contact' || type === 'partnership') {
      return (
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <form className="professional-card p-6">
            {['Name', 'Email', 'Subject'].map((field) => <input key={field} className="mb-4 h-12 w-full rounded-md border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-brand-accent" placeholder={field} />)}
            <textarea className="min-h-36 w-full rounded-md border border-slate-200 p-4 outline-none focus:ring-2 focus:ring-brand-accent" placeholder="Message" />
            <Button className="mt-4 rounded-md primary-gradient">Submit <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </form>
          <div className="grid gap-4">
            {['contact@careerhive.com', '+91 98765 43210', 'Bangalore, India'].map((item) => <div key={item} className="professional-card p-5 text-brand-muted">{item}</div>)}
          </div>
        </div>
      )
    }

    return renderCards();
  }

  const detailTitle = params.id || params.slug;

  return (
    <div>
      <Navbar />
      <motion.main initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="page-shell py-12">
        <motion.section variants={cardVariants} className="mb-10 overflow-hidden rounded-lg bg-brand-primary p-8 text-white md:p-12">
          <div className="flex max-w-4xl flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/10">
              <Icon className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-teal-100">{content.eyebrow}</p>
              <h1 className="mt-2 text-4xl font-bold">{detailTitle ? `${content.title}: ${detailTitle}` : content.title}</h1>
              <p className="mt-3 max-w-3xl text-teal-100">{content.copy}</p>
            </div>
          </div>
        </motion.section>
        <motion.div variants={cardVariants}>{renderSpecial()}</motion.div>
      </motion.main>
      <Footer />
    </div>
  )
}

export default PromptPage
