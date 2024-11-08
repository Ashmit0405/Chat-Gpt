import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HealConnectPage from './components/healconnect.jsx';
import ChatBot from './components/ChatBot.jsx';  // Import your chatbot component
import React,{useState} from 'react';
function App() {
  const [chatBot, setChatBot] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HealConnectPage />} />
        <Route path="/chatbot" element={<ChatBot chatBot={chatBot} setChatBot={setChatBot}/>} />
      </Routes>
    </Router>
  );
}

export default App;
