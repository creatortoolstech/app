import React, { createContext, useEffect, useState } from "react";
import { Client } from '@twilio/conversations';
import PropTypes from 'prop-types';

import { getChatToken } from "../lib/twilio";

const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [client, setClient] = useState();
  const [user, setUser] = useState();

  const login = async (user) => {
    if(!user) return;
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    const token = await getChatToken(user.id)
    const client = new Client(token);
  
    client.on('stateChanged', (state) => {
      console.log('chat state', state);
      if (state === 'initialized') {
        setClient(client);
      }
    })
  }
  
  const logout = async () => {
    setUser(null);
    localStorage.clear();
    setClient(null);
  }

  useEffect(() => {
    // if user, init client
    const storedUser = localStorage.getItem('user');
    if(storedUser !== 'undefined' && typeof storedUser === 'string') {
      login(JSON.parse(storedUser));
    }
  }, []);
  
  return (
    <ChatContext.Provider
      value={{ client, user, login, logout }}
    >
      { children }
    </ChatContext.Provider>
  )
}

ChatContextProvider.propTypes = {
  children: PropTypes.node
}

export { ChatContext, ChatContextProvider }