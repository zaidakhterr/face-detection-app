import React from 'react';

import Logo from '../../assets/github_logo.png';

import './Credits.scss';

function Credits() {
  return (
    <footer className='credits'>
      <p className='author'>
        Made By <a href='https://github.com/zaidakhterr'>Zaid Akhter</a> with{' '}
        <span className='jiggle' role='img' aria-label='heart emoji'>
          💖
        </span>
      </p>

      <a className='source-code' href='#'>
        <img src={Logo} alt='github_logo' />
        <p>View Source Code</p>
      </a>
    </footer>
  );
}

export default Credits;
