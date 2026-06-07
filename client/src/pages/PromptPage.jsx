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
import { companyLogoUrl, fallbackLogoUrl } from '@/utils/companyAssets'

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
  { name: 'Google', industry: 'Technology', jobs: 42, domain: 'google.com' },
  { name: 'Microsoft', industry: 'Cloud and AI', jobs: 28, domain: 'microsoft.com' },
  { name: 'Amazon', industry: 'E-commerce and Cloud', jobs: 35, domain: 'amazon.com' },
  { name: 'Adobe', industry: 'Creative Software', jobs: 19, domain: 'adobe.com' },
  { name: 'Netflix', industry: 'Streaming and Media', jobs: 16, domain: 'netflix.com' },
  { name: 'Meta', industry: 'Social Technology', jobs: 31, domain: 'meta.com' },
  { name: 'Oracle', industry: 'Enterprise Software', jobs: 23, domain: 'oracle.com' },
  { name: 'Spotify', industry: 'Music Technology', jobs: 14, domain: 'spotify.com' },
  { name: 'Stripe', industry: 'FinTech', jobs: 22, domain: 'stripe.com' },
  { name: 'Atlassian', industry: 'Collaboration Software', jobs: 18, domain: 'atlassian.com' },
]

const courses = [
  { title: 'React Interview Mastery', instructor: 'Aarav Sharma', price: 'Rs 1,999', rating: 4.8, level: 'Intermediate', duration: '6 weeks', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80', copy: 'Build production-ready React features, explain hooks clearly, and prepare for frontend machine rounds.' },
  { title: 'Backend APIs with Node', instructor: 'Neha Kapoor', price: 'Rs 2,499', rating: 4.7, level: 'Intermediate', duration: '5 weeks', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80', copy: 'Design REST APIs, auth flows, MongoDB models, validation, and deployment-ready backend services.' },
  { title: 'Career Communication', instructor: 'Maya Rao', price: 'Free', rating: 4.6, level: 'Beginner', duration: '2 weeks', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80', copy: 'Write better emails, speak confidently in interviews, and tell your career story with structure.' },
  { title: 'Data Analytics Foundations', instructor: 'Kabir Sen', price: 'Rs 1,499', rating: 4.7, level: 'Beginner', duration: '4 weeks', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', copy: 'Learn spreadsheets, SQL basics, dashboards, and business metrics used in analyst interviews.' },
  { title: 'System Design for Freshers', instructor: 'Ishita Nair', price: 'Rs 2,999', rating: 4.9, level: 'Advanced', duration: '7 weeks', image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80', copy: 'Practice scalable architecture, caching, queues, databases, and real interview tradeoffs.' },
  { title: 'UI/UX Portfolio Sprint', instructor: 'Rhea Malhotra', price: 'Rs 1,799', rating: 4.8, level: 'Intermediate', duration: '3 weeks', image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80', copy: 'Turn design work into case studies with clear problem framing, visuals, and measurable outcomes.' },
  { title: 'Cloud Deployment Basics', instructor: 'Dev Arora', price: 'Rs 1,299', rating: 4.5, level: 'Beginner', duration: '3 weeks', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', copy: 'Deploy frontend and backend apps, configure env variables, logs, domains, and common cloud fixes.' },
  { title: 'Product Management Starter', instructor: 'Tara Shah', price: 'Rs 2,199', rating: 4.6, level: 'Beginner', duration: '4 weeks', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80', copy: 'Understand roadmaps, user stories, prioritization, metrics, and product interview cases.' },
  { title: 'Advanced JavaScript Patterns', instructor: 'Vikram Joshi', price: 'Rs 1,899', rating: 4.8, level: 'Advanced', duration: '5 weeks', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80', copy: 'Master async flows, closures, performance, module patterns, and frontend architecture questions.' },
  { title: 'Resume and LinkedIn Lab', instructor: 'Priya Menon', price: 'Rs 799', rating: 4.7, level: 'Beginner', duration: '1 week', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80', copy: 'Rewrite your resume bullets, optimize LinkedIn, and align your profile with target roles.' },
]

const blogPosts = [
  { slug: 'resume-that-gets-shortlisted', title: 'Write a resume that gets shortlisted', category: 'Job Search', readTime: '6 min read', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80', excerpt: 'A practical breakdown of resume structure, impact bullets, keywords, and mistakes that reduce callbacks.' },
  { slug: 'hiring-dashboard-metrics', title: 'Metrics every recruiter should watch', category: 'Hiring', readTime: '8 min read', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', excerpt: 'Track pipeline health, response time, source quality, and conversion rates without drowning in numbers.' },
  { slug: 'salary-negotiation-guide', title: 'A practical salary negotiation guide', category: 'Career', readTime: '7 min read', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80', excerpt: 'Use market data, timing, and confident language to negotiate offers with less stress.' },
  { slug: 'remote-interview-prep', title: 'How to prepare for remote interviews', category: 'Interviewing', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=800&q=80', excerpt: 'Set up your environment, communicate clearly, and handle online technical rounds with confidence.' },
  { slug: 'portfolio-projects-that-work', title: 'Portfolio projects recruiters remember', category: 'Portfolio', readTime: '9 min read', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', excerpt: 'Choose focused projects that show product thinking, clean implementation, and measurable outcomes.' },
  { slug: 'first-90-days-new-job', title: 'Your first 90 days in a new role', category: 'Career Growth', readTime: '6 min read', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80', excerpt: 'Build trust, learn systems, document wins, and avoid common mistakes in a new position.' },
  { slug: 'recruiter-outreach-message', title: 'Outreach messages that get replies', category: 'Networking', readTime: '4 min read', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80', excerpt: 'Write short, specific messages that make it easy for recruiters and referrals to respond.' },
  { slug: 'job-search-weekly-routine', title: 'A weekly job search routine that works', category: 'Productivity', readTime: '7 min read', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80', excerpt: 'Create a repeatable schedule for applications, networking, skill practice, and follow-ups.' },
  { slug: 'technical-round-checklist', title: 'Technical round checklist for developers', category: 'Interviewing', readTime: '8 min read', image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80', excerpt: 'Review concepts, debug aloud, ask clarifying questions, and recover gracefully when stuck.' },
  { slug: 'company-research-framework', title: 'Research a company before applying', category: 'Job Search', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80', excerpt: 'Evaluate culture, role fit, funding, leadership, product direction, and interview signals.' },
]

const faqs = [
  { category: 'Job Seekers', q: 'How do I save jobs?', a: 'Use the bookmark action on any job card and return to Saved Jobs later.' },
  { category: 'Employers', q: 'Can recruiters post jobs?', a: 'Recruiter accounts can create companies, publish jobs, and review applicants.' },
  { category: 'Technical', q: 'Can I update my resume?', a: 'Yes. Use your profile settings to upload a newer resume file.' },
  { category: 'Job Seekers', q: 'Why can I not apply to a job?', a: 'You must be logged in as a student account before applying. Recruiter accounts manage jobs and applicants.' },
  { category: 'Job Seekers', q: 'How are search filters saved?', a: 'Filters are written to the URL so you can refresh the page or share the same search with someone else.' },
  { category: 'Employers', q: 'How do I add a company logo?', a: 'Create a company, open company setup, and upload a logo image. The logo appears on job cards and company tables.' },
  { category: 'Employers', q: 'Can I change applicant status?', a: 'Yes. Recruiters can open applicants for a job and move candidates through accepted or rejected states.' },
  { category: 'Account', q: 'What if I choose the wrong role?', a: 'Login requires the same role used during signup. Create the correct account type for your workflow.' },
  { category: 'Security', q: 'How is my login session stored?', a: 'The backend uses an HTTP-only token cookie so the browser can authenticate API requests securely.' },
  { category: 'Deployment', q: 'Which backend URL should the frontend use?', a: 'Set VITE_API_BASE_URL to your deployed backend base URL without adding /api/v1.' },
]

const legalSections = ['Overview', 'Information We Collect', 'How We Use Data', 'Security', 'Your Choices', 'Contact']

const pageHighlights = {
  contact: ['24 hour support response', 'Recruiter and candidate help', 'Partnership routing'],
  faq: ['Profile setup help', 'Application status guidance', 'Recruiter workflow answers'],
  privacy: ['Data minimization', 'Secure account controls', 'Transparent user choices'],
  terms: ['Fair platform usage', 'Employer responsibilities', 'Candidate protections'],
  cookies: ['Necessary cookies', 'Analytics controls', 'Marketing preferences'],
  companies: ['Verified employer profiles', 'Hiring signals', 'Open role discovery'],
  courses: ['Interview-ready projects', 'Instructor-led practice', 'Career templates'],
  subscription: ['Free candidate tools', 'Recruiter productivity', 'Enterprise support'],
  partnership: ['University programs', 'Community hiring drives', 'Talent pipeline reports'],
  blog: ['Career playbooks', 'Hiring analysis', 'Interview preparation'],
  notifications: ['Application updates', 'Saved job reminders', 'Recruiter activity'],
  messages: ['Focused conversations', 'Candidate context', 'Fast follow-ups'],
  settings: ['Account controls', 'Privacy choices', 'Notification preferences'],
  resume: ['Resume sections', 'Skills review', 'Download-ready structure'],
  salary: ['Role benchmarks', 'Location comparison', 'Negotiation prep'],
}

const pageImages = {
  contact: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80',
  faq: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80',
  privacy: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=900&q=80',
  terms: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
  cookies: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  companies: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
  courses: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
  subscription: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80',
  partnership: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80',
  blog: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  notifications: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80',
  messages: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80',
  settings: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80',
  resume: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
  salary: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=900&q=80',
}

const PromptPage = ({ type }) => {
  const params = useParams();
  const [query, setQuery] = useState('');
  const [annual, setAnnual] = useState(false);
  const content = pageContent[type] || pageContent.blog;
  const Icon = content.icon;

  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => `${item.category} ${item.q} ${item.a}`.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const renderPageDepth = () => {
    const highlights = pageHighlights[type] || pageHighlights.blog;
    const image = pageImages[type] || pageImages.blog;

    return (
      <motion.section variants={cardVariants} className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div className="overflow-hidden rounded-md">
          <img loading="lazy" src={image} alt={`${content.title} overview`} className="h-full min-h-72 w-full object-cover" />
        </div>
        <div className="professional-card p-6 md:p-8">
          <p className="section-eyebrow">What you get</p>
          <h2 className="mt-2 text-2xl font-bold text-brand-text">Practical tools for real career decisions</h2>
          <p className="mt-3 leading-7 text-brand-muted">
            CareerHive keeps each section focused on action: clear information, faster decisions, and workflows that help candidates and recruiters move forward with less friction.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <Check className="h-5 w-5 text-brand-success" />
                <p className="mt-3 text-sm font-semibold text-brand-text">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-md bg-teal-50 p-4 text-sm leading-6 text-brand-muted">
            Use this page to compare options, gather context, and take the next step without jumping between disconnected tools.
          </div>
        </div>
      </motion.section>
    )
  }

  const renderCards = () => {
    if (type === 'companies' || type === 'companyDetail') {
      return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {companies.map((company) => (
            <motion.article key={company.name} variants={cardVariants} whileHover={{ y: -4 }} className="professional-card p-6">
              <img
                loading="lazy"
                className="h-14 w-14 rounded-lg bg-white object-contain p-1"
                src={companyLogoUrl(company.domain)}
                alt={`${company.name} logo`}
                onError={(event) => {
                  event.currentTarget.src = fallbackLogoUrl(company.name);
                }}
              />
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
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <motion.article key={course.title} variants={cardVariants} whileHover={{ y: -4 }} className="professional-card overflow-hidden">
              <img loading="lazy" className="aspect-video w-full object-cover" src={course.image} alt={course.title} />
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-teal-50 px-3 py-1 text-xs font-semibold text-brand-accent">{course.level}</span>
                  <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-brand-muted">{course.duration}</span>
                </div>
                <h3 className="mt-4 font-bold text-brand-text">{course.title}</h3>
                <p className="mt-2 text-sm text-brand-muted">{course.copy}</p>
                <p className="mt-4 text-sm font-semibold text-brand-text">{course.instructor}</p>
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
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="professional-card professional-card-hover block overflow-hidden">
              <img loading="lazy" className="aspect-video w-full object-cover" src={post.image} alt={post.title} />
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-teal-50 px-3 py-1 text-xs font-semibold text-brand-accent">{post.category}</span>
                  <span className="text-xs font-semibold text-brand-muted">{post.readTime}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-brand-text">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-muted">{post.excerpt}</p>
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
                  CareerHive maintains transparent policies for job seekers, recruiters, partners, and visitors. We collect only the information needed to run profiles, applications, company pages, alerts, and support workflows.
                </p>
                <p className="mt-3 leading-7 text-brand-muted">
                  Users can keep profiles accurate, review communication preferences, and contact support for account or data questions. Employers are expected to post truthful roles, protect candidate information, and use applicant data only for hiring decisions.
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
          {[
            ['Necessary', 'Required for login, security, routing, and basic account functions.'],
            ['Analytics', 'Helps us understand page performance, feature usage, and search quality.'],
            ['Marketing', 'Supports campaign measurement and relevant platform announcements.'],
            ['Preferences', 'Remembers choices such as filters, display settings, and notification defaults.'],
          ].map(([category, copy]) => (
            <div key={category} className="flex items-center justify-between border-b border-slate-200 p-5 last:border-0">
              <div>
                <h3 className="font-bold text-brand-text">{category}</h3>
                <p className="text-sm text-brand-muted">{copy}</p>
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
      const plans = [
        { name: 'Free', copy: 'For candidates starting their job search.', priceMonthly: 'Free', priceAnnual: 'Free' },
        { name: 'Pro', copy: 'For active applicants and small hiring teams.', priceMonthly: 'Rs 1,499', priceAnnual: 'Rs 14,999' },
        { name: 'Enterprise', copy: 'For teams that need reporting and support.', priceMonthly: 'Rs 2,999', priceAnnual: 'Rs 29,999' },
      ];
      return (
        <div>
          <div className="mb-6 flex justify-center gap-2">
            <Button variant={!annual ? 'default' : 'outline'} onClick={() => setAnnual(false)} className="rounded-md">Monthly</Button>
            <Button variant={annual ? 'default' : 'outline'} onClick={() => setAnnual(true)} className="rounded-md">Annual</Button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <motion.article key={plan.name} layout className="professional-card relative p-6">
                {plan.name === 'Pro' && <span className="absolute right-4 top-4 rounded-md bg-brand-primary px-3 py-1 text-xs font-semibold text-white">Popular</span>}
                <h3 className="text-xl font-bold text-brand-text">{plan.name}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-muted">{plan.copy}</p>
                <p className="mt-4 text-4xl font-bold text-brand-primary">{annual ? plan.priceAnnual : plan.priceMonthly}</p>
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
        {renderPageDepth()}
      </motion.main>
      <Footer />
    </div>
  )
}

export default PromptPage
