import React from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <div>
      <Navbar />
      <main className="page-shell flex min-h-[70vh] items-center justify-center py-12 text-center">
        <div className="max-w-2xl">
          <p className="text-8xl font-bold text-brand-primary">404</p>
          <h1 className="mt-4 text-4xl font-bold text-brand-text">Page not found</h1>
          <p className="mt-3 text-brand-muted">The page you are looking for may have moved, or the link may be incorrect.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/"><Button className="rounded-md primary-gradient">Go Home</Button></Link>
            <Link to="/jobs"><Button variant="outline" className="rounded-md"><Search className="mr-2 h-4 w-4" />Search Jobs</Button></Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default NotFound
