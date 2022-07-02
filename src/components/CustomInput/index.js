import React from 'react';
import PropTypes from 'prop-types';
import { FormHelperText, Input, InputLabel } from '@mui/material';
import { useField } from 'formik';
import './index.css';

const CustomInput = ({ 
  label,
  fullWidth = true,
  className,
  helperText,
  ...props 
}) => {
  const [field, meta] = useField(props);

  return (
    <div className={ className }>
      <InputLabel 
        className='custom-input-label' 
        htmlFor={ `${ props.name }-input`}
      >
        { label }
      </InputLabel>
      <div className={ (meta.touched && meta.error) ? 'error-container' : '' } >
        <Input
          id={ `${ props.name }-input`}
          { ...field }
          { ...props }
          disableUnderline
          fullWidth={ fullWidth }
          className='custom-input'
          error={ !!(meta.touched && meta.error) }
        />
      </div>
      { helperText && <FormHelperText
          id={ `${ props.name }-helper-text`}
          className='helper-text'
        >
          { helperText }
        </FormHelperText> }
    </div>
  )
}

CustomInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string
}

export default CustomInput;