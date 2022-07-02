import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from '../../conf';

import './index.css';
import CreatorSignupForm from "./CreatorSignupForm";
import { ChatContext } from "../../context";

const CreatorSignup = () => {
  const navigate = useNavigate();
  const chat = useContext(ChatContext);
  const [error, setError] = useState();

  const handleSubmit = async (values) => {
    if(!values.question100) {
      const response = await axios({
        method: 'post',
        url: `${ config.API_ENDPOINT }/signup`,
        data: {
          isCreator: true,
          ...values
        }
      })
      .catch(err => {
        setError(err.response.data.message);
      });
      if(!response) return;
      
      chat.login(response.data.user);
      navigate(`/creator`);
    } else {
      setError('Invalid signup')
    }
  }

  return (
    <CreatorSignupForm 
      error={ error }
      onSubmit={ handleSubmit }
    />
  )
}

export default CreatorSignup;