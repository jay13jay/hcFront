import { PropTypes } from 'prop-types';
import { Stack } from "react-bootstrap";
function ChatMessage({ message }) {
  function getTime() {
    const date = new Date(message.timestamp);
    return date.toLocaleTimeString();
  }

  return (
    <Stack 
      direction="horizontal"
      className="messages"
      gap={3} >
      <p className="timestamp">
        {getTime}
      </p>
      <p className="user">
        {message.sender}
      </p>
      <p className="content">{message.message}</p>
    </Stack>
  )
}

ChatMessage.propTypes = {
  message: PropTypes.object,
  key: PropTypes.number
}

export default ChatMessage;