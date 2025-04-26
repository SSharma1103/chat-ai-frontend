import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatComponent from '../components/chat';
import CreateChat from '../components/chatid';
import Login from '../components/login';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<CreateChat />} />
        <Route path="/chat" element={<ChatComponent />} />
      </Routes>
    </Router>
  );
}

export default App;