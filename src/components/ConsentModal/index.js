import React from 'react';
import BottomDrawer from '../../components/BottomDrawer';
import PropTypes from 'prop-types';
import './index.css';
import CustomButton from '../../components/CustomButton';

const ConsentModal = ({
  isOpen,
  onSubmit
}) => {
  return (
    <BottomDrawer isOpen={isOpen}>  
      <div className='consent-modal'>
        <h3>We take mental health and safety seriously</h3>
        <p>
          By tapping “Continue”, you agree to our terms and conditions. 
          Any blocks in this chat mean you are blocked from all messaging.
        </p>
        <CustomButton onSubmit={onSubmit}>
          Continue
        </CustomButton>
      </div>
    </BottomDrawer>
  )
}

ConsentModal.propTypes = {
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func
}

export default ConsentModal;
