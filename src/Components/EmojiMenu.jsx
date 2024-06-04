import { Container } from "react-bootstrap"
import PropTypes from 'prop-types'
const emojiList = [

    "🤔","😀","😃","😄","😁","😆","😅",
    "🤣","😂","🙂","🙃","😉","😊","😇"
]


function EmojiMenu({ message, handleUpdateMessage }) {
    const onUpdateMessage = (e) => {
        e.preventDefault();
        const emoji = e.target.textContent;
        const newMessage = message + emoji;
        handleUpdateMessage(newMessage);
    }

    return (
        <Container>
            <div className="emoji-menu-container glow">
                {emojiList.map((emoji) => 
                    <span key={emoji} onClick={onUpdateMessage}>
                        <p>{emoji}</p>
                    
                    </span>)}
            </div>
        </Container>
    )
}

EmojiMenu.propTypes = {
    message: PropTypes.string,
    handleUpdateMessage: PropTypes.func,
    setMessage: PropTypes.func
}

export default EmojiMenu;