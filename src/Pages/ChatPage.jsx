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
  const { 
    chats,  
    currentChat,
    messages, 
    setChats,
    setMessages } = useContext(ChatContext);
  const { user, token } = useContext(AuthContext);
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [newChat, setNewChat] = useState({});
  const [newChatWindow, setNewChatWindow] = useState(false);

  const navigate = useNavigate();

  const openSidebar = () => {
    console.log("Messages: ", messages);
    setIsSideOpen(true);
  };

  useEffect(() => {
    if (chats.length > 0 && currentChat >= 0 && currentChat < chats.length) {
      document.title = "HaxChat " + chats[currentChat].name;
      setMessages(chats[currentChat].messages || []);
    } else {
      document.title = "HaxChat";
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
            {currentChat >= 0 && currentChat < chats.length ? (
              <h1>{chats[currentChat].name}</h1>
            ) : (
              <h1>HaxChat</h1>
            )}
          </Col>
          <Col>
          </Col>
        </Row>
        <Container className="main-content">
          <Sidebar
            isSideOpen={isSideOpen}
            setIsSideOpen={setIsSideOpen}
            chats={chats}
            handleChats={setChats}
            apiURL={apiURL}
            setNewChatWindow={setNewChatWindow}
          />
          <div>
            {currentChat >= 0 && currentChat < chats.length ? (
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
            ) : null}
            {newChatWindow && (
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
        <MessageForm />
      </Container>
      <Footer />
    </>
  );
}

ChatPage.propTypes = {
  apiURL: PropTypes.string.isRequired,
};

export default ChatPage;
