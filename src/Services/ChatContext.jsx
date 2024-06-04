import { PropTypes } from 'prop-types';
import { createContext, useState, useEffect } from 'react';

export const ChatContext = createContext({
  chats: [],
  setChats: () => [],
  messages: [],
  setMessages: () => [],
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

  useEffect(() => {
    try {
      localStorage.setItem('chats', JSON.stringify(chats));
    } catch (error) {
      console.error("Error saving chats to localStorage:", error);
    }
  }, [chats]);

  useEffect(() => {
    try {
      localStorage.setItem('messages', JSON.stringify(messages));
    } catch (error) {
      console.error("Error saving messages to localStorage:", error);
    }
  }, [messages]);

  return (
    <ChatContext.Provider value={{ chats, messages, setChats, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
}

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
