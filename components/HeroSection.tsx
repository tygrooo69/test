import React from 'react';
import { COMPANY_NAME, SLOGAN } from '../constants';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-indigo-500 to-blue-600 h-96 flex items-center justify-center text-white overflow-hidden">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(https://picsum.photos/1920/1080?random=1)` }}
        aria-hidden="true"
      ></div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4">
          {COMPANY_NAME}
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-8">
          {SLOGAN}
        </p>
        <a
          href="#ai-assistant"
          className="inline-block bg-white text-indigo-700 hover:bg-indigo-100 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Explore AI Assistant
        </a>
      </div>
    </div>
  );
};