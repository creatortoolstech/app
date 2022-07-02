import React, { useState } from "react";
import { Dialog, Divider, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import PropTypes from 'prop-types';
import './index.css';
import CustomButton from "../../components/CustomButton";

const PaySelectDialog = ({ 
  open, 
  onDismiss, 
  onSubmit, 
  onAddCC,
  paymentStored,
  previewText, 
  dmPrice 
}) => {
  const [paymentType, setPaymentType] = useState();

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value)
  }

  return (
    <Dialog
      open={ open }
      onClose={ onDismiss }
      PaperProps={{
        className: 'pay-dialog'
      }}
    >
      <p>{ previewText }</p>
      <CustomButton 
        className='pay-dialog-button' 
        onSubmit={ onSubmit }
      >
        Send for ${dmPrice}
      </CustomButton>
      <h5>Payment Type</h5>
      <RadioGroup
        value={ paymentType }
        onChange={ handlePaymentTypeChange }
      >
        <FormControlLabel
          className={ `pay-dialog-radio ${paymentStored ? '' : 'add-payment-input'}` }
          value="cc" 
          control={ paymentStored === 'true'
            ? <Radio /> 
            : <span 
                className='add-payment'
                onClick={onAddCC}
              >Add
            </span> } 
          label="Credit/Debit Card" 
          labelPlacement="start"
          checked={ paymentStored === 'true' }
        />
        <Divider />
        <FormControlLabel
          className="pay-dialog-radio"
          value="paypal" 
          control={<Radio />} 
          label="Paypal" 
          labelPlacement="start"
          // fixme: add paypal
          disabled={ true }
        />
      </RadioGroup>
    </Dialog>
  )
}

PaySelectDialog.propTypes = {
  open: PropTypes.bool, 
  onDismiss: PropTypes.func, 
  onSubmit: PropTypes.func,
  onAddCC: PropTypes.func,
  paymentStored: PropTypes.string,
  previewText: PropTypes.string,
  dmPrice: PropTypes.number
}

export default PaySelectDialog;