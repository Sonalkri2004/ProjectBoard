import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBoard } from '../context/BoardContext';
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline';
import { SubTask } from '../types';

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600';
    case 'medium':
      return 'from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600';
    case 'low':
      return 'from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600';
    default:
      return 'from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600';
  }
};

const TaskDetail: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { columns, updateTask, deleteTask, moveTask } = useBoard();

  const task = columns
    .flatMap(col => col.tasks)
    .find(t => t.id === taskId);

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState(task?.status || '');
  const [priority, setPriority] = useState(task?.priority || 'Medium');
  const [subtasks, setSubtasks] = useState<SubTask[]>(task?.subtasks || []);
  const [newSubtask, setNewSubtask] = useState('');

  if (!task) return <div>Task not found</div>;

  const completedSubtasks = subtasks.filter(st => st.completed).length;
  const progress = subtasks.length > 0 
    ? (completedSubtasks / subtasks.length) * 100 
    : 0;

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([
        ...subtasks,
        { id: Date.now().toString(), title: newSubtask, completed: false }
      ]);
      setNewSubtask('');
    }
  };

  const toggleSubtask = (subtaskId: string) => {
    setSubtasks(subtasks.map(st => 
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    ));
  };

  const handleSave = () => {
    if (status !== task.status) {
      moveTask(taskId!, status);
    }
    updateTask(taskId!, {
      title,
      description,
      status,
      priority,
      subtasks
    });
    navigate('/');
  };

  const handleDelete = () => {
    deleteTask(taskId!);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060551] via-[#5748D1] to-[#060551] p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-gray-300 hover:text-white 
            transition-all duration-300 group"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 
            transition-transform duration-300" />
          Back to Board
        </button>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700 p-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
            Task Details
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                outline-none text-white placeholder-gray-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
              className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                outline-none text-white"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                outline-none text-white placeholder-gray-400 h-32 resize-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Subtasks Progress
            </label>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-400 mb-4">
              {completedSubtasks} of {subtasks.length} completed
            </div>

            <div className="space-y-2 mb-4">
              {subtasks.map(subtask => (
                <div 
                  key={subtask.id}
                  className="flex items-center bg-gray-800/30 p-3 rounded-lg group hover:bg-gray-800/50 transition-all duration-300"
                >
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => toggleSubtask(subtask.id)}
                    className="w-4 h-4 mr-3 rounded border-gray-600 text-purple-500 focus:ring-purple-500"
                  />
                  <span className={`text-gray-300 ${subtask.completed ? 'line-through text-gray-500' : ''}`}>
                    {subtask.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                placeholder="Add a subtask"
                className="flex-1 p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
              />
              <button
                onClick={handleAddSubtask}
                className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                outline-none text-white"
            >
              {columns.map(col => (
                <option 
                  key={col.id} 
                  value={col.title}
                  className="bg-gray-800 text-white"
                >
                  {col.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 
                text-white rounded-lg hover:from-red-600 hover:to-pink-600 
                transition-all duration-300 shadow-lg shadow-red-500/20 
                hover:shadow-red-500/40 transform hover:-translate-y-0.5"
            >
              Delete
            </button>
            <button
              onClick={handleSave}
              className={`px-6 py-3 bg-gradient-to-r ${getPriorityColor(priority)} text-white rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:-translate-y-0.5`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;