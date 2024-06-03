import { useEffect, useContext } from 'react';
import { Button } from "react-bootstrap";
import PropTypes from 'prop-types'

import { AuthContext } from "../Services/AuthContext";

function Sidebar({ apiURL, isOpen, setIsOpen, chats, handleChats, handleSetChat, createNewChat }) {
  const { token, userID } = useContext(AuthContext);
  const chatURL = apiURL + "/chats/"


  const onSetChat = (index) => {
    console.log(index)
    handleSetChat(index+1);
    handleClose()
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleNewChat = () => {
    const name ="Chat " + (chats.length + 1);
    createNewChat(name);
  }

  // Use useEffect to fetch the data when the component mounts
  useEffect(() => {
    async function fetchUserChats() {
      try {
        const response = await fetch(chatURL, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: {
              "id": userID
            }
          }
        );
        const data = await response.json();
        handleChats(data);
      } catch (error) {
      console.error('Error fetching user chats:', error);
    }
    }
    fetchUserChats();
  }, [userID, handleChats, chatURL, token]);


  return (
    <div className="sidenav"
      style={{
        width: isOpen ? "17vw" : "0",
        minWidth: isOpen ? "100px" : "0"}}>
      {/* <Button className="sidenav-close"> */}
        {isOpen && <Button
          className="sidenav-close"
          variant="danger"
          onClick={handleClose}>X</Button> }
      {/* </Button> */}
      { chats.map((_, index) => (
        <button 
          key={index +1 }
          onClick={() => onSetChat(index)}
          // variant="outline-primary"
          className="h-primary sidenav-button" >
            {`Chat ${index+1}`}
        </button>
      ))}
      <Button
        onClick={handleNewChat}
        variant="outline-success" 
        className="newchat-button">
          New Chat
      </Button>
    </div>
  );
}

Sidebar.propTypes = {
  apiURL: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  chats: PropTypes.array.isRequired,
  handleChats: PropTypes.func.isRequired,
  handleSetChat: PropTypes.func.isRequired,
  createNewChat: PropTypes.func.isRequired,
}

export default Sidebar;