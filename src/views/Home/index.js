import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

import Chat from '../../components/Chat';
import './index.css';
import ConsentModal from "../../components/ConsentModal";
import useLocalStorage from "../../hooks/useLocalStorage";
import { ChatContext } from "../../context";
import { createChat } from "../../lib/twilio";
import { getCreatorByInsta } from "../../lib/api";
import SignupModal from "../../components/SignupModal";
import config from '../../conf';
import LoginModal from "../../components/LoginModal";
import { Alert, Snackbar } from "@mui/material";

const Home = () => {
  const { user, login, logout } = useContext(ChatContext);
  const [chatId, setChatId] = useState();
  const [creator, setCreator] = useState();
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [error, setError] = useState();
  const { creatorInsta } = useParams();
  const [agreeToTerms, setAgreeToTerms] = useLocalStorage('agreeToTerms', false);

  const handleSignup = useCallback(async (values) => {
    if(!values.question100) {
      const response = await axios({
        method: 'post',
        url: `${ config.API_ENDPOINT }/signup`,
        data: values
      })
      .catch(err => {
        setError(err.response.data.message);
      });
      if(!response) return;
      
      login(response.data.user);
      setSignupOpen(false);
    }
  })
  
  useEffect(() => {
    getCreatorByInsta(creatorInsta)
      .then(creator => {
        if(!creator) {
          setError('Creator has not signed up yet')
        }
        setCreator(creator)
      });
  }, [])

  useEffect(() => {
    if(creator && user) {
      if(creator.id !== user.id) {
        createChat(creator.id, user.id, user.id).then(setChatId);
      } else {
        logout()
      }
    }
  }, [creator, user])


  const handleAgree = () => {
    setAgreeToTerms(true);
  }

  const handleOpenLogin = () => {
    setLoginOpen(true);
    setSignupOpen(false);
  }

  const handleOpenSignup = () => {
    setSignupOpen(true);
    setLoginOpen(false);
  }

  const handleLogin = useCallback(async (data) => {
    const response = await axios({
      method: 'post',
      url: `${ config.API_ENDPOINT }/login`,
      data
    }).catch(err => {
      setError(err.response.data.message)
    })
    if(!response) return;

    login(response.data.user);
    setLoginOpen(false);
  })

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
      { creator && <Chat 
        recipient={ creator }
        user={ user }
        isCreatorView={false}
        chatId={ chatId }
        onAnonymousSend={ () => setSignupOpen(true) }
        onError={ setError }
      /> }
      <ConsentModal
        isOpen={!agreeToTerms} 
        onSubmit={handleAgree} 
      />
      <LoginModal 
        isOpen={loginOpen} 
        onCreateAccountClick={ handleOpenSignup } 
        onSubmit={ handleLogin }
        onError={ setError }
      />
      <SignupModal 
        isOpen={signupOpen} 
        onSubmit={ handleSignup } 
        onLoginClick={ handleOpenLogin } 
        onError={ setError }
      />
    </div>
  )
}

export default Home;