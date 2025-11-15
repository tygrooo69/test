import React from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutUs } from './components/AboutUs';
import { ServicesSection } from './components/ServicesSection';
import { GeminiAssistant } from './components/GeminiAssistant';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <section id="about" className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <AboutUs />
          </div>
        </section>
        <section id="services" className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4 lg:px-8">
            <ServicesSection />
          </div>
        </section>
        <section id="ai-assistant" className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <GeminiAssistant />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;