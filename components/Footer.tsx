import React from 'react';
import { COMPANY_NAME } from '../constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col items-center justify-between text-center md:flex-row">
        <div className="mb-4 md:mb-0">
          <p>&copy; {currentYear} {COMPANY_NAME}. All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          <a href="#top" className="text-gray-300 hover:text-white transition-colors duration-200">Back to Top</a>
        </div>
      </div>
    </footer>
  );
};