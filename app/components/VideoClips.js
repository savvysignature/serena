'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function VideoClips() {
    const [playingVideo, setPlayingVideo] = useState(null);

    // Placeholder video data - replace with actual video URLs/embeds
    const videoClips = [
        {
            id: 1,
            videoUrl: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9bnAJMVDL5ToQtORz6IVMnWAZ7vUSya9h28eB', // Replace with actual video
            thumbnail: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9EehyIeXghzBeMuE1YtwD9fQNqjvnHGc5KPVR',
        },
        {
            id: 2,
            videoUrl: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9OFExkOqrxGeFh2PnTIiEsYDlVrQtX4Lwzvug', // Replace with actual video
            thumbnail: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9Rgu3DecnKRdi3C9B5qogHbxLGwU02AOs6Tm7',
        },
        {
            id: 3,
            videoUrl: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9R4t4MF2cnKRdi3C9B5qogHbxLGwU02AOs6Tm', // Replace with actual video
            thumbnail: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9CsDLfYjEYPpn5hrM0D8gUdc17Ooyl6fZaCvj',
        },
        {
            id: 4,
            videoUrl: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9S9gwDiO6MoUv7qGzbLyhriEOdePHmQFxjaVN', // Replace with actual video
            thumbnail: 'http://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9b12MCXTDL5ToQtORz6IVMnWAZ7vUSya9h28e',
        },
    ];

    const handleVideoClick = (id) => {
        setPlayingVideo(id);
    };

    const handleCloseVideo = () => {
        setPlayingVideo(null);
    };

    // Handle ESC key to close video
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && playingVideo) {
                setPlayingVideo(null);
            }
        };

        if (playingVideo) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [playingVideo]);

    const currentVideo = videoClips.find(clip => clip.id === playingVideo);

    return (
        <section className="pb-20 sm:pb-24 lg:pb-32 bg-peach relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(159,211,199,0.1),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(244,228,188,0.1),transparent_60%)]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-linear-to-r from-[#28c09a] via-[#3db99b] to-[#f9c339] bg-clip-text text-transparent">
                            Insights from Serena Day
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore topics on healing, transformation, and spiritual growth
                    </p>
                </motion.div>

                {/* Video Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
                    {videoClips.map((clip, index) => (
                        <motion.div
                            key={clip.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-mint/30 group cursor-pointer"
                            onClick={() => handleVideoClick(clip.id)}
                        >
                            {/* Video Container */}
                            <div className="relative h-80 bg-gray-900 overflow-hidden">
                                {/* Thumbnail */}
                                <div className="relative w-full h-full">
                                    <Image
                                        src={clip.thumbnail}
                                        alt={clip.title}
                                        fill
                                        className="object-cover h-full group-hover:scale-110 transition-transform duration-500"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                                    {/* Play button */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-xl"
                                        >
                                            <svg
                                                className="w-8 h-8 md:w-10 md:h-10 text-[#3db99b]"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            {/* <div className="p-6">
                                <h3 className="text-lg md:text-xl font-bold text-[#28c09a] mb-2 line-clamp-2">
                                    {clip.title}
                                </h3>
                                <p className="text-sm md:text-base text-gray-600 leading-relaxed line-clamp-2">
                                    {clip.description}
                                </p>
                            </div> */}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Fullscreen Video Modal */}
            <AnimatePresence>
                {playingVideo && currentVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
                        onClick={handleCloseVideo}
                    >
                        {/* Exit Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCloseVideo();
                            }}
                            className="absolute top-4 right-4 md:top-8 md:right-8 z-10 w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all group"
                            aria-label="Close video"
                        >
                            <svg
                                className="w-6 h-6 md:w-7 md:h-7 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </motion.button>

                        {/* Video Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full h-full flex items-center justify-center p-4 md:p-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full max-w-7xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                                <video
                                    src={currentVideo.videoUrl}
                                    controls
                                    autoPlay
                                    className="w-full h-full"
                                    onEnded={handleCloseVideo}
                                >
                                    Your browser does not support the video tag.
                                </video>

                                {/* Video Title Overlay */}
                                {/* <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6">
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                        {currentVideo.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-white/80">
                                        {currentVideo.description}
                                    </p>
                                </div> */}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

