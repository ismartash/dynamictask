import React from 'react';
import { CheckCircle, Clock, BarChart, Target } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-800">Welcome to TaskMaster</h1>
      
      <div className="mb-12 text-center">
        <p className="text-xl text-gray-700 mb-4">
          Organize your tasks efficiently and boost your productivity with TaskMaster. Our intuitive interface and comprehensive features make task management a breeze, helping you stay on top of your to-do list effortlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-200">
          <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
          <h3 className="text-xl font-semibold mb-2 text-indigo-700">Effortless Task Management</h3>
          <p className="text-gray-600">Easily create, organize, and complete tasks with our user-friendly interface.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-200">
          <Clock className="mx-auto mb-4 text-blue-500" size={48} />
          <h3 className="text-xl font-semibold mb-2 text-indigo-700">Time-Saving Features</h3>
          <p className="text-gray-600">Prioritize tasks, set due dates, and categorize your work for maximum efficiency.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-200">
          <BarChart className="mx-auto mb-4 text-purple-500" size={48} />
          <h3 className="text-xl font-semibold mb-2 text-indigo-700">Insightful Analytics</h3>
          <p className="text-gray-600">Track your progress and productivity with our built-in analytics dashboard.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-200">
          <Target className="mx-auto mb-4 text-red-500" size={48} />
          <h3 className="text-xl font-semibold mb-2 text-indigo-700">Goal Achievement</h3>
          <p className="text-gray-600">Set and accomplish your goals with our structured task management system.</p>
        </div>
      </div>

      <div className="bg-indigo-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-indigo-800">Get Started Today</h2>
        <p className="text-gray-700 mb-4">
          TaskMaster is designed to help you achieve more, stress less, and stay organized. Whether you're managing personal tasks, work projects, or study assignments, our powerful yet simple tool has got you covered.
        </p>
        <p className="text-gray-700">
          Start by adding your first task in the Tasks section, and experience the difference that efficient task management can make in your daily life!
        </p>
      </div>
    </div>
  );
};

export default HomePage;