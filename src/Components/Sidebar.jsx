import { Button } from "react-bootstrap";
import PropTypes from 'prop-types'

function Sidebar({ isOpen, setIsOpen, chats, setChats }) {

  const handleClose = () => {
    setIsOpen(false);
  }

  const createNewChat = () => {
    const numChats = chats.length;
    const newChat = {};
    newChat[`chat${numChats + 1}`] = {
      name: `Chat ${numChats + 1}`,
      messages: []
    };
    console.log(newChat);

    setChats([...chats, newChat]);
  }

  return (
    <>
      <div className="sidenav"
        style={{width: isOpen ? "25vh" : "0"}}>
        {/* <Button className="sidenav-close"> */}
          {isOpen && <Button
            className="sidenav-close"
            variant="outline-danger"
            onClick={handleClose}>X</Button> }
        {/* </Button> */}
        { chats.map((_, index) => (
          <Button 
            key={index +1 }
            variant="outline-primary"
            className="sidenav-button" >
              {`Chat ${index+1}`}
          </Button>
        ))}
        <Button
          onClick={createNewChat}
          variant="outline-success" 
          className="newchat-button">
            New Chat
        </Button>
      </div>

    </>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  chats: PropTypes.array,
  setChats: PropTypes.func
}

export default Sidebar;