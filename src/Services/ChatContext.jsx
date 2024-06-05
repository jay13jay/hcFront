import { PropTypes } from 'prop-types';
import { createContext, useState, useEffect } from 'react';

export const ChatContext = createContext({
  chats: [],
  setChats: () => [],
  messages: [],
  setMessages: () => [],
  currentChat: 0,
  setCurrentChat: () => {}
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
  })

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
      localStorage.setItem('currentChat', JSON.stringify(currentChat));
    } catch (error) {
      console.error("Error saving chats to localStorage:", error);
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
    <ChatContext.Provider value={{ chats, messages, currentChat, setChats, setMessages, setCurrentChat }}>
      {children}
    </ChatContext.Provider>
  );
}

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
