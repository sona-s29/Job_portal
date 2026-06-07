import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import { Button } from '../ui/button'

const RouteErrorBoundary = () => {
  const error = useRouteError();

  return (
    <main className="page-shell flex min-h-[70vh] items-center justify-center py-12">
      <div className="professional-card max-w-xl p-8 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-brand-error" />
        <h1 className="mt-4 text-3xl font-bold text-brand-text">Something went wrong</h1>
        <p className="mt-3 text-brand-muted">
          {error?.message || "The page could not be loaded. Please try again."}
        </p>
        <Link to="/">
          <Button className="mt-6 rounded-md primary-gradient">Go Home</Button>
        </Link>
      </div>
    </main>
  )
}

export default RouteErrorBoundary
