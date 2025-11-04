'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Areas() {
  const areas = [
    { title: 'Relationships & love', image: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9LUEk5Zy8CcoHVPyibx9GtBU2X17wW3vSjn4g' },
    { title: 'Family & ancestral patterns', image: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9wHd610uFEoGJ1aiR4ACn2hWLbSYjsBDrqHkm' },
    { title: 'Life direction & purpose', image: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9rJcyiGaBezPoNA5s97FkDIRytxpKb8vXqfTE' },
    { title: 'Emotional healing & self-growth', image: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9M2EQJ4qDWGEbhjlY6gdcw3prC25TBek0zSf9' },
    { title: 'Energetic and spiritual insight', image: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9Gf98DaRLPsmujdbBKa8LMpryAIHO92zVe0Ch' },
    { title: 'Work & life decisions', image: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9SD1S0RO6MoUv7qGzbLyhriEOdePHmQFxjaVN' },
  ];

  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Areas You Can Ask About
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {areas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
            >
              <div className="relative aspect-square">
                <Image
                  src={area.image}
                  alt={area.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-black/20 group-hover:from-black/80 transition-all" />
                <div className="absolute inset-0 flex items-end p-4">
                  <p className="text-white text-base font-medium text-center w-full leading-tight pb-4">
                    {area.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
