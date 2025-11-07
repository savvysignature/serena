'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24 lg:py-32 bg-peach">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl max-w-4xl mx-auto sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              A Lifetime of Intuition, Healing and Spiritual Insight
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-[30.5rem] mx-auto group">
                <Image
                  src="https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9DZ4Wxutn9B2CbAw03dVaNQhu7lgFI1WpoPYD"
                  alt="Serena Day - About"
                  width={600}
                  height={550}
                  className="object-contain h-[650px] max-md:h-[440px] object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#9FD3C7]/30 rounded-full blur-2xl -z-10" />
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-lg text-gray-700 leading-relaxed"
            >
              <p>
                I&apos;m Serena, a clairvoyant psychic and intuitive tarot reader based in Queensland, Australia. With more
                than <strong className="text-[#3db99b]">25 years of professional experience</strong>, I&apos;m still learning and still passionate about what I do.
              </p>

              <p>
                My readings combine spiritual insight, tarot wisdom, and intuitive energy work. My intention is to offer
                compassionate guidance and emotional clarity for everyone I read for.
              </p>

              <p>
                The journey from childhood trauma and family scapegoating to deep spiritual healing has taken decades,
                and now allows me to support others with profound empathy and honesty. I have deep respect for all those
                who choose to go.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mt-20 mb-10"
          >
            <h2 className="text-3xl max-w-4xl mx-auto sm:text-4xl font-bold text-gray-800 mb-4">Journey of a Psychic</h2>
          </motion.div>
          {/* Full Story Section with Custom Layout */}
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">

            {/* Left Column: Photo on Mountain + Text */}
            <div className="space-y-8">
              {/* Photo sitting on mountain */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg group"
              >
                <Image
                  src="https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9ElW1CBYXghzBeMuE1YtwD9fQNqjvnHGc5KPV"
                  alt="Sitting on Mountain - Serena Day"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </motion.div>

              {/* Full Story Text - Left Side */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 text-lg text-gray-700 leading-relaxed"
              >
                <p>
                  I grew up as the sensitive, creative child in an abusive family where I was not safe emotionally
                  or physically. I spent my 20s confused and lost, acting out the dysfunctional patterns that I&apos;d
                  learned as a child trying to survive.
                </p>

                <p>
                  In my 30s I began to connect with my spirituality and my healing began. My psychic abilities
                  began to unfold and I noticed that I could often sense information about people or places
                  without knowing exactly how I knew.
                </p>

                <p>
                  My experiences have given me profound empathy for others who have suffered—especially
                  those who have experienced the unique agony of being the family scapegoat.
                </p>
                <p>
                  My readings draw on a variety of different skills and tools. I&apos;m able to blend intuitive energy
                  work, tarot card guidance, and my own hard-won wisdom which comes from transforming years
                  of pain and trauma into growth, healing and strength.
                </p>
              </motion.div>
            </div>

            {/* Right Column: More Text + Photo swimming in lake */}
            <div className="space-y-8 flex flex-col justify-between">
              {/* Full Story Text - Right Side */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6 text-lg text-gray-700 leading-relaxed"
              >


                <p>
                  Every reading I offer is grounded in compassion, sensitivity, and respect. My approach is always
                  non-judgmental and of course completely confidential. I consider it an honour to listen to your
                  story and offer guidance and insight to support your path forward.
                </p>

                <p>
                  You are welcome to ask any questions you may have about the relationships in your life,
                  including romantic, family, friendship and work. Or you may prefer to not ask any questions and
                  just receive the spiritual guidance that arises during your reading.
                </p>

                <p>
                  I look forward to connecting with you. Please reach out to me via email if you would like any
                  further information. I can provide readings by video call or phone call, either 30 or 60 minutes. I
                  look forward to connecting with you and being able to provide support and guidance, or even
                  just a fun, relaxed chat about life - sometimes that&apos;s all we need!
                </p>
              </motion.div>

              {/* Photo swimming in lake */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg group"
              >
                <Image
                  src="https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9e1GeiVwxH1O8mEWFoI0UdKsVCbS7g49wZuM6"
                  alt="Swimming in Lake - Serena Day"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
