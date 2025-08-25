import React from 'react';

// This is a self-contained component that provides the FAQ page.
// The styling uses the same dark theme and colors as the other components.
const FAQs = () => {
  return (
    // Main container with the primary dark background color
    <div className=" min-h-screen text-gray-200 py-12 font-sans">
      
      <div className="container mx-auto px-4 max-w-4xl">
        <h6 className="text-4xl sm:text-3xl font-bold text-white text-center mb-12 border p-3">
          Frequently Asked Questions
        </h6>

        {/* General Questions Section */}
        <section className="bg-[#0f172a] p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">General Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                <span className="text-cyan-300 font-bold">Q:</span> What is CareerHive?
              </h3>
              <p className="text-gray-300">
                <span className="text-cyan-300 font-bold">A:</span> CareerHive is a platform dedicated to connecting talented job seekers, especially students and recent graduates, with top employers. We aim to simplify the job search process by providing a user-friendly and efficient platform for both candidates and recruiters.
              </p>
            </div>
            <hr className="border-gray-700" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                <span className="text-cyan-300 font-bold">Q:</span> Is CareerHive free to use?
              </h3>
              <p className="text-gray-300">
                <span className="text-cyan-300 font-bold">A:</span> Yes, CareerHive is completely free for job seekers. You can create a profile, upload your resume, browse job listings, and apply for positions without any cost. We offer premium features for recruiters and companies to enhance their hiring process.
              </p>
            </div>
            <hr className="border-gray-700" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                <span className="text-cyan-300 font-bold">Q:</span> How do I get started?
              </h3>
              <p className="text-gray-300">
                <span className="text-cyan-300 font-bold">A:</span> To get started, simply click on the "Sign Up" button and create your free profile. You can then fill out your personal and professional details, upload your resume, and begin your job search.
              </p>
            </div>
          </div>
        </section>

        {/* Account & Profile Management Section */}
        <section className="bg-[#0f172a] p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">Account & Profile Management</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                <span className="text-cyan-300 font-bold">Q:</span> What information should I include in my profile?
              </h3>
              <p className="text-gray-300">
                <span className="text-cyan-300 font-bold">A:</span> A complete profile is key to attracting recruiters. We recommend including your full name, a professional bio, your contact information, a list of your skills, and an updated resume. The more information you provide, the better your chances of being noticed.
              </p>
            </div>
            <hr className="border-gray-700" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                <span className="text-cyan-300 font-bold">Q:</span> How do I update my profile?
              </h3>
              <p className="text-gray-300">
                <span className="text-cyan-300 font-bold">A:</span> You can easily update your profile by logging into your account and navigating to your profile page. From there, you can edit your personal details, skills, and even upload a new resume.
              </p>
            </div>
          </div>
        </section>

        {/* Job Search & Applications Section */}
        <section className="bg-[#0f172a] p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">Job Search & Applications</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                <span className="text-cyan-300 font-bold">Q:</span> How can I search for jobs?
              </h3>
              <p className="text-gray-300">
                <span className="text-cyan-300 font-bold">A:</span> You can use our search bar and filter options to find jobs that match your preferences. You can filter by location, industry, salary, and more to narrow down your search results.
              </p>
            </div>
            <hr className="border-gray-700" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                <span className="text-cyan-300 font-bold">Q:</span> How do I save a job for later?
              </h3>
              <p className="text-gray-300">
                <span className="text-cyan-300 font-bold">A:</span> On each job listing, you will see a "Save for Later" button. Clicking this will add the job to your saved list, which you can access from your profile dashboard.
              </p>
            </div>
            <hr className="border-gray-700" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                <span className="text-cyan-300 font-bold">Q:</span> How can I tell if my application was successful?
              </h3>
              <p className="text-gray-300">
                <span className="text-cyan-300 font-bold">A:</span> After you apply for a job, its status will be updated on your dashboard. You can check the status of all your applications, which will show as "pending," "accepted," or "rejected" once a decision has been made by the company.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQs;
