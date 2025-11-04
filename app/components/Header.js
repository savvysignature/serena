'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-md'
        : 'bg-transparent'
        }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            <Link href="/">Serena</Link>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            <motion.div whileHover={{ y: -2 }}>
              <Link
                href="/"
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
              >
                Home
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link
                href="/#about"
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
              >
                About
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link
                href="/#services"
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
              >
                Services
              </Link>
            </motion.div>
            {/* <motion.div whileHover={{ y: -2 }}>
              <Link
                href="/booking"
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
              >
                Book a Reading
              </Link>
            </motion.div> */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/booking"
                className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all"
              >
                Book Now
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </nav>
    </motion.header>
  );
}

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-700 focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t z-50"
        >
          <div className="flex flex-col p-4 gap-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/#about"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/#services"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              Services
            </Link>
            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium text-center"
            >
              Book a Reading
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
}

