import { Container, Row, Col, Button } from "react-bootstrap"
import { useEffect, useState } from "react"

import Footer from "../Components/Footer"
import Sidebar from "../Components/Sidebar"
import MessageForm from "../Components/MessageForm"

function ChatPage() {
  const tempChats = [
    {"chat1": {
      "name": "Chat 1",
      "messages": []
    }},
    {"chat2": {
      "name": "Chat 2",
      "messages": []
    }},
    {"chat3": {
      "name": "Chat 3",
      "messages": []
    }},
    {"chat4": {
      "name": "Chat 4",
      "messages": []
    }},
    {"chat5": {
      "name": "Chat 5",
      "messages": []
    }},
  ]
  const [chats, setChats] = useState(tempChats);
  const [isSideOpen, setIsSideOpen] = useState(false);
  
  const openSidebar = () => {
      setIsSideOpen(true);
  }

  useEffect(() => {
    console.log(chats)
    document.title = "Hax Chat - Chat Page"
  },
  [chats]);
  return (
    <>
      <Container>
        <Row>
          <Col>
            {!isSideOpen ? <Button variant="outline-primary" onClick={openSidebar}>Open Chats</Button> :  null}
          </Col>
          <Col>
            <h1>Chat Page</h1>
          </Col>
          <Col>
          </Col>
        </Row>
        <Container className="main-content">
          <Sidebar
            isOpen={isSideOpen} 
            setIsOpen={setIsSideOpen}
            chats={chats}
            setChats={setChats}
          />
          <div>
            <p> chats go here</p>
          </div>
        </Container>
        <MessageForm />
      </Container>
      <Footer />
    </>
  )
}

export default ChatPage;