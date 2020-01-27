import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { logout } from '../../redux/auth/authActions';

import Logo from '../../assets/face_logo.png';

import './Navigation.scss';

class Navigation extends Component {
  toggleClass = () => {
    let mainNav = document.querySelector('ul.menu');

    mainNav.classList.toggle('active');
  };

  render = () => {
    const { isAuthenticated, logout } = this.props;
    return (
      <nav className='navigation'>
        <Link className='brand' to='/'>
          <img className='logo' src={Logo} alt='Logo' />
        </Link>

        {isAuthenticated ? (
          <ul className='menu'>
            <li className='menu-item'>
              <NavLink
                className='nav-link'
                activeClassName='active-link'
                to='/face_detect'
                onClick={this.toggleClass}>
                face detector
              </NavLink>
            </li>
            <li className='menu-item'>
              <NavLink
                className='nav-link'
                //activeClassName='active-link'
                to='#'
                onClick={() => {
                  this.toggleClass();
                  logout();
                }}>
                sign out
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className='menu'>
            <li className='menu-item'>
              <NavLink
                className='nav-link'
                activeClassName='active-link'
                to='/sign_in'
                onClick={this.toggleClass}>
                sign in
              </NavLink>
            </li>
          </ul>
        )}

        <button className='nav-icon' onClick={this.toggleClass}>
          <span></span>
        </button>
      </nav>
    );
  };
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
