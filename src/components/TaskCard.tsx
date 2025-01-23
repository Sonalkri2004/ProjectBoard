import React from 'react';
import { Link } from 'react-router-dom';
import { useDraggable } from '@dnd-kit/core';
import { Task } from '../types';

interface Props {
  task: Task;
  isDragging?: boolean;
}

const getPriorityBadge = (priority: string | undefined) => {
  const baseClasses = "text-xs px-2 py-1 rounded-full font-medium";
  
  if (!priority) {
    return `${baseClasses} bg-blue-500/20 text-blue-300 border border-blue-500/30`;
  }

  switch (priority.toLowerCase()) {
    case 'high':
      return `${baseClasses} bg-red-500/20 text-red-300 border border-red-500/30`;
    case 'medium':
      return `${baseClasses} bg-yellow-500/20 text-yellow-300 border border-yellow-500/30`;
    case 'low':
      return `${baseClasses} bg-green-500/20 text-green-300 border border-green-500/30`;
    default:
      return `${baseClasses} bg-blue-500/20 text-blue-300 border border-blue-500/30`;
  }
};

const TaskCard: React.FC<Props> = ({ task, isDragging }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const completedSubtasks = task.subtasks?.filter(st => st.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-lg mb-3 
        cursor-grab border border-gray-700
        transition-all duration-300 ease-in-out
        hover:shadow-xl hover:scale-[1.02] hover:bg-gray-700/50
        hover:border-purple-500/50 group
        ${isDragging ? 'shadow-2xl rotate-3 scale-105 bg-gray-700/70' : ''}
        animate-fadeIn
      `}
    >
      <Link to={`/task/${task.id}`} className="block">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-100 group-hover:text-purple-300 
            transition-colors duration-300">
            {task.title}
          </h3>
          <span className={getPriorityBadge(task.priority)}>
            {task.priority || 'Medium'}
          </span>
        </div>

        {task.description && (
          <p className="text-sm text-gray-300 line-clamp-2 mb-3 
            group-hover:text-gray-200 transition-colors duration-300">
            {task.description}
          </p>
        )}

        {totalSubtasks > 0 && (
          <div className="mb-3">
            <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-400 group-hover:text-purple-300/70">
              {completedSubtasks} of {totalSubtasks} subtasks
            </div>
          </div>
        )}

        <div className="text-xs text-gray-400 flex items-center 
          group-hover:text-purple-300/70 transition-colors duration-300">
          <span className="flex items-center">
            <svg 
              className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default TaskCard;