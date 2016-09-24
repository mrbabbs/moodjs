import { privateEnv } from './helper/helpers';
import {
  DEFAULT_PERCENTAGE_OPTIONS_TEXT,
  DEFAULT_PERCENTAGE_PROPERTIES,
} from './constants';

const _private = privateEnv();

class Percentage {
  constructor(paper, { text, properties } = {}) {
    const {
      x,
      y,
      text: defaultText,
    } = { ...DEFAULT_PERCENTAGE_OPTIONS_TEXT, ...text };
    const optionsProperties = {
      ...DEFAULT_PERCENTAGE_PROPERTIES,
      ...properties,
    };

    _private(this).optionsText = { x, y, defaultText };
    _private(this).percentage = paper.text(x, y, defaultText);

    _private(this).percentage.attr(optionsProperties);
  }

  setValue(value) {
    _private(this).percentage.attr({ text: `${Math.round(value)}%` });
    _private(this).value = value;
  }

  get value() { return _private(this).value; }

  get optionsText() { return _private(this.optionsText); }
}

export default Percentage;
