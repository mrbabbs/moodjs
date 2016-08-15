// Type face
export const HAPPY_VALUE = 'happy';
export const SAD_VALUE = 'sad';
export const NEUTRAL_VALUE = 'neutral';

// Prefix
export const MOOD = 'mood';

// Face properties
export const FACE_SHAPE = [50, 50, 45];
export const LEFT_EYE_SHAPE = [30, 30, 7];
export const RIGHT_EYE_SHAPE = [70, 30, 7];
export const DEFAULT_HASH_COLOR_FACES = {
  [HAPPY_VALUE]: '#27ae60',
  [SAD_VALUE]: '#e74c3c',
  [NEUTRAL_VALUE]: '#f1c40f',
};
export const DEFAULT_BASIC_FACE_PROPETIES = {
  fill: '#ffffff',
  strokeWidth: 5,
  'data-type': 'face',
};
export const DEFAULT_BASIC_EYE_PROPETIES = {
  'data-type': 'eye',
};
