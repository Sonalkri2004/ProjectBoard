import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BoardProvider } from './context/BoardContext';
import Board from './componenets/Board';
import TaskDetail from './componenets/TaskDetail';
import AnalyticsDashboard from './componenets/AnalyticsDashboard';

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