import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { Button } from '@mui/material';

const CustomButton = ({
  onSubmit,
  children,
  className,
  disabled = false,
  endIcon,
  ...props
}) => {

  return (
    <Button
      { ...props }
      variant='contained' 
      fullWidth 
      onClick={ onSubmit }
      endIcon={ endIcon }
      className={ className }
      disabled={ disabled }
    >
      { children }
    </Button>
  )
}

CustomButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func,
  endIcon: PropTypes.node
}

export default CustomButton;