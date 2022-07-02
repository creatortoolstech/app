import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { Input, InputAdornment } from '@mui/material';

const QuickReply = ({
  value,
  onChange,
  onSend
}) => {

  return (
    <Input
      className='quick-reply-input'
      value={ value }
      disableUnderline
      placeholder='Quick reply...'
      multiline
      fullWidth
      onChange={ onChange }
      endAdornment={
        <InputAdornment position="end">
          <img 
            className='send' 
            onClick={ onSend }
            src='https://res.cloudinary.com/creator-tools/image/upload/v1649719884/static/Message_with_lock_ehslmw_i1uskp.svg' 
          />
        </InputAdornment>
      }
    />
  )
}

QuickReply.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSend: PropTypes.func
}

export default QuickReply;