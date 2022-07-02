import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import './index.css';
import BottomDrawer from '../../components/BottomDrawer';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
})

const CreatorLoginModal = ({
  isOpen,
  handleSubmit,
  onError,
  values
}) => {

  const handleFormSubmit = useCallback((event) => {
    event.preventDefault();
    if(values.password && values.email) {
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
        </form>
        <Link to='/creator/signup' className='create-account-link'>
          Create an account
        </Link>
      </div>
    </BottomDrawer>
  )
}

CreatorLoginModal.propTypes = {
  isOpen: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onError: PropTypes.func,
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string
  })
}

export default withFormik({
  mapPropsToValues: () => ({}),
  validationSchema,
  handleSubmit: (values, { setSubmitting, props: { onSubmit } }) => {
    onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'CreatorLoginModal'
})(CreatorLoginModal);
