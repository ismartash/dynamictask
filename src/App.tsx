import React, { useState } from 'react';
import { LogOut, Home, CheckSquare, BarChart2 } from 'lucide-react';
import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';
import TasksPage from './components/TasksPage';
import AnalyticsPage from './components/AnalyticsPage';

export interface Task {
  id: number;
  name: string;
  priority: 'Low' | 'Medium' | 'High';
  category: 'Work' | 'Personal' | 'Study';
  dueDate: string;
  status: 'Pending' | 'Completed';
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  if (!isLoggedIn) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">TaskMaster</div>
          <nav className="flex space-x-6">
            <button onClick={() => setCurrentPage('home')} className={`flex items-center hover:text-indigo-200 transition-colors duration-200 ${currentPage === 'home' ? 'border-b-2 border-white' : ''}`}>
              <Home className="mr-1" size={18} />
              Home
            </button>
            <button onClick={() => setCurrentPage('tasks')} className={`flex items-center hover:text-indigo-200 transition-colors duration-200 ${currentPage === 'tasks' ? 'border-b-2 border-white' : ''}`}>
              <CheckSquare className="mr-1" size={18} />
              Tasks
            </button>
            <button onClick={() => setCurrentPage('analytics')} className={`flex items-center hover:text-indigo-200 transition-colors duration-200 ${currentPage === 'analytics' ? 'border-b-2 border-white' : ''}`}>
              <BarChart2 className="mr-1" size={18} />
              Analytics
            </button>
            <button onClick={handleLogout} className="flex items-center hover:text-indigo-200 transition-colors duration-200">
              <LogOut className="mr-1" size={18} />
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-8 p-4">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'tasks' && <TasksPage tasks={tasks} setTasks={setTasks} />}
        {currentPage === 'analytics' && <AnalyticsPage tasks={tasks} />}
      </main>
    </div>
  );
};

export default App;