import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import './index.css';
import BottomDrawer from '../../components/BottomDrawer';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';

const validationSchema = Yup.object().shape({
  email: Yup.string(),
  phoneNumber: Yup.string(),
  password: Yup.string().required('Password is required'),
})

const LoginModal = ({
  values,
  isOpen,
  handleSubmit,
  onCreateAccountClick,
  onError
}) => {
  
  const handleFormSubmit = useCallback((event) => {
    event.preventDefault();
    if(values.password && (values.email || values.phoneNumber)) {
      handleSubmit(values);
    } else {
      onError('Missing required input');
    }
  })

  return (
    <BottomDrawer isOpen={isOpen}>
      <div className='login'>
        <h3>Login</h3>
        <form onSubmit={ handleFormSubmit } className='login-form'>  
          <CustomInput 
            name='email' 
            label='EMAIL' 
            className='login-input'
          />
          <CustomInput 
            name='phoneNumber' 
            label='OR PHONE NUMBER' 
            className='login-input'
          />
          <CustomInput 
            name='password' 
            label='PASSWORD'
            type='password'
            className='login-input'
          />
          <CustomButton
            type='submit'
          >
            Login
          </CustomButton>
          <p className='create-link' onClick={ onCreateAccountClick }>
            Create an account
          </p>
        </form>
      </div>
    </BottomDrawer>
  )
}

LoginModal.propTypes = {
  isOpen: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onCreateAccountClick: PropTypes.func,
  values: PropTypes.shape({
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    password: PropTypes.string
  }),
  onError: PropTypes.func
}

export default withFormik({
  mapPropsToValues: () => ({}),
  validationSchema,
  handleSubmit: (values, { setSubmitting, props: { onSubmit } }) => {
    onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'LoginModal'
})(LoginModal);
