import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CompanyScroller from './CompanyScroller'
import { HowItWorks, JobCategories, SplitCTA, Testimonials } from './HomePromptSections'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);


  return (
    <div>
      <Navbar />
      <HeroSection />
      <LatestJobs />
      <CompanyScroller />
      <JobCategories />
      <HowItWorks />
      <Testimonials />
      <SplitCTA />
      <Footer />
    </div>
  )
}

export default Home
