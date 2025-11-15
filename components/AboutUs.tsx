import React from 'react';
import { COMPANY_NAME, ABOUT_US_TEXT } from '../constants';

export const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="md:w-1/2">
        <img
          src="https://picsum.photos/600/400?random=2"
          alt="About Us"
          className="rounded-lg shadow-xl"
        />
      </div>
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">About {COMPANY_NAME}</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {ABOUT_US_TEXT}
        </p>
        <ul className="mt-6 space-y-3 text-lg text-gray-700">
          <li className="flex items-start">
            <svg className="w-6 h-6 text-indigo-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Innovation-driven solutions</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-indigo-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Client-focused approach</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-indigo-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Commitment to quality</span>
          </li>
        </ul>
      </div>
    </div>
  );
};