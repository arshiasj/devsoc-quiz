import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import QuestionsPage from './QuestionsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/questions-page" element={<QuestionsPage />} />
      </Routes>
    </Router>
  )
}

export default App
