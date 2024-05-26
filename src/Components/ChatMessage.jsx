import { PropTypes } from 'prop-types';
import { Stack } from "react-bootstrap";
function ChatMessage({ message }) {
  return (
    <Stack 
      direction="horizontal"
      className="messages"
      gap={3} >
      <p className="timestamp">
        {message.timestamp}
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