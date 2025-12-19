import React from 'react'
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const footer = () => {
  return (
    <div className="bg-gray-900 text-gray-300 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Company Section */}
        <div id="company" className="flex items-center gap-3">
          <img 
            src="/favicon.jpg" 
            alt="logo" 
            className="w-13 h-13 rounded-full object-cover border border-gray-700 shadow-md"
          />
          <p className="text-xl font-semibold text-white">KhataBook</p>
        </div>

        {/* Links Section */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Learn more</a>
          <a href="#" className="hover:text-white transition-colors">Support</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 text-2xl text-gray-400">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-500 transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-500 transition-colors"
          >
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 text-center text-xs text-gray-500 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} KhataBook. All rights reserved.
      </div>
    </div>

  )
}

export default footer