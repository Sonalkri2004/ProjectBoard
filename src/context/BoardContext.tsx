import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, Column, SubTask } from '../types';

interface BoardContextType {
  columns: Column[];
  addTask: (status: string, task: Partial<Task>) => void;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, newStatus: string) => void;
  addColumn: (title: string) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [columns, setColumns] = useState<Column[]>(() => {
    const saved = localStorage.getItem('board');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Not started', tasks: [] },
      { id: '2', title: 'In progress', tasks: [] },
      { id: '3', title: 'Completed', tasks: [] },
    ];
  });

  useEffect(() => {
    localStorage.setItem('board', JSON.stringify(columns));
  }, [columns]);

  const addTask = (status: string, task: Partial<Task>) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: task.title || 'New Task',
      description: task.description || '',
      status,
      createdAt: new Date(),
      priority: task.priority || 'Medium',
      subtasks: task.subtasks || [],
    };

    setColumns(columns.map(col => 
      col.title === status 
        ? { ...col, tasks: [...col.tasks, newTask] }
        : col
    ));
  };

  const updateTask = (taskId: string, updatedTask: Partial<Task>) => {
    setColumns(columns.map(col => ({
      ...col,
      tasks: col.tasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              ...updatedTask,
              subtasks: updatedTask.subtasks || task.subtasks,
              priority: updatedTask.priority || task.priority
            } 
          : task
      )
    })));
  };

  const deleteTask = (taskId: string) => {
    setColumns(columns.map(col => ({
      ...col,
      tasks: col.tasks.filter(task => task.id !== taskId)
    })));
  };

  const moveTask = (taskId: string, newStatus: string) => {
    let taskToMove: Task | undefined;
    
    const newColumns = columns.map(col => {
      const task = col.tasks.find(t => t.id === taskId);
      if (task) taskToMove = task;
      return {
        ...col,
        tasks: col.tasks.filter(t => t.id !== taskId)
      };
    });

    if (taskToMove) {
      taskToMove.status = newStatus;
      setColumns(newColumns.map(col =>
        col.title === newStatus
          ? { ...col, tasks: [...col.tasks, taskToMove!] }
          : col
      ));
    }
  };

  const addColumn = (title: string) => {
    setColumns([...columns, {
      id: Date.now().toString(),
      title,
      tasks: []
    }]);
  };

  return (
    <BoardContext.Provider value={{ 
      columns, 
      addTask, 
      updateTask, 
      deleteTask, 
      moveTask,
      addColumn 
    }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) throw new Error('useBoard must be used within BoardProvider');
  return context;
};