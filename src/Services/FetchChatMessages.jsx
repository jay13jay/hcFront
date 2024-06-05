import { useCallback, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import { Config } from "./Config";
import { ChatContext } from "./ChatContext";

// Custom hook to fetch user chats from the API
const useFetchChatMessages = () => {
  const { token, userID } = useContext(AuthContext);
  const { chatID, chats, setChats } = useContext(ChatContext);
  const navigate = useNavigate();

  const fetchChatMessages = useCallback(async () => {
    const endpoint = Config.apiURL + Config.endpoints.messages.get;
    const reqData = {
      id: userID,
      chat_id: chatID,
    }
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqData)
      });
      const data = await response.json();
      console.log("Return status:", data.status);
      if (data.error) {
        console.error('API returned error: ', data.msg);
        navigate('/');
      } else {
        setChats(data.data);
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  }, [token, userID, chatID, navigate]);

  return { fetchChatMessages, chats };
};

export default useFetchChatMessages;
