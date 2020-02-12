import React from 'react';
import { connect } from 'react-redux';

import FaceDetector from '../../components/FaceDetector/FaceDetector';
import FaceDetectorForm from '../../components/FaceDetectorForm/FaceDetectorForm';

import {
  selectImageUrl,
  selectFaces,
} from '../../redux/faceDetector/faceDetectorSelectors';

import './AppPage.scss';

class AppPage extends React.Component {
  render = () => {
    const { imageUrl, error, faces } = this.props;
    return (
      <div className='app-page'>
        <FaceDetectorForm msg={this.props.msg} />
        <FaceDetector imageUrl={imageUrl} error={error} faces={faces} />
      </div>
    );
  };
}

const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.error.id,
  imageUrl: selectImageUrl(state),
  faces: selectFaces(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);
