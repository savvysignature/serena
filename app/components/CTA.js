'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function CTA() {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-linear-to-tl from-pink-500/30 to-amber-500/30 text-white relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9OipQeGrxGeFh2PnTIiEsYDlVrQtX4LwzvugS"
          alt="Background"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />

      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className ="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 relative inline-block px-8 py-4 rounded-2xl bg-linear-to-r from-pink-500 from-20%  to-amber-500 text-transparent bg-clip-text">
              {/* <span className="relative z-10 text-transparent drop-shadow-lg"> */}
              Ready for Guidance on Your Path?
              {/* </span> */}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/booking"
                className="bg-white text-pink-500 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all inline-block"
              >
                Book a Session
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="mailto:psychicscapegoat@gmail.com"
                className="bg-transparent text-pink-500 border-2 border-pink-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-pink-500/10 transition-all inline-block"
              >
                Contact Serena
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
