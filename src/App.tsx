import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BoardProvider } from './context/BoardContext';
import Board from './components/Board';
import TaskDetail from './components/TaskDetail';
import AnalyticsDashboard from './components/AnalyticsDashboard';

function App() {
  return (
    <BoardProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/task/:taskId" element={<TaskDetail />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
        </Routes>
      </Router>
    </BoardProvider>
  );
}

export default App;