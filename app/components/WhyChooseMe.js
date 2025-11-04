'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function WhyChooseMe() {
  const values = [
    '25+ years\' experience in intuitive guidance',
    'Trauma-informed, empathetic approach',
    'Safe, confidential & non-judgmental space',
    'Readings grounded in spiritual truth & lived experience',
    'Available by phone or video call',
  ];

  return (
    <section className="pb-20 sm:pb-24 lg:pb-32 bg-peach relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr90Qk5ZDRm4su8OlbzcCTrQGJBNDFqULHgnKea"
          alt="Background"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr90Qk5ZDRm4su8OlbzcCTrQGJBNDFqULHgnKea"
                alt="Why Choose Serena"
                width={500}
                height={550}
                className="object-cover w-full h-[650px] object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Content Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-8 leading-tight">
                Compassion. Clarity. Confidentiality.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 mb-12"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="w-2 h-2 bg-[#3db99b] rounded-full mt-2 animate-pulse" />
                  <p className="text-lg text-gray-700">{value}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-[#9FD3C7]/10 p-8 rounded-xl border-l-4 border-[#9FD3C7]"
            >
              <p className="text-xl sm:text-2xl text-gray-700 italic font-light">
                &quot;I help you feel seen, understood, and supported — exactly as you are.&quot;
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
