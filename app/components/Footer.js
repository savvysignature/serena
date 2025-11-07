'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-peach border-t border-[#9FD3C7]/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-[#3db99b]"
            >
              <Link href="/">Serena Day</Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gray-600 text-base mt-4"
            >
              Clairvoyant Tarot Reader & Spiritual Guide
              <br />
              Based in Queensland, Australia
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-[#3db99b] transition-colors text-base"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-gray-600 hover:text-[#3db99b] transition-colors text-base"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-gray-600 hover:text-[#3db99b] transition-colors text-base"
                >
                  Services
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            id="contact"
          >
            <h4 className="text-lg font-bold text-gray-800 mb-4">Contact</h4>
            <p className="text-gray-600 text-base mb-2">
              Email: <a href="mailto:psychicscapegoat@gmail.com" className="text-[#3db99b] hover:underline font-semibold">psychicscapegoat@gmail.com</a>
            </p>
            <p className="text-gray-600 text-base mb-4">
            Available for readings or counselling sessions via phone call.
            </p>
            {/* <p className="text-gray-600">
              Based in Queensland, Australia
            </p> */}
          </motion.div>
        </div>

        <div className="border-t border-[#9FD3C7]/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Serena Day. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs text-center md:text-right">
              {/* Readings are for entertainment and guidance purposes only. */}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
