import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import ChatPage from './Pages/ChatPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import './App.css'

function App() {
  const apiURL = "http://10.0.0.212:3000/api"
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(localStorage.getItem("haxChatToken"));

  useEffect(() => {
   document.title = "x/HaxChat"
  }, []);
  return (
    <Routes>
      <Route index path="/register" element={<RegisterPage 
        username={username}
        setUsername={setUsername}
        apiURL={apiURL} />} />
      <Route path="/" element={<LoginPage 
        username={username}
        setUsername={setUsername}
        apiURL={apiURL}
        handleSetToken={setToken}
        token={token} />} />
      {/* <Route path="/login" element={<LoginPage 
        username={username}
        setUsername={setUsername}
        apiURL={apiURL}
        handleSetToken={setToken}
        token={token} />} /> */}
      <Route path="/chat" element={<ChatPage 
        username={username}
        apiURL={apiURL} />} />
    </Routes>
  )
}

export default App
