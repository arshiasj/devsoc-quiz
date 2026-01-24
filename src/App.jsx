import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import QuestionsPage from './QuestionsPage';
import CompletionPage from './CompletionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/questions-page" element={<QuestionsPage />} />
        <Route path='/completion-page' element={<CompletionPage />}/>
      </Routes>
    </Router>
  )
}

export default App
