import React from 'react';
import { Avatar, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import './index.css';

const Header = ({ firstName, lastName, avatarUrl, loading }) => (
  <>
    { loading ? (
      <Skeleton variant="rectangular" height={50} />
    ) : (
      <div className='header'>
        <Avatar
          alt='User Avatar'
          src={ avatarUrl }
        />
        <div className='title'>
          <h4>{ firstName } { lastName }</h4>
          <p>Avg response time: 2 min</p>
        </div>
        <img className='video' src='https://res.cloudinary.com/creator-tools/image/upload/v1649719884/static/Video_Icon_a9lbsf_zglxea.svg' />
        <img className='hamburger' src='https://res.cloudinary.com/creator-tools/image/upload/v1649719884/static/Hamburger_dlunjz_cgzska.svg' />
      </div>
    ) }
  </>
)

Header.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  avatarUrl: PropTypes.string,
  loading: PropTypes.bool
}

export default Header;