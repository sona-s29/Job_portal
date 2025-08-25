import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    // The main footer container with a dark background and padding.
    <footer className="bg-slate-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        {/* Main grid layout for the footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          
          {/* Logo and Copyright Section */}
          <div className="mb-6 lg:mb-0">
            <h2 className="text-3xl font-bold text-white tracking-wider">Career<span className='text-sky-500'>Hive</span></h2>
            <p className="text-sm mt-2 text-gray-500">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>

          {/* Company Links Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about-us" className="hover:text-white transition-colors duration-300">About Us</a>
              </li>
               <li>
                <a href="/jobs" className="hover:text-white transition-colors duration-300">FAQ</a>
              </li>
            </ul>
          </div>
  {/* Email */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
              <strong>Email :</strong> contact@careerhive.com 
              </li>
            </ul>
          </div>
         

          {/* Social Icons Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              {/* Facebook Icon */}
              <a href="https://facebook.com" className="hover:text-blue-500 transform hover:scale-110 transition-transform duration-300" aria-label="Facebook">
                <FaFacebook className='text-3xl' />
              </a>
              {/* Twitter Icon */}
              <a href="https://twitter.com" className="hover:text-blue-400 transform hover:scale-110 transition-transform duration-300" aria-label="Twitter">
               <FaTwitter className='text-3xl'/>
              </a>
              {/* LinkedIn Icon */}
              <a href="https://linkedin.com" className="hover:text-blue-700 transform hover:scale-110 transition-transform duration-300" aria-label="LinkedIn">
                <FaLinkedin className='text-3xl'/>
              </a>
              {/* Instagram Icon */}
              <a href="https://instagram.com" className="hover:text-pink-500 transform hover:scale-110 transition-transform duration-300" aria-label="Instagram">
               <FaInstagram className='text-3xl'/>
              </a>

            </div>
          </div>

         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
