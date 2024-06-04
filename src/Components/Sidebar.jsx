import { useEffect, useContext } from 'react';
import { Button } from "react-bootstrap";
import PropTypes from 'prop-types'

import { AuthContext } from "../Services/AuthContext";
import { ChatContext } from "../Services/ChatContext"

function Sidebar({ apiURL, isOpen, setIsOpen, handleSetChat, setNewChatWindow }) {
  const { token, userID } = useContext(AuthContext);
  const { chats, setChats } = useContext(ChatContext);
  const chatURL = apiURL + "/chats/"

  const onSetChat = (index) => {
    handleSetChat(index + 1);
    handleClose();
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleNewChatWindow = () => {
    setNewChatWindow(true);
  }

  useEffect(() => {
    async function fetchUserChats() {
      try {
        const response = await fetch(chatURL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: userID })
        });
        const data = await response.json();
        console.log();
        setChats(data.data);
      } catch (error) {
        console.error('Error fetching user chats:', error);
      }
    }
    fetchUserChats();
  }, [userID, setChats, chatURL, token]);

  return (
    <div className="sidenav glow-small"
      style={{
        width: isOpen ? "17vw" : "0",
        minWidth: isOpen ? "100px" : "0"
      }}>
      {isOpen && (
        <Button
          className="sidenav-close"
          variant="danger"
          onClick={handleClose}
        >X</Button>
      )}
      { chats.length > 0 ?
        chats.map((chat, index) => (
          <button
            key={index}
            onClick={() => onSetChat(index)}
            className="h-primary sidenav-button" >
            {/* {`Chat ${index + 1}`} */}
            {chat.name}
          </button>
        )) :
        <p>No chats found</p>
      }
      <button
        onClick={() => handleNewChatWindow(true)}
        className="newchat-button h-primary-outline glow-small" >
        New Chat
      </button>
    </div>
  );
}

Sidebar.propTypes = {
  apiURL: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  handleSetChat: PropTypes.func.isRequired,
  setNewChatWindow: PropTypes.func.isRequired,
};

export default Sidebar;
