import { Container, Row, Col, Button } from "react-bootstrap"
import { useEffect, useState } from "react"

import "../assets/buttons.css"

import Footer from "../Components/Footer"
import Sidebar from "../Components/Sidebar"
import MessageForm from "../Components/MessageForm"
import ChatMessage from "../Components/ChatMessage"

function ChatPage() {
  const tempChats = [
    {
      "name": "Chat 1",
      "messages": [
        {"timestamp": "2024-05-26T05:28:59.322Z", "message": "Hello World", "sender": "user1"},
        {"timestamp": "2024-05-26T05:28:59.322Z", "message": "lorem ipsum", "sender": "user1"},
      ]
    },
    {
      "name": "Chat 2",
      "messages": [
        {"timestamp": "2024-05-26T05:28:59.322Z", "message": "Test message 1", "sender": "FluffyPuppy23"},
        {"timestamp": "2024-05-26T05:28:59.322Z", "message": "Another test", "sender": "AttackGoose1927"},
      ]
    },
    {
      "name": "Chat 3",
      "messages": []
    },
    {
      "name": "Chat 4",
      "messages": []
    },
    {
      "name": "Chat 5",
      "messages": []
    }
  ]
  const [chats, setChats] = useState(tempChats);
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState(0);
  
  const openSidebar = () => {
      setIsSideOpen(true);
  }

  function createNewChat(name) {
    const newChat = {
      name: name,
      messages: [],
    };
    setChats([...chats, newChat]);
  }

  useEffect(() => {
    console.log(chats)
    currentChat ? (
      document.title = "HaxChat " + chats[currentChat-1].name
    ) : (
      document.title = "HaxChat"
    )
  },
  [chats,currentChat]);
  return (
    <>
      <Container>
        <Row>
          <Col>
            {!isSideOpen ? <button className="h-primary" onClick={openSidebar}>Open Chats</button> :  null}
          </Col>
          <Col className="chat">
            {currentChat ? <h1>{chats[currentChat-1].name}</h1> : <h1>HaxChat</h1> }
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
            { currentChat ? (
              <div>
                <p>Messages</p>
                {chats[currentChat-1].messages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
              </div>
            ): (
              <p> Select chat from sidebar </p>
            )}
          </div>
        </Container>
        <MessageForm />
      </Container>
      <Footer />
    </>
  )
}

export default ChatPage;