import 'babel-polyfill';
import { expect } from 'chai';
import Face from '../src/face';
import {
  HAPPY_VALUE,
  SAD_VALUE,
  NEUTRAL_VALUE,
} from '../src/constants';

describe.only('Face module', () => {
  it('exists', () => {
    expect(Face).to.be.exists;
  });

  it('is a Face instance', () => {
    const face = new Face(HAPPY_VALUE);
    expect(face).to.be.instanceOf(Face);
  });

  describe('#properties', () => {
    it('has a type property', () => {
      const happy = new Face(HAPPY_VALUE);
      expect(happy.type).to.be.equal(HAPPY_VALUE);

      const neutral = new Face(NEUTRAL_VALUE);
      expect(neutral.type).to.be.equal(NEUTRAL_VALUE);

      const sad = new Face(SAD_VALUE);
      expect(sad.type).to.be.equal(SAD_VALUE);
    });

    it('throw an exception if a not valid type is used', () => {
      expect(() => { const face = new Face()}).to.be.throw(/No valid type/);
      expect(() => {
        const face = new Face('some-type')
      }).to.be.throw(/No valid type/);
    });
  });
});
