import React, { memo, useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Avatar, Input, InputAdornment, Skeleton } from "@mui/material";
import Header from "./Header";
import './index.css';
import useLocalStorage from "../../hooks/useLocalStorage";
import PaySelectDialog from "../../components/PaySelectDialog";
import CardInfoDialog from "../../components/CardInfoDialog";
import useChat from "../../hooks/useChat";
import { createOrder } from "../../lib/api";

const Chat = memo(({ recipient = {}, user, isCreatorView, chatId, onAnonymousSend, onError }) => {
  const [messages, sendMessage, { loading }] = useChat(chatId);
  const [paySelectOpen, setPaySelectOpen] = useState(false);
  const [cardInfoOpen, setCardInfoOpen] = useState(false);
  const [text, setText] = useState('');
  const [paymentStored, setPaymentStored] = useLocalStorage('paymentStored', 'false');
  const [isLoading, setIsLoading] = useState(false);

  const bottom = React.useRef();

  useEffect(() => {
    if(bottom.current) {
      bottom.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [loading]);

  const handleSMSClick = () => {
    console.log('click SMS')
  }

  const handleSend = async () => {
    if(isLoading || !text) return;
    if(!user) {
      onAnonymousSend();
      return;
    }
    if(!isCreatorView && messages && messages.length > 0 && paymentStored !== 'true') {
      setPaySelectOpen(true);
    } else {
      setIsLoading(true)
      await createOrder(recipient.id, user.id)
      setIsLoading(false)
      sendMessage(text)
      setText('')
    }
  }

  
  const handleTextChange = (event) => {
    setText(event.target.value);
  }
  
  const handleCardInfoSave = useCallback(() => {
    setPaymentStored(true);
    setCardInfoOpen(false);
    setPaySelectOpen(true);
  })
  
  const handlePaySubmit = useCallback(async () => {
    if(isLoading || !text) return;
    if(paymentStored === 'false') {
      onError('Payment type required')
      return;
    }
    setIsLoading(true)
    await createOrder(recipient.id, user.id)
    setIsLoading(false)
    setPaySelectOpen(false);
    sendMessage(text);
    setText('')
  })

  const handleAddCC = () => {
    setCardInfoOpen(true);
  }

  return (
    <div className="chat">
      <PaySelectDialog
        open={ paySelectOpen }
        onDismiss={ () => setPaySelectOpen(false) }
        onSubmit={ handlePaySubmit }
        onAddCC={ handleAddCC }
        previewText={ text }
        dmPrice={ recipient.dmPrice }
        paymentStored={ paymentStored }
      />
      <CardInfoDialog
        open={ cardInfoOpen }
        onDismiss={ () => setCardInfoOpen(false) }
        onSubmit={ handleCardInfoSave }
        onError={ onError }
      />
      <Header 
        firstName={ recipient.firstName } 
        lastName={ recipient.lastName } 
        avatarUrl={ recipient.avatarUrl }
        loading={ user && loading }
      />
      { user && loading ? (
        <div className='chat-body-loading'>
          <div className='right-message-group-loading'>
            <Skeleton variant="circular" width={50} height={50} className='avatar-loading' />
            <Skeleton variant="rectangular" height={118} className='right-message-loading' />
          </div>
          <div className='left-message-group-loading'>
            <Skeleton variant="rectangular" height={92} className='left-message-loading' />
            <Skeleton variant="circular" width={50} height={50} className='avatar-loading' />
          </div>
          <div className='right-message-group-loading'>
            <Skeleton variant="circular" width={50} height={50} className='avatar-loading' />
            <Skeleton variant="rectangular" height={144} className='right-message-loading' />
          </div>
          <div className='left-message-group-loading'>
            <Skeleton variant="rectangular" height={74} className='left-message-loading' />
            <Skeleton variant="circular" width={50} height={50} className='avatar-loading' />
          </div>
        </div>
      ) : (
        <div className='chat-body'>
          <div className='chat-messages'>
            { messages && messages.map(msg =>
              <div key={msg.sid}>
              { msg.author === user.id ? (
              <div className='message-group'>
                <div className='right-message'>
                  {msg.body}
                </div>
                <Avatar 
                  src={ user.avatarUrl } 
                  width={50} 
                  height={50} 
                  className='message-avatar' 
                />
              </div>
              ) : (
                <div 
                  key={msg.sid}
                  className='message-group'
                >
                  <Avatar 
                    src={ recipient.avatarUrl } 
                    width={50} 
                    height={50} 
                    className='message-avatar' 
                  />
                  <div className='left-message'>
                    {msg.body}
                  </div>
                </div>
              ) }
              <div ref={ bottom } />
            </div>
          ) }
          <p className='info'>Get notified when { recipient.firstName } responds</p>
          { !user || !user.phoneNotifications && (
            <p className='sms' onClick={ handleSMSClick }>Turn on SMS notifications</p>
          ) }
          </div>
          { messages && messages.length === 0 && (
            <div className='default'>
              <img className='logo' src='https://res.cloudinary.com/creator-tools/image/upload/v1649719884/static/DM_Icon_V2_1_byopfq_efcaau.svg' />
              <h5>Ask me anything!</h5>
              <p className='info'>Start the convo with { recipient.firstName } for free.</p>
              { !user || !user.phoneNotifications && (
                <p className='sms' onClick={ handleSMSClick }>Turn on SMS notifications</p>
              ) }
            </div>
          ) }
        </div>
      ) }
      <div className='reply'>
        { user && loading ? (
          <Skeleton variant="text" height={70} className='reply-input-loading' />
        ) 
        : (
        <Input
          className='reply-input'
          value={ text }
          disableUnderline
          placeholder='Write a message...'
          multiline
          fullWidth
          onChange={ handleTextChange }
          startAdornment={
            <InputAdornment position="start">
              <img 
                className='camera' 
                src='https://res.cloudinary.com/creator-tools/image/upload/v1649719886/static/Camera_cfrce5_fgignz.svg' 
              />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              { text && messages && messages.length > 0 && !isCreatorView
                ? <span 
                  className='pay-to-send'
                  onClick={ handleSend }
                >${recipient.dmPrice}</span>
                : <img 
                  className='send' 
                  onClick={ handleSend }
                  src={ paymentStored === 'true' || isCreatorView
                    ? 'https://res.cloudinary.com/creator-tools/image/upload/v1649719884/static/Message_with_lock_ehslmw_i1uskp.svg'
                    : 'https://res.cloudinary.com/creator-tools/image/upload/v1649719886/static/Message_with_lock_4_u8w0c2_pyirsg.svg'
                  }
              /> }
            </InputAdornment>
          }
        /> ) }
      </div>
      <p className='footer'>POWERED BY NEWCO</p>
    </div>
  )
})

Chat.propTypes = {
  recipient: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.string,
    dmPrice: PropTypes.number
  }),
  user: PropTypes.shape({
    id: PropTypes.string,
    avatarUrl: PropTypes.string,
    phoneNotifications: PropTypes.bool
  }),
  isCreatorView: PropTypes.bool,
  chatId: PropTypes.string,
  onAnonymousSend: PropTypes.func,
  onError: PropTypes.func
}

Chat.displayName = 'Chat';

export default Chat;