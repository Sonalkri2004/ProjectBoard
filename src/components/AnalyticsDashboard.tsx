import React, { useMemo } from 'react';
import { useBoard } from '../context/BoardContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnalyticsDashboard: React.FC = () => {
  const { columns } = useBoard();
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const totalTasks = columns.reduce((acc, col) => acc + col.tasks.length, 0);
    const tasksByStatus = columns.reduce((acc, col) => {
      acc[col.title] = col.tasks.length;
      return acc;
    }, {} as Record<string, number>);

    const tasksByPriority = columns.reduce((acc, col) => {
      col.tasks.forEach(task => {
        const priority = task.priority || 'Medium';
        acc[priority] = (acc[priority] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const completedSubtasks = columns.reduce((acc, col) => {
      col.tasks.forEach(task => {
        acc.total += task.subtasks?.length || 0;
        acc.completed += task.subtasks?.filter(st => st.completed).length || 0;
      });
      return acc;
    }, { total: 0, completed: 0 });

    return {
      totalTasks,
      tasksByStatus,
      tasksByPriority,
      completedSubtasks
    };
  }, [columns]);

  const statusChartData = {
    labels: Object.keys(stats.tasksByStatus),
    datasets: [
      {
        label: 'Tasks by Status',
        data: Object.values(stats.tasksByStatus),
        backgroundColor: [
          'rgba(99, 102, 241, 0.5)',
          'rgba(168, 85, 247, 0.5)',
          'rgba(59, 130, 246, 0.5)',
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(59, 130, 246, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const priorityChartData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        data: [
          stats.tasksByPriority.High || 0,
          stats.tasksByPriority.Medium || 0,
          stats.tasksByPriority.Low || 0,
        ],
        backgroundColor: [
          'rgba(239, 68, 68, 0.5)',
          'rgba(234, 179, 8, 0.5)',
          'rgba(34, 197, 94, 0.5)',
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(34, 197, 94, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060551] via-[#5748D1] to-[#060551] p-6">
      <div className="max-w-7xl mx-auto">
      <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-gray-300 hover:text-white 
            transition-all duration-300 group"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 
            transition-transform duration-300" />
          Back to Board
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
          Analytics Dashboard
        </h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Total Tasks</h3>
            <p className="text-4xl font-bold text-white">{stats.totalTasks}</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Completed Tasks</h3>
            <p className="text-4xl font-bold text-white">{stats.tasksByStatus['Completed'] || 0}</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-gray-400 text-sm font-medium mb-2">High Priority Tasks</h3>
            <p className="text-4xl font-bold text-white">{stats.tasksByPriority['High'] || 0}</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Subtasks Progress</h3>
            <p className="text-4xl font-bold text-white">
              {Math.round((stats.completedSubtasks.completed / stats.completedSubtasks.total) * 100 || 0)}%
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-gray-300 text-lg font-medium mb-4">Tasks by Status</h3>
            <Bar
              data={statusChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)',
                    },
                  },
                  x: {
                    ticks: {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
            />
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-gray-300 text-lg font-medium mb-4">Tasks by Priority</h3>
            <div className="w-full max-w-[300px] mx-auto">
              <Doughnut
                data={priorityChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom' as const,
                      labels: {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;