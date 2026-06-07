import React from 'react'

const PageLoader = () => {
  return (
    <div className="page-shell py-12">
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="professional-card h-40 animate-pulse bg-slate-100" />
        ))}
      </div>
    </div>
  )
}

export default PageLoader
