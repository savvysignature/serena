'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function BookingPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        sessionType: '',
        preferredDate: '',
        preferredTime: '',
        contactMethod: '',
        message: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to a backend
        console.log('Booking submitted:', formData);
        setIsSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                sessionType: '',
                preferredDate: '',
                preferredTime: '',
                contactMethod: '',
                message: '',
            });
        }, 3000);
    };

    const readingOptions = [
        {
            title: 'Psychic Reading ',
            duration: '30 minutes',
            description: 'Focused guidance on your current challenges and questions',
            price: '$80 AUD',
            image: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9qunkBxRo910byKfepAWMI45wBLUOcJFxh3lG',
        },
        {
            title: 'Psychic Reading',
            duration: '60 minutes',
            description: 'Full intuitive reading + emotional support and deeper exploration',
            price: '$150 AUD',
            image: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9CVAlTmEYPpn5hrM0D8gUdc17Ooyl6fZaCvjW',
        },
        {
            title: 'Spiritual Counselling',
            duration: '60 minutes',
            description: 'A safe space to speak openly and be heard. No tarot cards or predictions',
            price: '$140 AUD',
            image: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9jOqvwAUmDqtyS0rVoKQbgTLw4FIcUu7deiz3',
        },
    ];

    const faqs = [
        {
            question: 'I have never had a reading before — what do I need to do?',
            answer: 'Simply arrive with an open heart and curiosity; that\'s enough.',
        },
        {
            question: 'Do I need to have questions prepared?',
            answer: 'Not at all. Some people prefer spontaneous guidance.',
        },
        {
            question: 'Are readings confidential?',
            answer: 'Always — your privacy and trust are sacred.',
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept various payment methods including Stripe, PayPal, and Afterpay. Details will be provided after booking confirmation.',
        },
        {
            question: 'Can I reschedule my reading?',
            answer: 'Yes, please contact me at least 24 hours in advance to reschedule your session.',
        },
    ];

    return (
        <div className="min-h-screen bg-peach">
            <Header />
            <main>
                {/* Hero Intro */}
                <section className="relative pt-40 sm:pt-48 lg:pt-56 pb-20 overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src="https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9OipQeGrxGeFh2PnTIiEsYDlVrQtX4LwzvugS"
                            alt="Booking Hero"
                            fill
                            className="object-cover opacity-100"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-peach/70" />
                    </div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                                Book Your Reading
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-600">
                                Sessions are offered via phone call.
                                <br />
                                Please choose the option that feels right for you.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Reading Options */}
                <section className="py-20 bg-peach">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                            {readingOptions.map((option, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-100px' }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-mint/30 group"
                                >
                                    <div className="relative h-60 overflow-hidden">
                                        <Image
                                            src={option.image}
                                            alt={option.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                                    </div>
                                    <div className="p-8">
                                        <div className="mb-4">
                                            <h3 className="text-2xl font-bold text-gray-800">{option.title}</h3>
                                            <span className="text-[#3db99b] font-semibold text-lg inline-block mt-2">{option.price}</span>
                                        </div>
                                        <div className="mb-4">
                                            <span className="inline-block bg-[#9FD3C7]/20 text-[#3db99b] border border-[#9FD3C7]/30 px-3 py-1 rounded-full text-sm font-medium">
                                                {option.duration}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed mb-4">{option.description}</p>
                                        {/* {option.disclaimer && (
                                            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                                <p className="text-sm text-amber-900 leading-relaxed">
                                                    <strong className="font-semibold">Disclaimer:</strong> {option.disclaimer}
                                                </p>
                                            </div>
                                        )} */}
                                    </div>
                                </motion.div>
                            ))}
                        </div>


                        {/* Booking Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.8 }}
                            id="booking-form"
                            className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-[#9FD3C7]/30"
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                                Booking Form
                            </h2>

                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 bg-[#9FD3C7]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-[#3db99b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#3db99b] mb-2">Thank You!</h3>
                                    <p className="text-gray-600">
                                        Your booking request has been submitted. I&apos;ll contact you soon to confirm your session.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9FD3C7] focus:border-[#9FD3C7] transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9FD3C7] focus:border-[#9FD3C7] transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9FD3C7] focus:border-[#9FD3C7] transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="sessionType" className="block text-sm font-medium text-gray-700 mb-2">
                                            Session Type *
                                        </label>
                                        <select
                                            id="sessionType"
                                            name="sessionType"
                                            required
                                            value={formData.sessionType}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9FD3C7] focus:border-[#9FD3C7] transition-all"
                                        >
                                            <option value="">Select a session</option>
                                            <option value="30-min-psychic">Psychic Reading (30 minutes) - $80 AUD</option>
                                            <option value="60-min-psychic">Psychic Reading (60 minutes) - $150 AUD</option>
                                            <option value="60-min-counselling">Spiritual Counselling (60 minutes) - $140 AUD</option>
                                        </select>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                                                Preferred Date *
                                            </label>
                                            <input
                                                type="date"
                                                id="preferredDate"
                                                name="preferredDate"
                                                required
                                                value={formData.preferredDate}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9FD3C7] focus:border-[#9FD3C7] transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                                                Preferred Time *
                                            </label>
                                            <input
                                                type="time"
                                                id="preferredTime"
                                                name="preferredTime"
                                                required
                                                value={formData.preferredTime}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9FD3C7] focus:border-[#9FD3C7] transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-700 mb-2">
                                            Video or Phone *
                                        </label>
                                        <select
                                            id="contactMethod"
                                            name="contactMethod"
                                            required
                                            value={formData.contactMethod}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9FD3C7] focus:border-[#9FD3C7] transition-all"
                                        >
                                            <option value="">Select contact method</option>
                                            <option value="video">Video Call</option>
                                            <option value="phone">Phone Call</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message / Questions (optional)
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="4"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                                            placeholder="Share any questions or topics you'd like to explore during your reading..."
                                        />
                                    </div>

                                    <p className="text-gray-600 text-xs mt-4">
                                        <strong>Disclaimer:</strong> No tarot will be used and no predictions given. This session will provide a space for you to speak openly and be heard and supported by someone who understands. I offer compassionate insights and observations. My intention is always to help you reconnect with your own inner guidance and power.

                                    </p>

                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full cursor-pointer bg-[#28c09a] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-[#28c09a] hover:shadow-xl transition-all"
                                    >
                                        Confirm Booking
                                    </motion.button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-peach">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl mx-auto"
                        >
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-12 text-center">
                                Frequently Asked Questions
                            </h2>

                            <div className="space-y-6">
                                {faqs.map((faq, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="bg-white p-6 rounded-xl shadow-md border border-[#9FD3C7]/30"
                                    >
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">{faq.question}</h3>
                                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 bg-linear-to-br from-[#28c09a] via-[#28c09a] to-[#f9c339] text-white relative overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src="https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9OipQeGrxGeFh2PnTIiEsYDlVrQtX4LwzvugS"
                            alt="Background"
                            fill
                            className="object-cover opacity-20"
                            sizes="100vw"
                        />
                        {/* <div className="absolute inset-0 bg-linear-to-br from-[#9FD3C7]/80 via-[#3db99b]/80 to-[#F4E4BC]/60" /> */}

                    </div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <p className="text-xl sm:text-3xl mb-8 font-medium">
                                Your clarity and peace matter. I look forward to connecting with you.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href="#booking-form"
                                        className="bg-white text-[#3db99b] px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all inline-block"
                                    >
                                        Book Now
                                    </Link>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href="mailto:psychicscapegoat@gmail.com"
                                        className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all inline-block"
                                    >
                                        Contact Me
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

