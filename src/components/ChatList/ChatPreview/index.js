import React, { useCallback, useContext, useState } from "react";
import PropTypes from 'prop-types';
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

import './index.css';
import QuickReply from "../../../components/QuickReply";
import useChat from "../../../hooks/useChat";
import { ChatContext } from "../../../context";

const ChatPreview = ({ chatId, recipient = {}, needsReply, onSend }) => {
  const { user } = useContext(ChatContext);
  const [messages, sendMessage] = useChat(chatId, 1);
  const [text, setText] = useState();

  const handleChange = useCallback((event) => {
    setText(event.target.value);
  });

  const handleSend = useCallback(() => {
    sendMessage(text);
    setText();
    onSend();
  })

  return (
    <div className='chat-preview'>
      <div className='chat-preview-header'>
        <Avatar
          alt='User Avatar'
          src={ recipient.avatarUrl }
        />
        <div className='chat-preview-title'>
          <p className='chat-preview-name'>{ recipient.firstName } { recipient.lastName }</p>
          <p className='chat-preview-subtitle'>2m ago</p>
        </div>
        { needsReply && <span className='chat-preview-payout'>
          Earn ${user.dmPrice}
        </span> }
      </div>
      <div className='chat-preview-message'>
        { messages && messages.length > 0 && <p className='chat-preview-text'>{ messages[messages.length - 1].body }</p> }
        <Link to={`/creator/chat/${chatId}`}>  
          <img 
            className='chat-preview-open-chat' 
            src='https://res.cloudinary.com/creator-tools/image/upload/v1649719884/static/Vector_9_vfszdr_zhwsad.svg' 
          />
        </Link>
      </div>
      <QuickReply onSend={ handleSend } onChange={ handleChange } />
    </div>
  )
}

ChatPreview.propTypes = {
  chatId: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  recipient: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  onSend: PropTypes.func,
  needsReply: PropTypes.bool
}

export default ChatPreview;