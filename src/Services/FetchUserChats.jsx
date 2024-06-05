import { useCallback, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import { Config } from "./Config";
import { ChatContext } from "./ChatContext";

// Custom hook to fetch user chats from the API
const useFetchUserChats = () => {
  const { token, userID } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setChats } = useContext(ChatContext); // Access setChats from the context

  const fetchUserChats = useCallback(async () => {
    const endpoint = Config.apiURL + Config.endpoints.chats.get;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: userID })
      });
      const data = await response.json();
      console.log("Return status:", data.status);
      if (data.error) {
        console.error('API returned error: ', data.msg);
        navigate('/');
      } else {
        console.log('User chats fetched successfully:', data.data);
        localStorage.setItem('chats', JSON.stringify(data.data));
        setChats(data.data); // Update chats using setChats from the context
      }
    } catch (error) {
      console.error('Error fetching user chats:', error);
    }
  }, [token, userID, navigate, setChats]); // Ensure setChats is included in dependencies

  return { fetchUserChats };
};

export default useFetchUserChats;