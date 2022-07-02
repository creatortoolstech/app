import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import './index.css';
import ChatPreview from './ChatPreview';
import config from '../../conf';
import { ChatContext } from "../../context";
import { Skeleton } from "@mui/material";

const ChatList = () => {
  const { user } = useContext(ChatContext);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChats = async () => {
    setLoading(true);
    const conversationsData = await axios({
      method: 'GET',
      url: `${ config.API_ENDPOINT }/creator/conversations`,
      headers: {
        Authorization: user.id
      }
    })
    setChats(conversationsData.data.conversations);
    setLoading(false);
  }

  useEffect(async () => {
    fetchChats()
  }, [user]);

  const needsReply = chats
    .filter(chat => !chat.hasReplied);

  return (
    <div className='chat-list'>
      <h5>Waiting for reply ({ needsReply.length })</h5>
        { needsReply.map(chat => (
          <ChatPreview 
          key={ chat.chatId }
          chatId={ chat.chatId }
          user={ user }
          onSend={ fetchChats }
          needsReply={ true }
          recipient={ chat.recipient }
          />
          )) }
        { loading && (
          <>
            <Skeleton variant="rectangular" className='chat-preview-loading' height={91} />
            <Skeleton variant="rectangular" className='chat-preview-loading' height={91} />
            <Skeleton variant="rectangular" className='chat-preview-loading' height={91} />
          </>
        )}
      <h5>All DMs</h5>
      { chats
        .filter(chat => chat.hasReplied)
        .map(chat => (
        <ChatPreview 
          key={ chat.chatId }
          chatId={ chat.chatId }
          user={ user }
          onSend={ fetchChats }
          recipient={ chat.recipient }
        />
        )) }
        { loading && (
        <>
          <Skeleton variant="rectangular" className='chat-preview-loading' height={91} />
          <Skeleton variant="rectangular" className='chat-preview-loading' height={91} />
        </>
      ) }
    </div>
  )
}

export default ChatList;