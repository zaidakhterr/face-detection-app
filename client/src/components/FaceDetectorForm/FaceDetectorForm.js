import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../Input/Input';
import CustomButton from '../CustomButton/CustomButton';
import Alert from '../Alert/Alert';

import { getImage } from '../../redux/faceDetector/faceDetectorActions';

export class FaceDetectorForm extends Component {
  state = {
    imageUrl: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.getImage(this.state.imageUrl);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render = () => {
    const { imageUrl } = this.state;
    const {
      msg,
      user: { name, entries },
    } = this.props;

    return (
      <form className='image-form form' onSubmit={this.handleSubmit}>
        <h2>Face Detector</h2>
        <p>
          <span>{name}</span> you have made {entries} entries.
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
        {msg ? <Alert>{msg}</Alert> : null}
      </form>
    );
  };
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

const mapDispatchToProps = {
  getImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(FaceDetectorForm);
