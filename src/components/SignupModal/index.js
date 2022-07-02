import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import './index.css';
import BottomDrawer from '../../components/BottomDrawer';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';
import { Avatar, Checkbox, FormControlLabel } from '@mui/material';

const INITIAL_VALUES = {
  phoneNotifications: true,
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string(),
  phoneNumber: Yup.string(),
  phoneNotifications: Yup.boolean(),
})

const SignupModal = ({
  isOpen,
  values,
  handleSubmit,
  setFieldValue,
  onLoginClick,
  onError
}) => {
  const [imagePreview, setImagePreview] = useState();

  const handleFormSubmit = useCallback((event) => {
    event.preventDefault();
    if((values.email || values.phoneNumber) && values.firstName && values.lastName) {
      handleSubmit(values);
    } else {
      onError('Missing required input');
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

  return (
    <BottomDrawer isOpen={isOpen}>
      <div className='signup-modal'>
        <h3>Create an account to chat!</h3>
        <form onSubmit={ handleFormSubmit } className='signup-modal-form'>
          <div className='upload'>
            <label htmlFor='avatarUpload'>
              <Avatar
                alt='User Avatar'
                name='avatarUrl'
                className='avatar modal-avatar'
                src={ imagePreview }
              />
            </label>
            <input type='file' id='avatarUpload' onChange={ handleAvatarUpload } /> 
          </div>
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
            className='signup-modal-input'
            control={<Checkbox 
              defaultChecked 
              name='phoneNotifications'
            />} 
            label='Get notified via SMS when a creator responds' 
            classes={{
              label: 'checkbox-label'
            }}
          />
          <CustomInput 
            name='email' 
            label='OR SIGN UP WITH EMAIL' 
            className='signup-modal-input'
          />
          <div className='question-100'>
            <CustomInput 
              name='question100' 
              label='Please leave this blank' 
            />
          </div>
          <CustomButton
            type='submit'
          >
            Signup
          </CustomButton>
          <p className='login-link'>
            Already have an account? <span onClick={ onLoginClick }>Login</span>
          </p>
        </form>
      </div>
    </BottomDrawer>
  )
}

SignupModal.propTypes = {
  isOpen: PropTypes.bool,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  onLoginClick: PropTypes.func,
  onError: PropTypes.func,
  values: PropTypes.shape({
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string
  })
}

export default withFormik({
  mapPropsToValues: () => (INITIAL_VALUES),
  validationSchema,
  handleSubmit: (values, { setSubmitting, props: { onSubmit } }) => {
    onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'SignupModal'
})(SignupModal);
