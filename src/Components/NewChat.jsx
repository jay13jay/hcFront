import { PropTypes } from 'prop-types';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Services/AuthContext';
import { ChatContext } from '../Services/ChatContext';
import { Form, Stack } from 'react-bootstrap';

import { Config } from '../Services/Config';

const NewChat = ({ setNewChatWindow }) => {
  const endpoint = Config.apiURL + Config.endpoints.chats.new
  const { token, userID, user } = useContext(AuthContext);
  const { fetchUserChats } = useContext(ChatContext);
  const [chatName, setChatName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateChat = async (e) => {
    e.preventDefault();

    if (!chatName.trim()) {
      setError('Chat name is required');
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          name: chatName,
          users: [{
            id: userID,
            user_name: user,
          }]
         }),
      });

      if (!response.ok) {
        throw new Error('Failed to create chat');
      }

      const data = await response.json();
      if (data.error) {
        setError(data.msg);
        return;
      }
      // setChats(data);
      // setChats(data.data)

      setNewChatWindow(false);
      // setIsOpen(false);
      fetchUserChats()
      navigate('/chat'); // Navigate to the chat page or desired route
    } catch (error) {
      setError(error.message);
    }
  };

  return (
  // <div className="glow-multi">
    <div className="new-chat glow-multi">
      <h2>Create New Chat</h2>
      {error && <p className="error">{error}</p>}
      <Form onSubmit={handleCreateChat}>
        <Form.Group>
          <Form.Control
            type="text"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            placeholder="Enter chat name"
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="mt-3">
          <button
            type="submit"
            className='h-submit'>Create</button>
          <button 
            onClick={() => setNewChatWindow(false)}
            className="h-cancel">Cancel</button>
        </Stack>
      </Form>
    </div>
  // </div>
  );
};

NewChat.propTypes = {
  apiURL: PropTypes.string.isRequired,
  setNewChatWindow: PropTypes.func.isRequired,
};

export default NewChat;
