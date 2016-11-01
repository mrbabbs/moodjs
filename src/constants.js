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
export const MOUTH_SHAPE = {
  [HAPPY_VALUE]: 'M30 70 C 35 85 65 85, 70, 70',
  [SAD_VALUE]: 'M30 80 C 35 65 65 65, 70, 80',
  [NEUTRAL_VALUE]: 'M30 70 H 70 V 75 H 30 L 30 70',
};
export const NOSE_SHAPE = 'M45 47 L 50 52 L 60 40 L 50 52 L 45 47';
export const DEFAULT_HASH_COLOR_FACES = {
  [HAPPY_VALUE]: '#27ae60',
  [SAD_VALUE]: '#e74c3c',
  [NEUTRAL_VALUE]: '#f1c40f',
};
export const DEFAULT_BASIC_FACE_BACKGROUND_PROPERTIES = {
  fill: '#ffffff',
  'data-type': 'backgroundFace',
};
export const DEFAULT_BASIC_FACE_PROPERTIES = {
  strokeWidth: 5,
  'data-type': 'face',
  fillOpacity: 0,
};
export const DEFAULT_BASIC_EYE_PROPERTIES = {
  'data-type': 'eye',
};
export const DEFAULT_BASIC_MOUTH_PROPERTIES = {
  'data-type': 'mouth',
};
export const DEFAULT_BASIC_NOSE_PROPERTIES = {
  display: 'block',
  'data-type': 'nose',
  strokeWidth: 5,
};
export const DEFAULT_FACE_SCALING = {
  transform: 's0.75',
};

// Percentage properties
export const DEFAULT_PERCENTAGE_OPTIONS_TEXT = { x: 0, y: 95, text: '0%', color: '#27ae60' };
export const DEFAULT_PERCENTAGE_PROPERTIES = {
  fill: '#27ae60',
  stroke: '#27ae60',
  fontFamily: 'arial',
  fontSize: '18px',
};


export const OPACITY_50 = 0.5;
export const ONE_SECOND = 1000;
