'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseMe from './components/WhyChooseMe';
import Areas from './components/Areas';
import CTA from './components/CTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-peach">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseMe />
        <Areas />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
