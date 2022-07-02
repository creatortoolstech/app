import { Drawer } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const BottomDrawer = ({
  isOpen,
  children
}) => {

  return (
    <Drawer
      anchor='bottom'
      open={isOpen}
      variant="temporary"
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        square: false,
        className: 'drawer-paper'
      }}
    >
      { children }
    </Drawer>
  )
}

BottomDrawer.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node
}

export default BottomDrawer;