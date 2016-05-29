import {
  HAPPY_VALUE,
  SAD_VALUE,
  NEUTRAL_VALUE,
} from './constants';

const _type = new WeakMap();

class Face {
  constructor(type) {
    if (type !== HAPPY_VALUE &&
        type !== SAD_VALUE &&
        type !== NEUTRAL_VALUE) {
      throw new Error('No valid type');
    }
    _type.set(this, type);
  }

  get type() {
    return _type.get(this);
  }
}

export default Face;
