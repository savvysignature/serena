'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Select from 'react-select';
import { countries } from 'countries-list';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function BookingPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        sessionType: '',
        country: null,
        timezone: '',
        preferredDate: '',
        preferredTime: '',
        contactMethod: '',
        message: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Country to timezone mapping (common timezones for major countries)
    const countryTimezones = useMemo(() => ({
        'AU': 'Australia/Brisbane', // Australia (Queensland)
        'NZ': 'Pacific/Auckland', // New Zealand
        'US': 'America/New_York', // United States (Eastern)
        'GB': 'Europe/London', // United Kingdom
        'CA': 'America/Toronto', // Canada (Eastern)
        'IN': 'Asia/Kolkata', // India
        'JP': 'Asia/Tokyo', // Japan
        'CN': 'Asia/Shanghai', // China
        'DE': 'Europe/Berlin', // Germany
        'FR': 'Europe/Paris', // France
        'IT': 'Europe/Rome', // Italy
        'ES': 'Europe/Madrid', // Spain
        'BR': 'America/Sao_Paulo', // Brazil
        'MX': 'America/Mexico_City', // Mexico
        'ZA': 'Africa/Johannesburg', // South Africa
        'AE': 'Asia/Dubai', // UAE
        'SG': 'Asia/Singapore', // Singapore
    }), []);

    // Convert time from user's timezone to Australia/Queensland (Brisbane) timezone
    const convertToAustraliaTime = (date, time, userTimezone) => {
        if (!date || !time || !userTimezone) return null;

        try {
            // Parse the date and time
            const [year, month, day] = date.split('-').map(Number);
            const [hours, minutes] = time.split(':').map(Number);

            // Create a date string in ISO format
            const dateTimeString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
            
            // Create a date object - this will be in the browser's local timezone
            // We need to interpret this as being in the user's selected timezone
            // and convert it to Australia/Queensland (Brisbane)
            
            // Step 1: Create a date assuming the input is in user's timezone
            // We'll use a workaround: create the date and then adjust based on timezone offsets
            
            // Get the current timezone offset for the user's timezone on this date
            const testDate = new Date(dateTimeString);
            const userTimeStr = testDate.toLocaleString('en-US', {
                timeZone: userTimezone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            });
            
            // Parse the formatted string to get the actual time components
            const userMatch = userTimeStr.match(/(\d+)\/(\d+)\/(\d+),?\s+(\d+):(\d+):(\d+)/);
            if (!userMatch) throw new Error('Failed to parse user time');
            
            // Create a date object representing the same moment in UTC
            // The difference between what we created and what the timezone shows gives us the offset
            const userLocal = new Date(
                parseInt(userMatch[3]),
                parseInt(userMatch[1]) - 1,
                parseInt(userMatch[2]),
                parseInt(userMatch[4]),
                parseInt(userMatch[5]),
                parseInt(userMatch[6])
            );
            
            // Calculate the offset
            const offsetMs = testDate.getTime() - userLocal.getTime();
            
            // Now create the actual date from user's input, adjusted for their timezone
            const userInputDate = new Date(
                year,
                month - 1,
                day,
                hours,
                minutes
            );
            
            // Adjust to account for timezone
            const utcEquivalent = new Date(userInputDate.getTime() - offsetMs);
            
            // Now format this in Australia/Queensland (Brisbane) timezone
            const ausFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Australia/Brisbane',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            });
            
            const ausFormatted = ausFormatter.format(utcEquivalent);
            const ausMatch = ausFormatted.match(/(\d+):(\d+)\s*(AM|PM)/i);
            
            if (ausMatch) {
                return `${ausMatch[1]}:${ausMatch[2]} ${ausMatch[3].toUpperCase()}`;
            }
            
            // Fallback formatting
            const ausParts = ausFormatter.formatToParts(utcEquivalent);
            const ausHour = parseInt(ausParts.find(p => p.type === 'hour')?.value || '0');
            const ausMinute = parseInt(ausParts.find(p => p.type === 'minute')?.value || '0');
            const ausPeriod = ausParts.find(p => p.type === 'dayPeriod')?.value?.toUpperCase() || '';
            
            const hours12 = ausHour % 12 || 12;
            const minutes12 = String(ausMinute).padStart(2, '0');
            const ampm = ausPeriod || (ausHour >= 12 ? 'PM' : 'AM');
            
            return `${hours12}:${minutes12} ${ampm}`;
        } catch (error) {
            console.error('Error converting time:', error);
            // Fallback: return the time as-is with AM/PM
            const [hours, minutes] = time.split(':').map(Number);
            const hours12 = hours % 12 || 12;
            const minutes12 = String(minutes).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            return `${hours12}:${minutes12} ${ampm}`;
        }
    };

    // Format time in AM/PM
    const formatTimeAMPM = (timeString) => {
        if (!timeString) return '';
        const [hours, minutes] = timeString.split(':').map(Number);
        const hours12 = hours % 12 || 12;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        return `${hours12}:${String(minutes).padStart(2, '0')} ${ampm}`;
    };



    // Convert countries object to array for react-select
    const countryOptions = useMemo(() => {
        return Object.entries(countries).map(([code, country]) => ({
            value: code,
            label: country.name,
            timezone: countryTimezones[code] || 'UTC',
        })).sort((a, b) => a.label.localeCompare(b.label));
    }, [countryTimezones]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSessionTypeChange = (selectedOption) => {
        setFormData(prev => ({
            ...prev,
            sessionType: selectedOption?.value,
        }));
    };

    const handleCountryChange = (selectedOption) => {
        const selectedCountry = countryOptions.find(c => c.value === selectedOption?.value);
        setFormData(prev => ({
            ...prev,
            country: selectedOption,
            timezone: selectedCountry?.timezone || '',
            preferredTime: '', // Reset time when country changes
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate country is selected
        if (!formData.country) {
            alert('Please select a country');
            return;
        }

        // Validate time is selected
        if (!formData.preferredTime) {
            alert('Please select a preferred time');
            return;
        }

        // Get selected country timezone
        const selectedCountry = countryOptions.find(c => c.value === formData.country?.value);
        const userTimezone = selectedCountry?.timezone || 'UTC';

        // Convert time to Australia/Queensland (Brisbane) timezone
        const australiaTime = convertToAustraliaTime(
            formData.preferredDate,
            formData.preferredTime,
            userTimezone
        );

        // Prepare data to send
        const bookingData = {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            sessionType: formData.sessionType,
            country: formData.country,
            timezone: formData.timezone,
            preferredDate: formData.preferredDate,
            preferredTime: formData.preferredTime,
            userTimezone: userTimezone,
            userTime: formatTimeAMPM(formData.preferredTime),
            australiaTime: australiaTime,
            australiaTimezone: 'Australia/Brisbane',
            message: formData.message,
        };

        setIsLoading(true);
        
        try {
            // Send booking data to API
            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit booking');
            }

            // Success - show success message
            setIsSubmitted(true);
            setIsLoading(false);
            
            // Reset form after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    sessionType: '',
                    country: null,
                    timezone: '',
                    preferredDate: '',
                    preferredTime: '',
                    contactMethod: '',
                    message: '',
                });
            }, 3000);
        } catch (error) {
            console.error('Error submitting booking:', error);
            setIsLoading(false);
            alert('Failed to submit booking. Please try again or contact us directly.');
        }
    };

    const readingOptions = [
        {
            title: 'Psychic Reading ',
            value: '30-min-psychic',
            duration: '30 minutes',
            description: 'Focused guidance on your current challenges and questions',
            price: '$80 AUD',
            image: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9qunkBxRo910byKfepAWMI45wBLUOcJFxh3lG',
        },
        {
            title: 'Psychic Reading',
            value: '60-min-psychic',
            duration: '60 minutes',
            description: 'Full intuitive reading + emotional support and deeper exploration',
            price: '$150 AUD',
            image: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9CVAlTmEYPpn5hrM0D8gUdc17Ooyl6fZaCvjW',
        },
        {
            title: 'Spiritual Counselling',
            value: '60-min-counselling',
            duration: '60 minutes',
            description: 'A safe space to speak openly and be heard. No tarot cards or predictions',
            price: '$140 AUD',
            image: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9jOqvwAUmDqtyS0rVoKQbgTLw4FIcUu7deiz3',
        },
    ];


    const sessionTypeOptions = useMemo(() => {
        return readingOptions ? readingOptions.map((option, index) => ({
            key: index,
            value: option.value,
            label: option.title + ' - ' + option.duration,
        })) : [];
    }, [readingOptions]);

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

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="sessionType" className="block text-sm font-medium text-gray-700 mb-2">
                                                Session Type *
                                            </label>
                                            <Select
                                                id="sessionType"
                                                name="sessionType"
                                                required
                                                value={sessionTypeOptions.find(option => option.value === formData.sessionType)}
                                                onChange={handleSessionTypeChange}
                                                options={sessionTypeOptions}
                                                placeholder="Select a session type"
                                                className="react-select-container"
                                                classNamePrefix="react-select"
                                            />

                                        </div>
                                        <div>
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                                                Country *
                                            </label>
                                            <Select
                                                id="country"
                                                name="country"
                                                required
                                                value={formData.country}
                                                onChange={handleCountryChange}
                                                options={countryOptions}
                                                placeholder="Select a country"
                                                isSearchable
                                                className="react-select-container"
                                                classNamePrefix="react-select"
                                                styles={{
                                                    control: (base) => ({
                                                        ...base,
                                                        minHeight: '48px',
                                                        borderColor: '#d1d5db',
                                                        '&:hover': {
                                                            borderColor: '#9FD3C7',
                                                        },
                                                    }),
                                                    option: (base, state) => ({
                                                        ...base,
                                                        backgroundColor: state.isSelected
                                                            ? '#9FD3C7'
                                                            : state.isFocused
                                                                ? '#9FD3C7/20'
                                                                : 'white',
                                                        color: state.isSelected ? 'white' : '#1f2937',
                                                        '&:hover': {
                                                            backgroundColor: '#9FD3C7/30',
                                                        },
                                                    }),
                                                }}
                                            />
                                        </div>
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
                                                Preferred Time {formData.country && formData.timezone && `(${formData.timezone})`} *
                                            </label>
                                            {formData.country ? (
                                                <input
                                                    type="time"
                                                    id="preferredTime"
                                                    name="preferredTime"
                                                    required
                                                    value={formData.preferredTime}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9FD3C7] focus:border-[#9FD3C7] transition-all"
                                                />
                                            ) : (
                                                <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-400">
                                                    Please select a country first
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* 
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
                                    </div> */}

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
                                    {/* 
                                    <p className="text-gray-600 text-xs mt-4">
                                        <strong>Disclaimer:</strong> No tarot will be used and no predictions given. This session will provide a space for you to speak openly and be heard and supported by someone who understands. I offer compassionate insights and observations. My intention is always to help you reconnect with your own inner guidance and power.

                                    </p> */}

                                    <motion.button
                                        type="submit"
                                        disabled={isLoading}
                                        whileHover={!isLoading ? { scale: 1.05 } : {}}
                                        whileTap={!isLoading ? { scale: 0.95 } : {}}
                                        className={`w-full px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all flex items-center justify-center gap-3 ${
                                            isLoading
                                                ? 'bg-[#28c09a]/70 text-white cursor-not-allowed'
                                                : 'bg-[#28c09a] text-white cursor-pointer hover:bg-[#28c09a] hover:shadow-xl'
                                        }`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg
                                                    className="animate-spin h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            'Confirm Booking'
                                        )}
                                    </motion.button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </section>

                {/* FAQ Section */}
                {/* <section className="py-20 bg-peach">
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
                </section> */}

                {/* Final CTA */}
                <section className="py-20 bg-linear-to-tl from-pink-500/30 to-amber-500/30 text-white relative overflow-hidden">
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
                                        className="bg-white text-pink-500 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all inline-block"
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
                                        className="bg-transparent text-pink-500 border-2 border-pink-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-pink-500/10 transition-all inline-block"
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

