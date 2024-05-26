import { Button } from "react-bootstrap";
import PropTypes from 'prop-types'

function Sidebar({ isOpen, setIsOpen, chats, handleSetChat, createNewChat }) {

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

  return (
    <div className="sidenav"
      style={{
        width: isOpen ? "25vw" : "0",
        minWidth: isOpen ? "17vw" : "0"}}>
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
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  chats: PropTypes.array,
  handleSetChat: PropTypes.func,
  createNewChat: PropTypes.func
}

export default Sidebar;