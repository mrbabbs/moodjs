import Snap from 'snapsvg';
import { privateEnv } from './helper/helpers';
import {
  MOOD,
  HAPPY_VALUE,
  SAD_VALUE,
  NEUTRAL_VALUE,
  FACE_SHAPE,
  LEFT_EYE_SHAPE,
  RIGHT_EYE_SHAPE,
  DEFAULT_HASH_COLOR_FACES,
  DEFAULT_BASIC_FACE_PROPETIES,
  DEFAULT_BASIC_EYE_PROPETIES,
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

function _drawFace(paper, mood) {
  const face = paper.circle(...FACE_SHAPE);
  const attrFace = Object.assign(
    {},
    DEFAULT_BASIC_FACE_PROPETIES,
    { stroke: DEFAULT_HASH_COLOR_FACES[mood] }
  );

  face.attr(attrFace);

  const ltEye = paper.circle(...LEFT_EYE_SHAPE);
  const rtEye = paper.circle(...RIGHT_EYE_SHAPE);
  const attrEye = Object.assign(
    {},
    DEFAULT_BASIC_EYE_PROPETIES,
    { fill: DEFAULT_HASH_COLOR_FACES[mood] }
  );

  ltEye.attr(attrEye);
  rtEye.attr(attrEye);
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

    _drawFace(_private(this).paper, type);
    // set public properties
  }

  get type() { return _private(this).type; }

  get id() { return _private(this).id; }

  get svg() { return _private(this).svg; }

  get paper() { return _private(this).paper; }
}

export default Face;
