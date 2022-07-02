import React, { useContext } from "react";
import PropTypes from 'prop-types';
import './index.css';
import { Avatar } from "@mui/material";
import { ChatContext } from "../../../context";

const CreatorHeader = ({ avatarUrl, balance }) => {
  const { logout } = useContext(ChatContext);

  return (
    <div className='creator-header'>
      <Avatar
        alt='User Avatar'
        src={ avatarUrl }
      />
      <div className='title'>
        <p>Your balance</p>
        <h4 className='balance'>{ balance }</h4>
      </div>
      {/* add cash out progress */}
      <p className='logout' onClick={ () => logout() }>
        Logout
      </p>
    </div>
  )
}

CreatorHeader.propTypes = {
  avatarUrl: PropTypes.string,
  balance: PropTypes.string
}

export default CreatorHeader;