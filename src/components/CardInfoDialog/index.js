import React, { useCallback } from "react";
import { Checkbox, Dialog, FormControlLabel } from "@mui/material";
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import './index.css';
import CustomButton from "../../components/CustomButton";
import CustomInput from "../CustomInput";
import { withFormik } from "formik";

const validationSchema = Yup.object().shape({
  cc: Yup.string().required('Credit card number is required'),
  name: Yup.string().required('Name is required'),
  expiry: Yup.string().required('Expiry date is required'),
  cvv: Yup.string().required('CVV is required')
})

const INITIAL_VALUES = {
  cc: '',
  name: '',
  expiry: '',
  cvv: '',
  save: true
}

const CardInfoDialog = ({ values, open, onDismiss, handleSubmit, onError }) => {
  const handleFormSubmit = useCallback((event) => {
    event.preventDefault();
    if(values.cc && values.name && values.expiry && values.cvv) {
      handleSubmit(values);
    } else {
      onError('Missing required field');
    }
  })

  return (
    <Dialog
      open={ open }
      onClose={ onDismiss }
      PaperProps={{
        className: 'card-info-dialog'
      }}
    >
      <form onSubmit={ handleFormSubmit }>
        <CustomInput 
          name='cc' 
          label='CREDIT CARD NUMBER' 
          className='card-info-input'
        />
        <CustomInput 
          name='name' 
          label='CARD HOLDER NAME' 
          className='card-info-input'
        />
        <div className='cc-group'>
          <CustomInput 
            name='expiry' 
            label='EXPIRY' 
            fullWidth={ false } 
            className='cc-group-item-left'
          />
          <CustomInput 
            name='cvv' 
            label='CVV' 
            fullWidth={ false }
          />
        </div>
        <FormControlLabel
          control={<Checkbox 
            defaultChecked 
            name='save'
          />} 
          label='Save this card for future transactions' 
          classes={{
            label: 'card-info-save'
          }}
        />
        <CustomButton 
          className='card-info-dialog-button'
          type='submit'
          disabled={ false }
        >
          Save Payment
        </CustomButton>
      </form>
    </Dialog>
  )
}

CardInfoDialog.propTypes = {
  open: PropTypes.bool, 
  onDismiss: PropTypes.func, 
  handleSubmit: PropTypes.func,
  onError: PropTypes.func,
  values: PropTypes.shape({
    cc: PropTypes.string,
    name: PropTypes.string,
    expiry: PropTypes.string,
    cvv: PropTypes.string
  })
}

export default withFormik({
  mapPropsToValues: () => INITIAL_VALUES,
  validationSchema,
  handleSubmit: (values, { setSubmitting, props: { onSubmit } }) => {
    onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'CardInfoForm'
})(CardInfoDialog);