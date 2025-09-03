
import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);


export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-xl font-bold text-gray-800">{title}</span>
        <ChevronDownIcon
          className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`transition-all duration-500 ease-in-out grid ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
            <div className="p-6 bg-white text-gray-700 space-y-4">
                {children}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;