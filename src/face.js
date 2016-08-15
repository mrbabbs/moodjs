import { privateEnv } from './helper/helpers';
import {
  HAPPY_VALUE,
  SAD_VALUE,
  NEUTRAL_VALUE,
} from './constants';


const _private = privateEnv();

class Face {
  constructor(type) {
    if (![HAPPY_VALUE, SAD_VALUE, NEUTRAL_VALUE].includes(type)) {
      throw new Error('No valid type');
    }

    // set private properties
    _private(this).type = type;

  }

  get type() { return _private(this).type; }
}

export default Face;
