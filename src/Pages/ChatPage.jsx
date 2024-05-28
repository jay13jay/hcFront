import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

import "../assets/buttons.css";

import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";
import MessageForm from "../Components/MessageForm";
import ChatMessage from "../Components/ChatMessage";

function ChatPage() {
  const tempChats = [
    {
      "name": "Chat 1",
      "messages": [
        {"timestamp": "Mon May 27 2024 16:38:04 GMT-0400", "message": "beep boop", "sender": "robotOverlord123"},
        {"timestamp": "Mon May 27 2024 13:12:12 GMT-0400", "message": "Hello World", "sender": "user1"},
        {"timestamp": "Mon May 27 2024 13:10:12 GMT-0400", "message": "lorem ipsum", "sender": "user1"},
      ]
    },
    {
      "name": "Chat 2",
      "messages": [
        {"timestamp": "Mon May 26 2024 13:12:12 GMT-0400", "message": "Test message 1", "sender": "FluffyPuppy23"},
        {"timestamp": "Mon May 25 2024 13:12:12 GMT-0400", "message": "Another test", "sender": "AttackGoose1927"},
      ]
    },
    {
      "name": "Chat 3",
      "messages": []
    },
    {
      "name": "Chat 4",
      "messages": [
        {"timestamp": "Mon May 27 2024 16:38:04 GMT-0400", "message": "beep boop", "sender": "robotOverlord123"},
        {"timestamp": "Mon May 27 2024 13:12:12 GMT-0400", "message": "Hello World", "sender": "user1"},
        {"timestamp": "Mon May 27 2024 13:10:12 GMT-0400", "message": "lorem ipsum", "sender": "user1"},
        {"timestamp": "Mon May 26 2024 13:12:12 GMT-0400", "message": "Test message 1", "sender": "FluffyPuppy23"},
        {"timestamp": "Mon May 25 2024 13:12:12 GMT-0400", "message": "Another test", "sender": "AttackGoose1927"},
      ]
    },
    {
      "name": "Chat 5",
      "messages": []
    }
  ];

  const [chats, setChats] = useState(tempChats);
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState(0);
  const [messages, setMessages] = useState([]);
  const [lastMessageId, setLastMessageId] = useState(0);

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
      sender: "user1",
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setLastMessageId(newMessages.length); // Update the unique identifier
  }

  useEffect(() => {
    console.log(chats);
    if (currentChat) {
      document.title = "HaxChat " + chats[currentChat - 1].name;
      setMessages(chats[currentChat - 1].messages);
      setLastMessageId(chats[currentChat - 1].messages.length); // Initialize the unique identifier
    } else {
      document.title = "HaxChat";
      setMessages([]);
      setLastMessageId(0); // Reset the unique identifier
    }
  }, [currentChat]);

  useEffect(() => {
    if (currentChat && lastMessageId !== chats[currentChat - 1].messages.length) {
      setChats(prevChats => {
        const updatedChats = [...prevChats];
        updatedChats[currentChat - 1] = {
          ...updatedChats[currentChat - 1],
          messages: messages
        };
        return updatedChats;
      });
    }
  }, [messages, currentChat, lastMessageId]);

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
            handleSetChat={setCurrentChat}
            createNewChat={createNewChat}
          />
          <div>
            {currentChat ? (
              <div>
                <p>Messages</p>
                {sortChats(messages).map((message, index) => (
                  <ChatMessage key={index} message={message} />
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

export default ChatPage;