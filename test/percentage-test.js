import { expect } from 'chai';
import Snap from 'snapsvg';
import Percentage from '../src/Percentage';
import { createSVGElement } from './lib/helpers';

describe('Percentage module', () => {
  it('exists', () => {
    expect(Percentage).to.be.exists;
  });

  it('is a Percentage instance', () => {
    const svg = createSVGElement('sad');
    const paper = Snap(svg);
    const percentage = new Percentage(paper);
    expect(percentage).to.be.instanceOf(Percentage);
  });

  describe('setValue', () => {
    it('returns this', () => {
      const svg = createSVGElement('sad');
      const paper = Snap(svg);
      const percentage = new Percentage(paper);
      expect(percentage.setValue(10)).to.eql(percentage);
    });
  });
});
