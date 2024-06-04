import { PropTypes } from 'prop-types';
import { ChatProvider } from "../Services/ChatContext";
import ChatPage from "../Pages/ChatPage";

export const ChatProviderWrapper = ({ apiURL }) => (
  <ChatProvider>
    <ChatPage apiURL={apiURL} />
  </ChatProvider>
);

ChatProviderWrapper.propTypes = {
  apiURL: PropTypes.string.isRequired,
};