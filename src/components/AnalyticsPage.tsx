import React from 'react';
import { Task } from '../App';
import { CheckCircle, Clock, BarChart, PieChart } from 'lucide-react';

interface AnalyticsPageProps {
  tasks: Task[];
}

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const pendingTasks = totalTasks - completedTasks;

  const tasksByCategory = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const tasksByPriority = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getProgressPercentage = () => {
    if (totalTasks === 0) return 0;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-indigo-800">Task Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-200">
          <BarChart className="mx-auto mb-4 text-indigo-500" size={48} />
          <h3 className="text-xl font-semibold mb-2 text-indigo-700">Total Tasks</h3>
          <p className="text-3xl font-bold text-indigo-600">{totalTasks}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-200">
          <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
          <h3 className="text-xl font-semibold mb-2 text-indigo-700">Completed Tasks</h3>
          <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-200">
          <Clock className="mx-auto mb-4 text-yellow-500" size={48} />
          <h3 className="text-xl font-semibold mb-2 text-indigo-700">Pending Tasks</h3>
          <p className="text-3xl font-bold text-yellow-600">{pendingTasks}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4 text-indigo-700">Overall Progress</h3>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                Task Completion
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-indigo-600">
                {getProgressPercentage()}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
            <div style={{ width: `${getProgressPercentage()}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700 flex items-center">
            <PieChart className="mr-2" size={24} />
            Tasks by Category
          </h3>
          <ul>
            {Object.entries(tasksByCategory).map(([category, count]) => (
              <li key={category} className="flex justify-between items-center mb-2">
                <span className="text-gray-700">{category}</span>
                <span className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full">{count}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700 flex items-center">
            <BarChart className="mr-2" size={24} />
            Tasks by Priority
          </h3>
          <ul>
            {Object.entries(tasksByPriority).map(([priority, count]) => (
              <li key={priority} className="flex justify-between items-center mb-2">
                <span className="text-gray-700">{priority}</span>
                <span className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;