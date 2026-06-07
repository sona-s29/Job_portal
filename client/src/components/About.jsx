import React from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen text-slate-700">
      <Navbar />

      <section className="relative bg-slate-950 py-24 text-center text-white">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="page-shell relative z-10">
          <p className="font-semibold uppercase tracking-wider text-teal-300">About CareerHive</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            Connecting serious talent with teams ready to hire.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-200">
            We make the job search more transparent for candidates and the hiring workflow more focused for recruiters.
          </p>
        </div>
      </section>

      <main className="page-shell py-16">
        <section className="mb-12 grid gap-6 md:grid-cols-2">
          <div className="professional-card p-8">
            <h2 className="text-2xl font-bold text-slate-950">Our Mission</h2>
            <p className="mt-4 leading-7 text-slate-600">
              To democratize access to career opportunities with a platform that helps job seekers discover,
              save, and apply to relevant roles while giving recruiters clear tools to manage hiring.
            </p>
          </div>
          <div className="professional-card p-8">
            <h2 className="text-2xl font-bold text-slate-950">Our Vision</h2>
            <p className="mt-4 leading-7 text-slate-600">
              To become the trusted place where students, professionals, startups, and companies build the
              next chapter of work together.
            </p>
          </div>
        </section>

        <section className="professional-card p-8">
          <p className="section-eyebrow">Why it works</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">Built for both sides of hiring</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="border-l-4 border-teal-500 pl-5">
              <h3 className="text-xl font-semibold text-slate-950">For Job Seekers</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Search jobs, filter by location or skill, save promising roles, apply directly, and keep your profile ready for recruiters.
              </p>
            </div>
            <div className="border-l-4 border-brand-accent pl-5">
              <h3 className="text-xl font-semibold text-slate-950">For Recruiters</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Create companies, post jobs, review applicants, and keep hiring activity organized from one dashboard.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
