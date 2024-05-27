import { PropTypes } from 'prop-types';
import { Stack } from "react-bootstrap"

function ChatMessage({ message }) {

  function compareTime(timeStamp) {
    const now = new Date()
    // const messageTime = new Date(message.timestamp);
    const diff =(now.getTime() - (timeStamp.getTime()));

    const messageDiff = {
      seconds: diff / 1000,
      minutes: diff / 60000,
      hours: diff / 3600000,
      days: diff / 86400000,
      weeks: diff / 604800000,
      years: diff / 31536000000
    }

    return messageDiff;
  }

  function getTimeString() {
    // create new date object to compare
    const timeStamp = new Date(message.timestamp);
    const messageDiff = compareTime(timeStamp);
    // console.log("Time diff: ", messageDiff);
    // console.log("TimeStamp: ", timeStamp);
    if (messageDiff.days >= 1) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const timeString = timeStamp.toLocaleDateString(undefined, options);
      return timeString
    } else {
      const options = { hour: 'numeric', minute: 'numeric' };
      const timeString = timeStamp.toLocaleTimeString(undefined, options);
      return timeString
    }

    // return timeStamp.toLocaleDateString();

  }

  return (
    <Stack 
      direction="horizontal"
      className="messages"
      gap={3} >
      
      <p className="timestamp">{getTimeString()}</p>
      <p className='timestamp'> | </p>
      <p className="user">{message.sender}</p>
      <p className='timestamp'> | </p>
      <p className="content">{message.message}</p>
    </Stack>
  )
}

ChatMessage.propTypes = {
  message: PropTypes.object,
}

export default ChatMessage;