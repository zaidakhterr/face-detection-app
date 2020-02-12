import { createSelector } from 'reselect';

const selectFaceDetector = ({ faceDetector }) => faceDetector;

export const selectImageUrl = createSelector(
  selectFaceDetector,
  faceDetector => faceDetector.imageUrl
);

export const selectFaces = createSelector(
  selectFaceDetector,
  faceDetector => faceDetector.faces
);
