import React from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const AboutUs = () => {
  return (
    // Main container with a very dark background from the new color palette.
    <div className=" min-h-screen font-sans text-gray-200">
        <Navbar />
      
      {/* Hero section with a dark overlay and text */}
      <div className="relative py-24 text-center">
        {/* Dark purple overlay */}
        <div className="absolute inset-0 opacity-50"></div>
        <div className="relative container mx-auto px-4 z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Our Story at Career<span className="text-cyan-400">Hive</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Connecting talent with opportunity and building the future, one career at a time.
          </p>
        </div>
      </div>

      {/* Main content section with a slightly different dark background */}
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        
        {/* Mission and Vision Section */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
            Our Mission & Vision
          </h2>
          {/* Main content box with the dark blue background color */}
          <div className="bg-[#1e3a8a] p-8 rounded-lg shadow-lg">
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Our journey began with a simple observation: the job market can be overwhelming for recent graduates and students, and the recruitment process can be time-consuming for companies. We wanted to create a solution that simplifies this process for everyone involved.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center mt-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">Our Mission</h3>
                <p className="text-gray-400">
                  To democratize access to career opportunities by providing a seamless, intuitive, and effective platform for job seekers and recruiters.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">Our Vision</h3>
                <p className="text-gray-400">
                  To be the leading platform where students and professionals launch their careers, and where companies discover and hire their future leaders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Us Different Section */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
            What Makes Us Different?
          </h2>
          <div className="bg-[#1e3a8a] p-8 rounded-lg shadow-lg">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              At JobPortal, we're not just another job board. We are a community built on efficiency, transparency, and collaboration.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-l-4 border-cyan-500 pl-4">
                <h3 className="text-2xl font-semibold text-white mb-2">For Job Seekers</h3>
                <p className="text-gray-400">
                  We offer a personalized experience with a focus on matching your unique skills and aspirations with relevant job openings. Our platform provides tools to showcase your strengths, track your applications, and discover new possibilities. We believe in empowering you to take control of your career path.
                </p>
              </div>
              <div className="border-l-4 border-cyan-500 pl-4">
                <h3 className="text-2xl font-semibold text-white mb-2">For Recruiters</h3>
                <p className="text-gray-400">
                  We provide access to a diverse and dedicated talent pool. Our tools are designed to streamline your hiring process, from posting jobs and filtering applicants to connecting directly with qualified candidates. We help you save time and resources, so you can focus on building your dream team.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            We are committed to constantly evolving and improving our platform based on the needs of our users. Our success is measured by the success of the careers we help launch and the companies we help grow. Thank you for being a part of our journey.
          </p>
          <a 
            href="/signup" 
            className="inline-block bg-cyan-500 text-white px-8 py-3 rounded-full text-lg font-semibold 
                       hover:bg-cyan-600 transition-colors duration-300 shadow-lg"
          >
            Get Started
          </a>
        </section>
      </div>
      <Footer />
      
    </div>
  );
};

export default AboutUs;
