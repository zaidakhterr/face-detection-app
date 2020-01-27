import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  ...otherProps
}) => (
  <Route
    {...otherProps}
    render={props =>
      isAuthenticated ? <Component {...props} /> : <Redirect to='sign_in' />
    }
  />
);

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
});

export default connect(mapStateToProps)(ProtectedRoute);
