import { useEffect, useContext } from 'react';
import { Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import { ChatContext } from "../Services/ChatContext";

function Sidebar({ isSideOpen, setIsSideOpen, setNewChatWindow }) {
  const { chats, setCurrentChat, fetchUserChats } = useContext(ChatContext);

  const onSetChat = (index) => {
    setCurrentChat(index);
    handleClose();
  };

  const handleClose = () => {
    setIsSideOpen(false);
  };

  const handleNewChatWindow = () => {
    setNewChatWindow(true);
  };

  useEffect(() => {
    fetchUserChats(); 
  },[chats]); // Ensure useEffect runs when fetchUserChats changes

  return (
    <div className="sidenav glow-small"
      style={{
        width: isSideOpen ? "17vw" : "0",
        minWidth: isSideOpen ? "100px" : "0"
      }}>
      {isSideOpen && (
        <Button
          className="sidenav-close"
          variant="danger"
          onClick={handleClose}
        >X</Button>
      )}
      {chats.length > 0 ?
        chats.map((chat, index) => (
          <button
            key={index}
            onClick={() => onSetChat(index)}
            className="h-primary sidenav-button" >
            {chat.name}
          </button>
        )) :
        <p>No chats found</p>
      }
      <button
        onClick={handleNewChatWindow}
        className="newchat-button h-primary-outline glow-small" >
        New Chat
      </button>
    </div>
  );
}

Sidebar.propTypes = {
  isSideOpen: PropTypes.bool.isRequired,
  setIsSideOpen: PropTypes.func.isRequired,
  setNewChatWindow: PropTypes.func.isRequired,
};

export default Sidebar;
