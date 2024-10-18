import React, { useState } from 'react';
import { Task } from '../App';
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';

interface TasksPageProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksPage: React.FC<TasksPageProps> = ({ tasks, setTasks }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'status'>>({
    name: '',
    priority: 'Medium',
    category: 'Work',
    dueDate: '',
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const task: Task = {
      ...newTask,
      id: Date.now(),
      status: 'Pending',
    };
    setTasks([...tasks, task]);
    setNewTask({ name: '', priority: 'Medium', category: 'Work', dueDate: '' });
    setShowAddForm(false);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTask({
      name: task.name,
      priority: task.priority,
      category: task.category,
      dueDate: task.dueDate,
    });
    setShowAddForm(true);
  };

  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      const updatedTasks = tasks.map((t) =>
        t.id === editingTask.id ? { ...editingTask, ...newTask } : t
      );
      setTasks(updatedTasks);
      setEditingTask(null);
      setNewTask({ name: '', priority: 'Medium', category: 'Work', dueDate: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status: t.status === 'Pending' ? 'Completed' : 'Pending' } : t
      )
    );
  };

  const pendingTasks = tasks.filter((t) => t.status === 'Pending');
  const completedTasks = tasks.filter((t) => t.status === 'Completed');

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-indigo-800">Your Tasks</h2>
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 mb-6 transition duration-200 transform hover:scale-105"
      >
        <Plus className="inline mr-2" size={18} />
        {editingTask ? 'Edit Task' : 'Add Task'}
      </button>

      {showAddForm && (
        <form onSubmit={editingTask ? handleUpdateTask : handleAddTask} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <input
            type="text"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            placeholder="Task name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 mb-4"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
            <select
              value={newTask.category}
              onChange={(e) => setNewTask({ ...newTask, category: e.target.value as Task['category'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Study">Study</option>
            </select>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 transition duration-200 transform hover:scale-105"
          >
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-indigo-700">Pending Tasks</h3>
          {pendingTasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow-md mb-4 border-l-4 border-yellow-500 transform hover:scale-102 transition-transform duration-200">
              <h4 className="font-bold text-lg mb-2">{task.name}</h4>
              <p className="text-sm text-gray-600 mb-1">Priority: {task.priority}</p>
              <p className="text-sm text-gray-600 mb-1">Category: {task.category}</p>
              <p className="text-sm text-gray-600 mb-3">Due Date: {task.dueDate}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleStatus(task.id)}
                  className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 transition duration-200"
                >
                  <CheckCircle className="inline mr-1" size={16} /> Complete
                </button>
                <button
                  onClick={() => handleEditTask(task)}
                  className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  <Edit2 className="inline mr-1" size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  <Trash2 className="inline mr-1" size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-indigo-700">Completed Tasks</h3>
          {completedTasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow-md mb-4 border-l-4 border-green-500 transform hover:scale-102 transition-transform duration-200">
              <h4 className="font-bold text-lg mb-2 line-through">{task.name}</h4>
              <p className="text-sm text-gray-600 mb-1">Priority: {task.priority}</p>
              <p className="text-sm text-gray-600 mb-1">Category: {task.category}</p>
              <p className="text-sm text-gray-600 mb-3">Due Date: {task.dueDate}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleStatus(task.id)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600 transition duration-200"
                >
                  <XCircle className="inline mr-1" size={16} /> Undo
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  <Trash2 className="inline mr-1" size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;