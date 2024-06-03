import { PropTypes } from 'prop-types';
import { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../Services/AuthContext';

import "../assets/buttons.css";

import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";
import MessageForm from "../Components/MessageForm";
import ChatMessage from "../Components/ChatMessage";

function ChatPage({ apiURL }) {
  // const tempChats = [
  //   {
  //     "name": "Chat 1",
  //     "messages": [
  //       {"timestamp": "Mon May 27 2024 16:38:04 GMT-0400", "message": "beep boop", "sender": "robotOverlord123"},
  //       {"timestamp": "Mon May 27 2024 13:12:12 GMT-0400", "message": "Hello World", "sender": "user1"},
  //       {"timestamp": "Mon May 27 2024 13:10:12 GMT-0400", "message": "lorem ipsum", "sender": "user1"},
  //     ]
  //   },
  // ];

  // const [chats, setChats] = useState(tempChats);
  const [chats, setChats] = useState([]);
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState(0);
  const [messages, setMessages] = useState([]);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const openSidebar = () => {
    setIsSideOpen(true);
  };

  function createNewChat(name) {
    const newChat = {
      name: name,
      messages: [],
    };
    setChats([...chats, newChat]);
  }

  function sortChats(messages) {
    return [...messages].sort((a, b) => {
      return Date.parse(a.timestamp) - Date.parse(b.timestamp);
    });
  }

  function handleNewMessage(message) {
    const newMessage = {
      timestamp: new Date().toISOString(),
      message: message,
      sender: user,
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
  }

  useEffect(() => {
    if (currentChat) {
      document.title = "HaxChat " + chats[currentChat - 1].name;
      setMessages(chats[currentChat - 1].messages);
    } else {
      document.title = "HaxChat";
      setMessages([]);
    }
  }, [chats, currentChat]);

  useEffect(() => {
    if (currentChat) {
      console.log("Current token: ", token)
      setMessages(chats[currentChat - 1].messages);
    }
  }, [currentChat, chats, token]);

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
            createNewChat={createNewChat}
          />
          <div>
            {currentChat ? (
              <div>
                <p>Messages</p>
                {sortChats(messages).map((message, index) => (
                  <ChatMessage 
                    key={index} 
                    message={message} 
                    username={user} />
                ))}
              </div>
            ) : (
              <p>Select chat from sidebar</p>
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
