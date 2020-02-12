import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { register } from '../../redux/auth/authActions';
import { clearErrors } from '../../redux/error/errorActions';

import Input from '../Input/Input';
import CustomButton from '../CustomButton/CustomButton';
import Alert from '../Alert/Alert';

import './SignUpForm.scss';

export class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    msg: null,
  };

  componentDidUpdate = prevProps => {
    const { error, isAuthenticated, clearErrors } = this.props;

    if (error !== prevProps.error) {
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (isAuthenticated) {
      clearErrors();
      this.setState({ name: '', email: '', password: '' });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password,
    };
    this.props.register(user);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render = () => {
    const { name, email, password, msg } = this.state;

    return (
      <div className='form signup-form'>
        <h2>Register</h2>
        <p>Don't have an account? Sign Up now!</p>
        <form onSubmit={this.handleSubmit}>
          <Input
            id='sign-up-name'
            name='name'
            type='name'
            label='name'
            value={name}
            handleChange={this.handleChange}
          />
          <Input
            id='sign-up-email'
            name='email'
            type='email'
            label='email'
            value={email}
            handleChange={this.handleChange}
          />
          <Input
            id='sign-up-password'
            name='password'
            type='password'
            label='password'
            value={password}
            handleChange={this.handleChange}
          />
          <small>* Password must contain a number</small>
          {msg && <Alert>{msg}</Alert>}
          <CustomButton>Register</CustomButton>
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
  register,
  clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
