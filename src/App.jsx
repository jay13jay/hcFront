import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import ChatPage from './Pages/ChatPage'
// import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import './App.css'



function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
   document.title = "x/HaxChat"
  }, []);
  return (
    <Routes>
      <Route index path="/" element={<RegisterPage 
        username={username}
        setUsername={setUsername} />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route path="/chat" element={<ChatPage 
        username={username} />} />
    </Routes>
  )
}

export default App
