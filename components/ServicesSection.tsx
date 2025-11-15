import React from 'react';
import { SERVICES_LIST } from '../constants';

export const ServicesSection: React.FC = () => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
        At Elegance Corp, we provide a spectrum of services designed to propel your business forward with innovation and efficiency.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SERVICES_LIST.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col items-center text-center"
          >
            <div className="flex-shrink-0 mb-4">
              <svg className="h-12 w-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {/* Example icons - could be more specific based on service */}
                {index === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>}
                {index === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 4l-4 4 4 4"></path>}
                {index === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>}
                {index === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-1-3m-6.002 0V9a2 2 0 012-2h4a2 2 0 012 2v8m-6 0h6"></path>}
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
            <p className="text-gray-600 text-base">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};