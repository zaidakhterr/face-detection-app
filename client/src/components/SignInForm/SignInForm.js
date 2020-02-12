import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../../redux/auth/authActions';
import { clearErrors } from '../../redux/error/errorActions';

import Input from '../Input/Input';
import CustomButton from '../CustomButton/CustomButton';
import Alert from '../Alert/Alert';

import './SignInForm.scss';

export class SignInForm extends Component {
  state = {
    email: '',
    password: '',
    msg: null,
  };

  componentDidUpdate = prevProps => {
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (isAuthenticated) {
      clearErrors();
      this.setState({ email: '', password: '' });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    this.props.login(user);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render = () => {
    const { email, password, msg } = this.state;

    return (
      <div className='form signin-form'>
        <h2>Sign In</h2>
        <p>Already have an account? Sign In now!</p>
        <form onSubmit={this.handleSubmit}>
          <Input
            id='sign-in-email'
            name='email'
            type='email'
            label='email'
            value={email}
            handleChange={this.handleChange}
          />
          <Input
            id='sign-in-password'
            name='password'
            type='password'
            label='password'
            value={password}
            handleChange={this.handleChange}
          />
          {msg && <Alert>{msg}</Alert>}
          <CustomButton>Sign In</CustomButton>
        </form>
        {this.props.isAuthenticated && <Redirect exact to='/face_detect' />}
      </div>
    );
  };
}

const mapStateToProps = ({ auth, error }) => ({
  error,
  isAuthenticated: auth.isAuthenticated,
});

const mapDispatchToProps = {
  login,
  clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
