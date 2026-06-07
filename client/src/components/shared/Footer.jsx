import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Facebook, Instagram, Linkedin, Send, Twitter } from 'lucide-react';

const footerColumns = [
  {
    title: 'About Us',
    links: [
      { label: 'Our Story', to: '/about' },
      { label: 'Mission', to: '/about' },
      { label: 'Team', to: '/about' },
      { label: 'Careers', to: '/jobs' },
      { label: 'Press', to: '/blog' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'For Job Seekers',
    links: [
      { label: 'Browse Jobs', to: '/jobs' },
      { label: 'Saved Jobs', to: '/saved-jobs' },
      { label: 'Resume Builder', to: '/resume-builder' },
      { label: 'Salary Insights', to: '/salary-insights' },
      { label: 'Courses', to: '/courses' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    title: 'For Employers',
    links: [
      { label: 'Post a Job', to: '/admin/jobs/create' },
      { label: 'Employer Dashboard', to: '/employer/dashboard' },
      { label: 'Pricing', to: '/subscription' },
      { label: 'Partnerships', to: '/partnership' },
      { label: 'Applicants', to: '/admin/jobs' },
      { label: 'Support', to: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', to: '/blog' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms of Service', to: '/terms-of-service' },
      { label: 'Cookies Policy', to: '/cookies-policy' },
      { label: 'Messages', to: '/messages' },
      { label: 'Notifications', to: '/notifications' },
    ],
  },
];

const trustBadges = ['10,000+ Companies', '500K+ Jobs', '2M+ Candidates'];

const FooterColumn = ({ column }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 pb-4 md:border-0 md:pb-0">
      <button type="button" className="flex w-full items-center justify-between text-left md:pointer-events-none md:block" onClick={() => setOpen((value) => !value)}>
        <h3 className="text-lg font-semibold text-white">{column.title}</h3>
        <ChevronDown className={`h-4 w-4 transition md:hidden ${open ? 'rotate-180' : ''}`} />
      </button>
      <ul className={`mt-4 space-y-2 ${open ? 'block' : 'hidden'} md:block`}>
        {column.links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="text-sm text-teal-50 underline-offset-4 transition hover:text-white hover:underline">{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-secondary py-12 text-teal-50">
      <div className="page-shell">
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {trustBadges.map((badge) => (
            <div key={badge} className="rounded-lg border border-white/15 bg-white/10 p-4 text-center font-bold text-white">
              {badge}
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <h2 className="bg-gradient-to-r from-white via-teal-100 to-emerald-200 bg-clip-text text-3xl font-bold text-transparent">CareerHive</h2>
            <p className="mt-3 max-w-md text-sm leading-6">
              A professional job portal for candidates, recruiters, learning, insights, and better hiring decisions.
            </p>
            <form className="mt-6 flex gap-2">
              <input aria-label="Newsletter email" className="h-11 min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-4 text-white placeholder:text-teal-100 outline-none focus:ring-2 focus:ring-brand-accent" placeholder="Email for career updates" />
              <button type="submit" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-4 font-semibold text-brand-primary transition hover:scale-[1.02]">
                <Send className="h-4 w-4" />
                Join
              </button>
            </form>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {footerColumns.map((column) => <FooterColumn key={column.title} column={column} />)}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-sm">Copyright {new Date().getFullYear()} CareerHive. All rights reserved.</p>
          <div className="flex gap-3">
            {[
              { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
              { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
              { label: 'Facebook', href: 'https://facebook.com', icon: Facebook },
              { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.label} href={item.href} aria-label={item.label} className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 transition hover:bg-white/10 hover:text-white">
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
