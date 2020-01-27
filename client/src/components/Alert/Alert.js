import React from 'react';
import PropTypes from 'prop-types';

import './Alert.scss';

const Alert = ({ children, alertClass }) => (
  <div className={`alert ${alertClass}`}>{children}</div>
);

Alert.defaultProps = {
  alertClass: 'error',
};

Alert.propTypes = {
  alertClass: PropTypes.string,
  children: PropTypes.string.isRequired,
};

export default Alert;
