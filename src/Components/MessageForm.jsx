import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Stack, Form } from "react-bootstrap";
import { useState, useContext } from "react";
import { v4 as uuid } from 'uuid';

import { Config } from '../Services/Config';
import { AuthContext } from '../Services/AuthContext';
import { ChatContext } from '../Services/ChatContext';
import EmojiMenu from "./EmojiMenu";

function MessageForm() {
  const endpoint = Config.apiURL + Config.endpoints.messages.new;
  const { user, userID, token } = useContext(AuthContext);
  const { chats, currentChat, setMessages } = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    console.log("Endpoint: ", endpoint)
  }, [endpoint]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    console.log("Current chat: ", currentChat)
    console.log("Chats: ", chats)
    const newMessage = {
      message_id: uuid(),
      sender: user,
      timestamp: new Date().toISOString(), // Use ISO format for easy sorting
      content: message,
      user_id: userID,
      chat_id: chats[currentChat].id,
      delivered: false,
      read: false
    };
    console.log("ChatID: ", chats[currentChat].id)
    console.log("Message sent: ", newMessage);
    sendNewMessage(newMessage);
    setMessage("");
  };

  const handleUpdateMessage = (newMessage) => {
    setMessage(newMessage);
  };

  const sendNewMessage = async (newMessage) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMessage)
      });

      const data = await response.json();
      if (data.status === "Error") {
        console.log("Error sending message");
      } else {
        console.log("Message delivered");
        setMessages(messages => [...messages, newMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      {menuVisible && <EmojiMenu message={message} handleUpdateMessage={handleUpdateMessage} />}
      <Form className="message-form" onSubmit={handleMessageSubmit}>
        <Stack className="side-margin" gap={3} direction="horizontal">
          <span 
            onClick={() => setMenuVisible(!menuVisible)} 
            className="emoji-menu"> ⌆ </span>
          <Form.Control
            as="input"
            className='glow-small'
            type="text"
            id="sendMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="h-primary" type="submit">
            Submit
          </button>
          <Form.Text id="errorBlock" muted>
            {/* Error text should go here */}
          </Form.Text>
        </Stack>
      </Form>
    </>
  );
}

MessageForm.propTypes = {
    handleNewMessage: PropTypes.func,
};

export default MessageForm;
