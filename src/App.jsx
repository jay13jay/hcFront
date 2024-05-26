import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import ChatPage from './Pages/ChatPage'
import './App.css'



function App() {
  useEffect(() => {
   document.title = "x/HaxChat"
  }, []);
  return (
    <Routes>
      <Route index path="/" element={<ChatPage />} />
      {/* <Route index element={<Home />} /> */}
    </Routes>
  )
}

export default App
