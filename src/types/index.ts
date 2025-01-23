export interface SubTask {
    id: string;
    title: string;
    completed: boolean;
  }
  
  export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: Date;
    priority: 'High' | 'Medium' | 'Low';
    subtasks: SubTask[];
  }

  export interface Column {
    id: string;
    title: string;
    tasks: Task[];
  }