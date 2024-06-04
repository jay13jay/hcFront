import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './Services/AuthContext';
import { ChatProviderWrapper } from './Components/ChatProviderWrapper';

import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import './App.css';

function App() {
  // const apiURL = "http://10.0.0.212:3000/api";
  const apiURL = "http://jhaxdev.com:3000/api"

  useEffect(() => {
    document.title = "x/HaxChat";
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route index path="/register" element={<RegisterPage apiURL={apiURL} />} />
        <Route path="/" element={<LoginPage apiURL={apiURL} />} />
        <Route path="/chat" element={<ChatProviderWrapper apiURL={apiURL} />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
