import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Task } from '../types';
import TaskCard from './TaskCard';
import { useBoard } from '../context/BoardContext';
import { PlusIcon } from '@heroicons/react/24/outline';

interface Props {
  column: {
    id: string;
    title: string;
    tasks: Task[];
  };
}

const getColumnStyle = (title: string) => {
  switch (title.toLowerCase()) {
    case 'not started':
      return 'from-[#1B1161]/50 to-[#2D1F93]/30 border-[#2D1F93]/30';
    case 'in progress':
      return 'from-[#1B1161]/50 to-[#2D1F93]/30 border-[#2D1F93]/30';
    case 'completed':
      return 'from-[#1B1161]/50 to-[#2D1F93]/30 border-[#2D1F93]/30';
    default:
      return 'from-[#1B1161]/50 to-[#2D1F93]/30 border-[#2D1F93]/30';
  }
};

const Column: React.FC<Props> = ({ column }) => {
  const { addTask } = useBoard();
  const [showNewTaskInput, setShowNewTaskInput] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const { setNodeRef, isOver } = useDroppable({
    id: column.title,
  });

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(column.title, { title: newTaskTitle });
      setNewTaskTitle('');
      setShowNewTaskInput(false);
    }
  };

  return (
    <div 
      className={`
        bg-gradient-to-b ${getColumnStyle(column.title)} 
        rounded-xl p-4 shadow-lg backdrop-blur-sm border
        transition-all duration-500 ease-in-out
        hover:shadow-2xl hover:scale-[1.02] hover:backdrop-blur-lg
        hover:border-[#4F46E5]/50 group
      `}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-100 flex items-center">
          {column.title}
          <span className="ml-2 px-3 py-1 bg-gray-800/50 rounded-full text-sm font-medium text-gray-300
            group-hover:bg-gray-700/50 transition-colors duration-300">
            {column.tasks.length}
          </span>
        </h2>
      </div>

      <div
        ref={setNodeRef}
        className={`
          min-h-[200px] transition-all duration-300 rounded-lg
          ${isOver ? 'bg-gray-800/30 scale-105' : ''}
        `}
      >
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {showNewTaskInput ? (
        <div className="mt-4 space-y-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-400"
            placeholder="Enter task title"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddTask}
              className="flex-1 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
            >
              Add
            </button>
            <button
              onClick={() => setShowNewTaskInput(false)}
              className="flex-1 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowNewTaskInput(true)}
          className="mt-4 w-full py-2 flex items-center justify-center text-gray-300 
            hover:bg-[#1B1161]/50 rounded-lg transition-all duration-300"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Task
        </button>
      )}
    </div>
  );
};

export default Column;