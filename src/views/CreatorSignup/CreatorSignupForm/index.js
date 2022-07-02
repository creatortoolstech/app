import React, { useCallback, useState } from 'react';
import { Alert, Avatar, Checkbox, FormControlLabel, Snackbar } from '@mui/material';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import axios from 'axios';

import './index.css';

const INITIAL_VALUES = {
  useInsta: true,
  phoneNotifications: true,
  dmPrice: 10
}

const validationSchema = Yup.object().shape({
  instagram: Yup.string().required('Instagram handle is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  email: Yup.string().required('Email is required'),
  dmPrice: Yup.string().required('DM price is required'),
  question100: Yup.string()
})

const getStepHeader = (step) => {
  switch(step) {
    case 1:
    case 2:
      return 'Create account'
    case 3:
      return 'Connect bank account'
    case 4:
      return 'Set DM price'
  }
}

const getStepDescription = (step) => {
  switch(step) {
    case 1:
      return 'Get paid to chat with your biggest fans! Just set your price and start earning.'
    case 3:
      return 'Blurb about how we are safe and secure because we use Stripe!'
  }
}

const CreatorSignupForm = ({ values, setFieldValue, setSubmitting, handleSubmit, error: networkError }) => {
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState();
  const [error, setError] = useState();

  const isValidStep = useCallback((step) => {
    switch(step) {
      case 1:
        return !!values.instagram;
      case 2:
        return !!(values.firstName && values.lastName && values.phoneNumber && values.email);
      case 3:
        return true;
      case 4:
        return !!values.dmPrice;
    }
  })

  const handleAvatarUpload = useCallback((evt) => {
    const data = new FormData();
    data.append('file', evt.target.files[0]);
    data.append('upload_preset', 'avatar');
    data.append('cloud_name','creator-tools');
    axios('https://api.cloudinary.com/v1_1/creator-tools/image/upload',{
      method:'post',
      data
    })
      .then(res => {
        setFieldValue('avatarUrl', res.data.secure_url)
        setImagePreview(res.data.secure_url)
      })
  })
  
  const handleNextStep = () => {
    if(isValidStep(step)) {
      setStep(step + 1)
    } else {
      setError('Missing required field');
    }
  }

  const onFormSubmit = useCallback((event) => {
    console.log('submit')
    event.preventDefault();
    setSubmitting(true);
    if(isValidStep(step)) {
      handleSubmit(values)
    } else {
      setError('Missing required field');
      setSubmitting(false);
    }
  })

  return (
    <div className='creator-signup'>
      <div className='creator-signup-header'>
        <img src='https://res.cloudinary.com/creator-tools/image/upload/v1649719884/static/DM_Icon_V2_1_byopfq_efcaau.svg' />
        <h3>{ getStepHeader(step) }</h3>
        <p>{ getStepDescription(step) }</p>
      </div>
      <div className='creator-signup-form'>
        <div className='creator-signup-form-content'>
          { step === 1 && (
            <div className='step1'>
              <CustomInput 
                name='instagram' 
                label='IG HANDLE' 
                className='instagram'
              />
              <div className='upload'>
                <label htmlFor='avatarUpload'>
                  <Avatar
                    alt='User Avatar'
                    name='avatarUrl'
                    className='avatar'
                    src={ imagePreview }
                  />
                </label>
                <input type='file' id='avatarUpload' onChange={ handleAvatarUpload } /> 
              </div>
              {/* <FormControlLabel
                control={<Checkbox 
                  defaultChecked 
                  name='useInsta'
                />} 
                label='Use instagram profile photo' 
                classes={{
                  label: 'checkbox-label'
                }}
              /> */}
            </div>
          ) }
          { step === 2 && (
            <>
              <div className='name-group'>  
                <CustomInput 
                  name='firstName' 
                  label='FIRST NAME' 
                  className='name-group-item-left'
                  fullWidth={ false }
                />
                <CustomInput 
                  name='lastName' 
                  label='LAST NAME'
                  fullWidth={ false }
                />
              </div>
              <CustomInput 
                name='phoneNumber' 
                label='ENTER PHONE NUMBER'
              />
              <FormControlLabel
                className='creator-signup-input'
                control={<Checkbox 
                  defaultChecked 
                  name='phoneNotifications'
                />} 
                label='Get notified via SMS text when fans respond' 
                classes={{
                  label: 'checkbox-label'
                }}
              />
              <CustomInput 
                name='email' 
                label='EMAIL' 
              />
              <div className='question-100'>
                <CustomInput 
                  name='question100' 
                  label='Please leave this blank' 
                />
              </div>
            </>
          ) }
          { step === 3 && (
            <p className='center'>Stripe bank info flow</p>
          ) }
          { step === 4 && (
            <CustomInput 
              name='dmPrice' 
              helperText='This is the amount your fans pay to send you a direct message.'
              type='number'
              startAdornment='$'
            />
          ) }
        </div>
        <div className='creator-signup-submit'>
          <div className='creator-signup-progress'>
            { [1, 2, 3, 4].map(num => (
              <div
              key={ num }
              className={ `creator-signup-step ${ num <= step ? `creator-signup-step-complete-${ num }` : '' }` }
              >
              </div>
            )) }
          </div>
          <Snackbar 
            className='error'
            open={ error || networkError } 
            autoHideDuration={ 3000 } 
            onClose={ () => setError() }
          >
            <Alert 
              className='error-alert'
              onClose={ () => setError() } 
              severity="error" 
              variant="filled"
            >
              { error || networkError } 
            </Alert>
          </Snackbar>
          { step === 4 
            ? <CustomButton
                type='submit'
                onSubmit={ onFormSubmit }
              >
                Signup
              </CustomButton>
            : <CustomButton
                type='button'
                onSubmit={ handleNextStep }
              >
                Next
              </CustomButton>
          }
        </div>
      </div>
    </div>
  )
}

CreatorSignupForm.propTypes = {
  handleSubmit: PropTypes.func,
  values: PropTypes.any,
  setFieldValue: PropTypes.func,
  setFieldError: PropTypes.func,
  setSubmitting: PropTypes.func,
  error: PropTypes.string
}

export default withFormik({
  mapPropsToValues: () => INITIAL_VALUES,
  validationSchema,
  handleSubmit: (values, { setSubmitting, props: { onSubmit } }) => {
    onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'CreatorSignupForm'
})(CreatorSignupForm);