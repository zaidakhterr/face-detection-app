import React from 'react';
import PropTypes from 'prop-types';

import './Input.scss';

const Input = ({ id, label, handleChange, ...props }) => (
  <div className='input'>
    <input className='input-field' {...props} onChange={handleChange} />
    <label
      className={`input-label ${props.value.length && 'shrink'}`}
      htmlFor={id}>
      {label}
    </label>
  </div>
);

Input.defaultProps = {
  autoComplete: 'on',
  placeholder: '',
  type: 'text',
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
};

export default Input;
