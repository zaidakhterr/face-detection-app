import React from 'react';

import './FaceDetector.scss';

const FaceDetector = ({ imageUrl, error, faces }) => {
  return (
    <div className='face-detector'>
      <p></p>
      <div className='image-box'>
        <img
          id='image'
          src={imageUrl}
          alt='faces'
          style={{
            display: `${
              imageUrl && error !== 'INCORRECT_URL' ? 'block' : 'none'
            }`,
          }}
        />
        {faces.map((face, i) => (
          <div
            className='face-boundary'
            id={`face${i}`}
            key={i}
            style={{
              top: face.top,
              bottom: face.bottom,
              left: face.left,
              right: face.right,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FaceDetector;
