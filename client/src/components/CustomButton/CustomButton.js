import React from 'react';
import PropTypes from 'prop-types';

import './CustomButton.scss';

const CustomButton = ({ children, btnClass }) => (
  <button className={`btn ${btnClass}`}>{children}</button>
);

CustomButton.defaultProps = {
  btnClass: 'primary',
  children: 'Click Me',
};

CustomButton.propTypes = {
  children: PropTypes.string.isRequired,
  btnClass: PropTypes.string,
};

export default CustomButton;
