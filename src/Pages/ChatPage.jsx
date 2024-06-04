import { PropTypes } from 'prop-types';
import { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; 

import "../assets/buttons.css";

import { ChatContext } from '../Services/ChatContext';
import { AuthContext } from '../Services/AuthContext';
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";
import MessageForm from "../Components/MessageForm";
import ChatMessage from "../Components/ChatMessage";
import NewChat from '../Components/NewChat';

function ChatPage({ apiURL }) {
  const { chats, setChats, messages, setMessages } = useContext(ChatContext)
  const { user, token } = useContext(AuthContext);
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState(0);
  const [newChat, setNewChat] = useState({});
  const [newChatWindow, setNewChatWindow] = useState(false);

  const navigate = useNavigate();

  const openSidebar = () => {
    setIsSideOpen(true);
  };

  function handleNewMessage(message) {
    const newMessage = {
      timestamp: new Date().toISOString(),
      message: message,
      sender: user,
    };

    // Ensure we are using the previous state correctly
    setMessages((prevMessages = []) => [...prevMessages, newMessage]);
  }

  useEffect(() => {
    if (currentChat) {
      document.title = "HaxChat " + chats[currentChat - 1].name;
      setMessages(chats[currentChat - 1].messages || []);
    } else {
      document.title = "HaxChat";
      setMessages([]);
    }
  }, [chats, currentChat, setMessages]);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            {!isSideOpen ? <button className="h-primary" onClick={openSidebar}>Open Chats</button> : null}
          </Col>
          <Col className="chat">
            {currentChat ? <h1>{chats[currentChat - 1].name}</h1> : <h1>HaxChat</h1>}
          </Col>
          <Col>
          </Col>
        </Row>
        <Container className="main-content">
          <Sidebar
            isOpen={isSideOpen}
            setIsOpen={setIsSideOpen}
            chats={chats}
            handleChats={setChats}
            apiURL={apiURL}
            handleSetChat={setCurrentChat}
            setNewChatWindow={setNewChatWindow}
          />
          <div>
            {currentChat ? (
              <div>
                <p>Messages</p>
                {messages && messages.map((message, index) => (
                  <ChatMessage 
                    key={index} 
                    message={message} 
                    username={user} />
                ))}
              </div>
            ) : !newChatWindow ? (
              <p>Select chat from sidebar</p>
            ) : 
            newChatWindow && (
              <div className="new-chat-container">
                <NewChat 
                  apiURL={apiURL}
                  token={token}
                  newChat={newChat} 
                  setNewChat={setNewChat}
                  setNewChatWindow={setNewChatWindow} />
              </div>
            )}
          </div>
        </Container>
        <MessageForm handleNewMessage={handleNewMessage} />
      </Container>
      <Footer />
    </>
  );
}

ChatPage.propTypes = {
  apiURL: PropTypes.string.isRequired,
};

export default ChatPage;
