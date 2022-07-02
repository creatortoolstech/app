import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

import ChatList from "../../components/ChatList";
import CreatorLoginModal from '../../components/CreatorLoginModal';
import CreatorHeader from "./CreatorHeader";
import './index.css';
import { ChatContext } from "../../context";
import config from '../../conf';
import { Alert, Snackbar } from "@mui/material";

const CreatorHome = () => {
  const { user, client, login } = useContext(ChatContext);
  const [loginOpen, setLoginOpen] = useState(false);
  const [error, setError] = useState();

  const handleLogin = useCallback((data) => {
    axios({
      method: 'post',
      url: `${ config.API_ENDPOINT }/login`,
      data
    })
      .then(res => login(res.data.user))
      .catch(err => {
        setError(err.response.data.message);
      });
  })

  useEffect(() => {
    if(!user || !user.isCreator) {
      setLoginOpen(true);
    } else {
      setLoginOpen(false);
    }
  }, [user])

  return (
    <div className='home'>
      <Snackbar
        className='login-error'
        open={ error } 
        autoHideDuration={ 3000 } 
        onClose={ () => setError() }
      >
        <Alert 
          className='error-alert'
          onClose={ () => setError() } 
          severity="error" 
          variant="filled"
        >
          { error }
        </Alert>
      </Snackbar>
      { user && user.isCreator && <div>
        <CreatorHeader 
          balance={ user.accountBalance ? `$${ user.accountBalance }` : '$0' }
          avatarUrl={ user.avatarUrl }
        />
        <div className='creator-chat-list'>
          { client && <ChatList /> }
        </div>
      </div> }
      <CreatorLoginModal 
        isOpen={ loginOpen } 
        onSubmit={ handleLogin }
        onError={ setError }
      />
    </div>
  )
}

export default CreatorHome;