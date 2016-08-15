import 'babel-polyfill';
import { expect } from 'chai';
import Snap from 'snapsvg';
import Face from '../src/face';
import {
  HAPPY_VALUE,
  SAD_VALUE,
  NEUTRAL_VALUE,
  DEFAULT_HASH_COLOR_FACES,
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

    it('has #paper', () => {
      expect(happyFace.paper).to.be.an.instanceOf(Object);
    });

    it('has #id', () => {
      expect(happyFace.id).to.match(/^mood-happy-(\w)+/);
      expect(sadFace.id).to.match(/^mood-sad-(\w)+/);
      expect(neutralFace.id).to.match(/^mood-neutral-(\w)+/);
    });

    it('has #svg', () => {
      expect(happyFace.svg).to.be.not.undefined;
      expect(happyFace.svg.getAttribute('id')).to.be.equal(happyFace.id);
      expect(happyFace.svg.getAttribute('width')).to.be.equal('100%');
      expect(happyFace.svg.getAttribute('height')).to.be.equal('100%');
      expect(happyFace.svg.getAttribute('viewBox')).to.be.equal('0 0 100 100');
    });
  });

  [HAPPY_VALUE, SAD_VALUE, NEUTRAL_VALUE].forEach((mood) => {
    describe(`${mood} face`, () => {
      let circleFace;
      let face;
      let rtEye;
      let ltEye;

      beforeEach('selects face', () => {
        face = new Face(mood);
        circleFace = face.svg.querySelector('[data-type=face]');
        [ltEye, rtEye] = face.svg.querySelectorAll('[data-type=eye]') || [];
      });

      it('is circle', () => {
        expect(circleFace).to.not.be.undefined;
        expect(circleFace.getAttribute('cx')).to.be.equal('50');
        expect(circleFace.getAttribute('cy')).to.be.equal('50');
        expect(circleFace.getAttribute('r')).to.be.equal('45');
      });

      it('has colorful border', () => {
        const actual = circleFace.getAttribute('stroke');
        const expected = DEFAULT_HASH_COLOR_FACES[mood];

        expect(actual).to.be.equal(expected);
      });

      it('has a default background color', () => {
        const actual = circleFace.getAttribute('fill');

        expect(actual).to.be.equal('#ffffff');
      });

      it('has two eyes', () => {
        expect(ltEye).to.exist;
        expect(rtEye).to.exist;

        [ltEye, rtEye].forEach(eye => {
          const actual = eye.getAttribute('fill');
          const expected = DEFAULT_HASH_COLOR_FACES[mood];
          expect(actual).to.be.equal(expected);
        });
      });

      it('has a nose', () => {
      });

      context('mouth', () => {
        it('is happy', () => {
        });

        it('is sad', () => {
        });

        it('is neutral', () => {
        });
      });
    });
  });
});
