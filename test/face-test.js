import 'babel-polyfill';
import { expect } from 'chai';
import Face from '../src/face';
import {
  HAPPY_VALUE,
  SAD_VALUE,
  NEUTRAL_VALUE,
} from '../src/constants';

describe('Face module', () => {
  let happyFace;
  let sadFace;
  let neutralFace;

  it('exists', () => {
    expect(Face).to.be.exists;
  });

  it('is a Face instance', () => {
    const face = new Face(HAPPY_VALUE);
    expect(face).to.be.instanceOf(Face);
  });

  beforeEach('creates faces', () => {
    happyFace = new Face(HAPPY_VALUE);
    sadFace = new Face(SAD_VALUE);
    neutralFace = new Face(NEUTRAL_VALUE);
  });

  describe('properties', () => {
    it('has a type property', () => {
      expect(happyFace.type).to.be.equal(HAPPY_VALUE);
      expect(neutralFace.type).to.be.equal(NEUTRAL_VALUE);
      expect(sadFace.type).to.be.equal(SAD_VALUE);
    });

    it('throw an exception if a not valid type is used', () => {
      expect(() => { happyFace = new Face(); }).to.be.throw(/No valid type/);
      expect(() => {
        happyFace = new Face('some-type');
      }).to.be.throw(/No valid type/);
    });
  });
});
