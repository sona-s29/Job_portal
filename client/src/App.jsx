import React, { Suspense, lazy, useEffect } from 'react'
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
import PageLoader from './components/shared/PageLoader'
import RouteErrorBoundary from './components/shared/RouteErrorBoundary'

const Login = lazy(() => import('./components/auth/Login'))
const Signup = lazy(() => import('./components/auth/Signup'))
const Home = lazy(() => import('./components/Home'))
const Jobs = lazy(() => import('./components/Jobs'))
const Browse = lazy(() => import('./components/Browse'))
const Profile = lazy(() => import('./components/profile'))
const JobDescription = lazy(() => import('./components/JobDescription'))
const Companies = lazy(() => import('./components/admin/Companies'))
const CompanyCreate = lazy(() => import('./components/admin/CompanyCreate'))
const CompanySetup = lazy(() => import('./components/admin/CompanySetup'))
const AdminJobs = lazy(() => import('./components/admin/AdminJobs'))
const PostJob = lazy(() => import('./components/admin/PostJob'))
const Applicants = lazy(() => import('./components/admin/Applicants'))
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute'))
const SavedJobs = lazy(() => import('./components/savedJobs'))
const AboutUs = lazy(() => import('./components/About'))
const PromptPage = lazy(() => import('./pages/PromptPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

const ScrollToTop = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname, location.search]);

  return children;
}

const withSuspense = (element) => (
  <Suspense fallback={<PageLoader />}>
    <ScrollToTop>{element}</ScrollToTop>
  </Suspense>
)

const protectedElement = (element) => withSuspense(<ProtectedRoute>{element}</ProtectedRoute>)

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(<Home />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/login',
    element: withSuspense(<Login />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/signup',
    element: withSuspense(<Signup />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/jobs",
    element: withSuspense(<Jobs />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/jobs/:id",
    element: withSuspense(<JobDescription />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/description/:id",
    element: withSuspense(<JobDescription />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/browse",
    element: withSuspense(<Browse />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/profile",
    element: withSuspense(<Profile />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/profile/:id",
    element: withSuspense(<Profile />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/saved-jobs",
    element: withSuspense(<SavedJobs />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/about-us",
    element: withSuspense(<AboutUs />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/about",
    element: withSuspense(<AboutUs />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/contact",
    element: withSuspense(<PromptPage type="contact" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/faq",
    element: withSuspense(<PromptPage type="faq" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/privacy-policy",
    element: withSuspense(<PromptPage type="privacy" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/terms-of-service",
    element: withSuspense(<PromptPage type="terms" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/cookies-policy",
    element: withSuspense(<PromptPage type="cookies" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/companies",
    element: withSuspense(<PromptPage type="companies" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/companies/:id",
    element: withSuspense(<PromptPage type="companyDetail" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/courses",
    element: withSuspense(<PromptPage type="courses" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/courses/:id",
    element: withSuspense(<PromptPage type="courseDetail" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/subscription",
    element: withSuspense(<PromptPage type="subscription" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/partnership",
    element: withSuspense(<PromptPage type="partnership" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/blog",
    element: withSuspense(<PromptPage type="blog" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/blog/:slug",
    element: withSuspense(<PromptPage type="blogPost" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/notifications",
    element: withSuspense(<PromptPage type="notifications" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/messages",
    element: withSuspense(<PromptPage type="messages" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/settings",
    element: withSuspense(<PromptPage type="settings" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/resume-builder",
    element: withSuspense(<PromptPage type="resume" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/salary-insights",
    element: withSuspense(<PromptPage type="salary" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/dashboard",
    element: withSuspense(<PromptPage type="notifications" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/employer/dashboard",
    element: withSuspense(<PromptPage type="settings" />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path:"/admin/companies",
    element: protectedElement(<Companies/>),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path:"/admin/companies/create",
    element: protectedElement(<CompanyCreate/>),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path:"/admin/companies/:id",
    element: protectedElement(<CompanySetup/>),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path:"/admin/jobs",
    element: protectedElement(<AdminJobs/>),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path:"/admin/jobs/create",
    element: protectedElement(<PostJob/>),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path:"/admin/jobs/:id/applicants",
    element: protectedElement(<Applicants/>),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "*",
    element: withSuspense(<NotFound />),
  },
])

function App() {
  return <RouterProvider router={appRouter} />
}

export default App
