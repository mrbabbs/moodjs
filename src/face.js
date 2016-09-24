import Snap from 'snapsvg';
import { privateEnv } from './helper/helpers';
import Percentage from './Percentage';
import {
  MOOD,
  HAPPY_VALUE,
  SAD_VALUE,
  NEUTRAL_VALUE,
  FACE_SHAPE,
  LEFT_EYE_SHAPE,
  RIGHT_EYE_SHAPE,
  MOUTH_SHAPE,
  NOSE_SHAPE,
  DEFAULT_HASH_COLOR_FACES,
  DEFAULT_BASIC_FACE_PROPERTIES,
  DEFAULT_BASIC_EYE_PROPERTIES,
  DEFAULT_BASIC_MOUTH_PROPERTIES,
  DEFAULT_BASIC_NOSE_PROPERTIES,
  DEFAULT_FACE_SCALING,
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
  const face = paper.circle(...FACE_SHAPE);
  const attrFace = Object.assign(
    {},
    DEFAULT_BASIC_FACE_PROPERTIES,
    { stroke: DEFAULT_HASH_COLOR_FACES[mood] }
  );

  face.attr(attrFace);

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

  const group = paper.g(face, mouth, ltEye, rtEye, nose);

  group.attr(DEFAULT_FACE_SCALING);

  return { face, nose, mouth, ltEye, rtEye };
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

    const { nose } = _drawFace(_private(this).paper, type);
    _private(this).nose = nose;

    // set public properties
  }

  get type() { return _private(this).type; }

  get id() { return _private(this).id; }

  get svg() { return _private(this).svg; }

  get paper() { return _private(this).paper; }

  hideNose() {
    _private(this).nose.attr({ display: 'none' });
  }

  showNose() {
    _private(this).nose.attr({ display: 'block' });
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
  }

  setPercentage(value = 0) {
    if (isNaN(Number(value))) {
      throw Error('The value is not a number.');
    }

    _private(this).text.setValue(value);
  }

  setPercentageWithAnimation(value = 0) {
    if (isNaN(Number(value))) {
      throw Error('The value is not a number.');
    }

    Snap.animate(0, value, (val) => {
      this.setPercentage(val);
    }, 1000);
  }
}

export default Face;
