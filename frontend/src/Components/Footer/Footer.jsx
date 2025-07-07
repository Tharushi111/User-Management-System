import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left side: Copyright */}
        <p className="text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} UserPortal. All rights reserved.
        </p>

        {/* Center: Quick links */}
        <div className="flex gap-6 mb-4 md:mb-0">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/add-user" className="hover:text-white transition">Add User</a>
          <a href="/user-details" className="hover:text-white transition">User Details</a>
          <a href="/signin" className="hover:text-white transition">Sign In</a>
          <a href="/signup" className="hover:text-white transition">Sign Up</a>
        </div>

        {/* Right side: Social media icons */}
        <div className="flex gap-5 text-lg">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-600 transition">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-400 transition">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-700 transition">
            <FaLinkedinIn />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-gray-100 transition">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
