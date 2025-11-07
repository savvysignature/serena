'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Services() {
  const services = [
    {
      title: 'Psychic Tarot Readings',
      description: 'Gain clarity on the current challenges, future energies, relationships & life paths',
      image: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9TeeSX7ZMDGFdBKtCJEUqVr6Tz4u1O0ekPlpo',
    },
    {
      title: 'Spiritual Guidance & Soul Support',
      description: 'Deep emotional support, intuitive counselling & grounding wisdom',
      image: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9U3aZRqgdQ7SL6u9nmzqaCKBMV8wtF3bXRyWI',
    },
    {
      title: 'Empath & Scapegoat Healing',
      description: 'Safe space for those recovering from family trauma & emotional wounds',
      image: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr98HyEsuCRMtmos8bYvaw02AxS6cz4NZQj3IpT',
    },
  ];

  return (
    <section id="services" className="pb-20 sm:pb-24 lg:pb-32 bg-peach">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Readings & Support Tailored To Your Journey
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-mint/30 group"
            >
              {/* <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div> */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#28c09a] mb-4 text-center">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/booking"
              className="bg-[#28c09a] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-[#28c09a] hover:shadow-xl transition-all inline-block"
            >
              View Reading Options
            </Link>
          </motion.div>
        </motion.div> */}
      </div>
    </section>
  );
}
