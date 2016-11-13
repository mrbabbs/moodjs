import Snap from 'snapsvg';
import { privateEnv } from './helpers/private-env';
import Percentage from './Percentage';
import {
  DEFAULT_BASIC_EYE_PROPERTIES,
  DEFAULT_BASIC_FACE_BACKGROUND_PROPERTIES,
  DEFAULT_BASIC_FACE_PROPERTIES,
  DEFAULT_BASIC_MOUTH_PROPERTIES,
  DEFAULT_BASIC_NOSE_PROPERTIES,
  DEFAULT_GROUP_SCALING,
  DEFAULT_HASH_COLOR_FACES,
  FACE_SHAPE,
  HAPPY_VALUE,
  LEFT_EYE_SHAPE,
  MOOD,
  MOUTH_SHAPE,
  NEUTRAL_VALUE,
  NOSE_SHAPE,
  ONE_SECOND,
  OPACITY_50,
  RIGHT_EYE_SHAPE,
  SAD_VALUE,
} from './constants';


const _private = privateEnv();

function _createId(mood) {
  const seed = `${new Date()}-${Math.random()}`;

  return `${MOOD}-${mood}-${btoa(seed)}`;
}

function _createSVGNode(mood, id) {
  const svgNode =
    document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  svgNode.setAttribute('id', id);
  svgNode.setAttribute('width', '100%');
  svgNode.setAttribute('height', '100%');
  svgNode.setAttribute('viewBox', '0 0 100 100');

  return svgNode;
}

function _createPaper(svgNode) {
  return Snap(svgNode);
}

function _createNose(paper, { shape, color }) {
  const nose = paper.path(shape);
  const attrNose = Object.assign(
    {},
    DEFAULT_BASIC_NOSE_PROPERTIES,
    { stroke: color }
  );

  nose.attr(attrNose);

  return nose;
}

function _createMouth(paper, { shape, color }) {
  const mouth = paper.path(shape);
  const attrMouth = Object.assign(
    {},
    DEFAULT_BASIC_MOUTH_PROPERTIES,
    { fill: color }
  );

  mouth.attr(attrMouth);

  return mouth;
}

function _createEye(paper, { shape, color }) {
  const eye = paper.circle(...shape);
  const attrEye = Object.assign(
    {},
    DEFAULT_BASIC_EYE_PROPERTIES,
    { fill: color }
  );

  eye.attr(attrEye);

  return eye;
}

function _drawFace(paper, mood) {
  const background = paper.circle(...FACE_SHAPE);
  background.attr({
    ...DEFAULT_BASIC_FACE_BACKGROUND_PROPERTIES,
  });

  const face = paper.circle(...FACE_SHAPE);
  face.attr({
    ...DEFAULT_BASIC_FACE_PROPERTIES,
    stroke: DEFAULT_HASH_COLOR_FACES[mood],
  });

  const ltEye = _createEye(paper, {
    shape: LEFT_EYE_SHAPE,
    color: DEFAULT_HASH_COLOR_FACES[mood],
  });
  const rtEye = _createEye(paper, {
    shape: RIGHT_EYE_SHAPE,
    color: DEFAULT_HASH_COLOR_FACES[mood],
  });
  const mouth = _createMouth(paper, {
    shape: MOUTH_SHAPE[mood],
    color: DEFAULT_HASH_COLOR_FACES[mood],
  });
  const nose = _createNose(paper, {
    shape: NOSE_SHAPE,
    color: DEFAULT_HASH_COLOR_FACES[mood],
  });

  const group = paper.g(background, face, mouth, ltEye, rtEye, nose);
  const matrix = Snap.matrix(
    DEFAULT_GROUP_SCALING,
    0,
    0,
    DEFAULT_GROUP_SCALING,
    FACE_SHAPE[0] * (1 - DEFAULT_GROUP_SCALING),
    0
  )
  // group.attr(DEFAULT_FACE_SCALING);
  group.transform(matrix);

  return { face, nose, mouth, ltEye, rtEye };
}

function _calculatePercentage(radius, percentage) {
  const angle = 360 * percentage / 100 / 2;
  let height = Math.sin(Math.PI * (angle/180)) * radius;
  percentage > 50 ? height = radius * 2 - height : height;

  return ((height * 100) / (radius * 2));
}

function _fillFace(paper, face, color, percentage, duration = ONE_SECOND) {
  const gradient =
    paper.gradient(`l(0, 1, 0, 0) ${color} :0-rgba(100%, 100%, 100%, 0):0.1`);
  const radius = 100;
  const calculatedPercentage = _calculatePercentage(radius, percentage);
  const fillIt = val => {
    const el = gradient.selectAll('stop');
    el[0].attr({offset: val + '%'});
  };

  face.attr({
    fill: gradient,
    fillOpacity: OPACITY_50,
  });

  Snap.animate(0, calculatedPercentage, fillIt, duration, mina.bounce);
}

class Face {
  constructor(type) {
    if (![HAPPY_VALUE, SAD_VALUE, NEUTRAL_VALUE].includes(type)) {
      throw new Error('No valid type');
    }

    // set private properties
    _private(this).type = type;
    _private(this).id = _createId(type);
    _private(this).svg = _createSVGNode(type, _private(this).id);
    _private(this).paper = _createPaper(_private(this).svg);
    _private(this).text = new Percentage(_private(this).paper, {
      properties: {
        fill: DEFAULT_HASH_COLOR_FACES[type],
        stroke: DEFAULT_HASH_COLOR_FACES[type],
      },
    });

    const { nose, face } = _drawFace(_private(this).paper, type);

    _private(this).nose = nose;
    _private(this).face = face;

    // set public properties
  }

  get type() { return _private(this).type; }

  get id() { return _private(this).id; }

  get svg() { return _private(this).svg; }

  hideNose() {
    _private(this).nose.attr({ display: 'none' });

    return this;
  }

  showNose() {
    _private(this).nose.attr({ display: 'block' });

    return this;
  }

  changeColorNose(color) {
    const { nose, type } = _private(this);

    if (color) {
      const throwError = () => { throw new Error('No valid color.'); };

      if (![4, 7].includes(color.length)) throwError();
      if (!color.startsWith('#')) throwError();

      const rgbValue = color.substring(1).split('');
      if (!rgbValue.every(v => v.match(/[a-fA-F0-9]/))) throwError();
    }

    nose.attr({ stroke: color || DEFAULT_HASH_COLOR_FACES[type] });

    return this;
  }

  setPercentage(value = 0) {
    return this.setPercentageWithAnimation(value, 0);
  }

  setPercentageWithAnimation(value = 0, duration = ONE_SECOND) {
    if (isNaN(Number(value))) {
      throw Error('The value is not a number.');
    }

    _fillFace(
      _private(this).paper,
      _private(this).face,
      DEFAULT_HASH_COLOR_FACES[_private(this).type],
      value,
      duration
    );

    Snap.animate(0, value, val => {
      _private(this).text.setValue(val);
    }, duration, mina.bounce);

    return this;
  }
}

export default Face;
