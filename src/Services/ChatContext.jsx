import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Config } from '../Services/Config';
import { AuthContext } from '../Services/AuthContext';
import { useNavigate } from 'react-router-dom';

export const ChatContext = createContext({
  chats: [],
  setChats: () => {},
  messages: [],
  setMessages: () => {},
  currentChat: 0,
  setCurrentChat: () => {},
  fetchUserChats: () => {}
});

export function ChatProvider({ children }) {
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem('chats');
    if (savedChats) {
      try {
        return JSON.parse(savedChats);
      } catch (error) {
        console.error("Error parsing chats from localStorage:", error);
        return [];
      }
    }
    return [];
  });

  const [currentChat, setCurrentChat] = useState(() => {
    const savedCurrentChat = localStorage.getItem('currentChat');
    if (savedCurrentChat) {
      try {
        return JSON.parse(savedCurrentChat);
      } catch (error) {
        console.error("Error parsing currentChat from localStorage:", error);
        return 0;
      }
    }
    return 0;
  });

  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      try {
        return JSON.parse(savedMessages);
      } catch (error) {
        console.error("Error parsing messages from localStorage:", error);
        return [];
      }
    }
    return [];
  });

  const { token, userID } = useContext(AuthContext);
  const navigate = useNavigate();
  const endpoint = Config.apiURL + Config.endpoints.chats.get;

  // fetch user chats from the API
  const fetchUserChats = useCallback(async () => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: userID })
      });
      const data = await response.json();
      console.log("Return status:", data.status);
      if (data.error) {
        console.error('API returned error: ', data.msg);
        navigate('/');
      } else {
        setChats(data.data);
      }
    } catch (error) {
      console.error('Error fetching user chats:', error);
    }
  }, [endpoint, token, userID, navigate, setChats]);


  useEffect(() => {
    try {
      localStorage.setItem('chats', JSON.stringify(chats));
    } catch (error) {
      console.error("Error saving chats to localStorage:", error);
    }
  }, [chats]);

  useEffect(() => {
    try {
      localStorage.setItem('currentChat', JSON.stringify(currentChat));
    } catch (error) {
      console.error("Error saving currentChat to localStorage:", error);
    }
  }, [currentChat]);

  useEffect(() => {
    try {
      localStorage.setItem('messages', JSON.stringify(messages));
    } catch (error) {
      console.error("Error saving messages to localStorage:", error);
    }
  }, [messages]);

  return (
    <ChatContext.Provider value={{ chats, messages, currentChat, setChats, setMessages, setCurrentChat, fetchUserChats }}>
      {children}
    </ChatContext.Provider>
  );
}

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
