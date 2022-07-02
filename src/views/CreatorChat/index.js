import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import Chat from '../../components/Chat';
import { ChatContext } from "../../context";
import './index.css';

const CreatorChat = () => {
  const { user } = useContext(ChatContext);
  const { chatId } = useParams();

  useEffect(() => {
    // get chat and then lookup user details
    // if no chat, redirect
  }, [])

  return (
    <div className='creator-chat'>
      { chatId && <Chat
        user={ user }
        isCreatorView={ true }
        chatId={ chatId }
      /> }
    </div>
  )
}

export default CreatorChat;