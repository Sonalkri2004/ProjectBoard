import React, { useState } from 'react';
import { 
  DndContext, 
  DragOverlay,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor
} from '@dnd-kit/core';
import Column from './Column';
import { useBoard } from '../context/BoardContext';
import { PlusIcon } from '@heroicons/react/24/outline';
import TaskCard from './TaskCard';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Board: React.FC = () => {
  const { columns, moveTask, addColumn } = useBoard();
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [showNewColumnInput, setShowNewColumnInput] = useState(false);
  const [activeTask, setActiveTask] = useState<any>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeTaskId = active.id as string;
    const overColumnId = over.id as string;

    moveTask(activeTaskId, overColumnId);
    setActiveTask(null);
  };

  const handleDragStart = (event: any) => {
    const task = columns
      .flatMap(col => col.tasks)
      .find(t => t.id === event.active.id);
    setActiveTask(task);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060551] via-[#5748D1] to-[#060551] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Project Board
          </h1>
          <div className="flex gap-4">
            <Link
              to="/analytics"
              className="flex items-center px-6 py-3 bg-gray-800/50 text-white rounded-lg 
                hover:bg-gray-700/50 transition-all duration-300 shadow-lg border border-gray-700"
            >
              <ChartBarIcon className="w-5 h-5 mr-2" />
              Analytics
            </Link>
            <button
              onClick={() => setShowNewColumnInput(true)}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 
                text-white rounded-lg hover:from-blue-600 hover:to-purple-600 
                transition-all duration-300 shadow-lg"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Column
            </button>
          </div>
        </div>

        {showNewColumnInput && (
          <div className="mb-6 flex gap-2 bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-700">
            <input
              type="text"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              className="flex-1 p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-400"
              placeholder="Enter column title"
            />
            <button
              onClick={() => {
                addColumn(newColumnTitle);
                setNewColumnTitle('');
                setShowNewColumnInput(false);
              }}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-green-500/20"
            >
              Add
            </button>
            <button
              onClick={() => setShowNewColumnInput(false)}
              className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        )}

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {columns.map((column) => (
              <Column key={column.id} column={column} />
            ))}
          </div>
          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Board;