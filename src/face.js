import {
  HAPPY_VALUE,
  SAD_VALUE,
  NEUTRAL_VALUE,
} from './constants';

const _type = new WeakMap();

class Face {
  constructor(type) {
    console.log(![HAPPY_VALUE, SAD_VALUE, NEUTRAL_VALUE].includes(type));
    if ([HAPPY_VALUE, SAD_VALUE, NEUTRAL_VALUE].includes(type)) {
      throw new Error('No valid type');
    }

    _type.set(this, type);
  }

  get type() {
    return _type.get(this);
  }
}

export default Face;
