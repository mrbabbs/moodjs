import { expect } from 'chai';
import Snap from 'snapsvg';
import Percentage from '../src/percentage';
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
});
