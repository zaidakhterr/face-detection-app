import React from 'react';
import { connect } from 'react-redux';

import Input from '../../components/Input/Input';
import CustomButton from '../../components/CustomButton/CustomButton';
import FaceDetector from '../../components/FaceDetector/FaceDetector';

import './AppPage.scss';

class AppPage extends React.Component {
  state = {
    imageUrl: '',
    msg: null,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ imageUrl: '' });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render = () => {
    const { imageUrl } = this.state;
    const {
      user: { name, entries },
    } = this.props;

    return (
      <div className='app-page'>
        <form className='image-form form' onSubmit={this.handleSubmit}>
          <h2>Face Detector</h2>
          <p>
            {name} you have made {entries} entries
          </p>
          <div className='form-group'>
            <Input
              id='image-url'
              name='imageUrl'
              type='text'
              label='Image URL'
              value={imageUrl}
              handleChange={this.handleChange}
              autoComplete='off'
            />
            <CustomButton>Detect</CustomButton>
          </div>
        </form>
        <FaceDetector />
      </div>
    );
  };
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);
