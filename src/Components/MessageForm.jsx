import { PropTypes } from 'prop-types';
import { Button, Stack, Form } from "react-bootstrap";
import { useState } from "react";
import EmojiMenu from "./EmojiMenu";

function MessageForm({ handleNewMessage }) {
    const [message, setMessage] = useState("");
    const [menuVisable, setMenuVisable] = useState(false);
    const handleMessageSubmit = (e) => {
        e.preventDefault();
        console.log("Message sent: " + message);
        handleNewMessage(message);
        setMessage("")
    }
    const handleUpdateMessage = (newMessage) => {
        // newMessage.preventDefault();
        setMessage(newMessage);
    };
    return (
        <>
            {menuVisable && <EmojiMenu message={message} handleUpdateMessage={handleUpdateMessage} />}
            <Form className="message-form" onSubmit={handleMessageSubmit}>
                <Stack
                    direction="horizontal">
                        <span 
                            onClick={() => setMenuVisable(!menuVisable)} 
                            className="emoji-menu"> ⌆ </span>
                        <Form.Control
                            as="input"
                            type="text"
                            id="sendMessage"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button 
                            className="send-message"
                            onClick={handleMessageSubmit}
                            variant="success">Submit</Button>
                        <Form.Text id="errorBlock" muted>
                            {/* Error text should go here */}
                        </Form.Text>
                </Stack>
            </Form>
        </>
    )
}

MessageForm.propTypes = {
    handleNewMessage: PropTypes.func
}

export default MessageForm;