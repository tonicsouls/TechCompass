
import React from 'react';
import { AppView } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { BookIcon } from './icons/BookIcon';


interface WelcomeScreenProps {
  onNavigate: (view: AppView) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
          Welcome to Tech Compass
        </h1>
        <p className="text-lg text-gray-600">
          Your friendly guide to solving tech problems.
        </p>
        <p className="text-lg text-gray-600 mt-1">
          How would you like to get started?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* AI Troubleshooter Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border">
          <div className="bg-gray-100 p-4 rounded-full mb-5">
            <SparklesIcon className="w-12 h-12 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            AI Troubleshooter
          </h2>
          <p className="text-gray-600 mb-6 flex-grow">
            Get personalized, step-by-step help. Our AI assistant can look at your screen to guide you to a solution.
          </p>
          <button
            onClick={() => onNavigate(AppView.TROUBLESHOOTER)}
            className="w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Start AI Session
          </button>
        </div>

        {/* Tech 101 Guides Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border">
          <div className="bg-gray-100 p-4 rounded-full mb-5">
            <BookIcon className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Tech 101 Guides
          </h2>
          <p className="text-gray-600 mb-6 flex-grow">
            Browse our library of easy-to-follow guides and tutorials on a wide range of tech topics.
          </p>
          <button
            onClick={() => onNavigate(AppView.TECH101)}
            className="w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Browse Guides
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;