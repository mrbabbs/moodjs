import 'babel-polyfill';
import { expect } from 'chai';
import Snap from 'snapsvg';
import Face from '../src/Face';
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
      let circleBackgroundFace;
      let face;
      let rtEye;
      let ltEye;
      let mouth;
      let nose;

      beforeEach('selects face', () => {
        face = new Face(mood);
        circleFace = face.svg.querySelector('[data-type=face]');
        circleBackgroundFace =
          face.svg.querySelector('[data-type=backgroundFace]');
        [ltEye, rtEye] = face.svg.querySelectorAll('[data-type=eye]') || [];
        mouth = face.svg.querySelector('[data-type=mouth]');
        nose = face.svg.querySelector('[data-type=nose]');
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
        const actual = circleBackgroundFace.getAttribute('fill');

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
        expect(nose).to.exist;
        const actual = nose.getAttribute('stroke');
        const expected = DEFAULT_HASH_COLOR_FACES[mood];
        expect(actual).to.be.equal(expected);
      });

      it('has is a mouth', () => {
        expect(mouth).to.exist;
        const actual = mouth.getAttribute('fill');
        const expected = DEFAULT_HASH_COLOR_FACES[mood];
        expect(actual).to.be.equal(expected);
      });

      describe('.hideNose()', () => {
        it('hides the nose if it is shown', () => {
          face.hideNose();
          const actual = nose.getAttribute('style');
          expect(actual).to.contain('display: none');
        });

        it('returns this', () => {
          expect(face.hideNose()).to.eql(face);
        });
      });

      describe('.showNose()', () => {
        it('shows the nose if it is hidden', () => {
          face.showNose();
          const actual = nose.getAttribute('style');
          expect(actual).to.contain('display: block');
        });

        it('returns this', () => {
          expect(face.showNose()).to.eql(face);
        });
      });

      describe('.changeNoseColor([color])', () => {
        it('changes color of the nose', () => {
          let color = '#ff0000';
          face.changeColorNose(color);
          let actual = nose.getAttribute('stroke');
          expect(actual).to.equal(color);

          color = '#0000ff';
          face.changeColorNose(color);
          actual = nose.getAttribute('stroke');
          expect(actual).to.equal(color);
        });

        it('uses default color if no value is provided', () => {
          face.changeColorNose();
          const actual = nose.getAttribute('stroke');
          const expected = DEFAULT_HASH_COLOR_FACES[mood];
          expect(actual).to.equal(expected);
        });

        it('throws an exception if a wrong param is provided', () => {
          // missing hash char
          expect(() => { face.changeColorNose('strings'); }).to.throw(Error);
          // wrong size
          expect(() => { face.changeColorNose('#1234567'); }).to.throw(Error);
          expect(() => { face.changeColorNose('#1'); }).to.throw(Error);
          expect(() => { face.changeColorNose('#1a'); }).to.throw(Error);
          expect(() => { face.changeColorNose('#1aaa'); }).to.throw(Error);
          // wrong color value
          expect(() => { face.changeColorNose('#www'); }).to.throw(Error);
          expect(() => { face.changeColorNose('#zzzzzz'); }).to.throw(Error);
        });

        it('returns this', () => {
          expect(face.changeColorNose()).to.eql(face);
        });
      });
    });
  });

  describe('methods', () => {
    describe('.setPercentage', () => {
      it('throws an expection if the value is not a number', () => {
        expect(() => { happyFace.setPercentage('string'); }).to.throw(Error);
        expect(() => { happyFace.setPercentage(''); }).to.not.throw(Error);
        expect(() => { happyFace.setPercentage(); }).to.not.throw(Error);
      });

        it('returns this', () => {
          expect(happyFace.setPercentage(10)).to.eql(happyFace);
        });
    });

    describe('.setPercentageWithAnimation', () => {
      it('throws an expection if the value is not a number', () => {
        expect(() => {
          happyFace.setPercentageWithAnimation('string');
        }).to.throw(Error);
        expect(() => {
          happyFace.setPercentageWithAnimation('');
        }).to.not.throw(Error);
        expect(() => {
          happyFace.setPercentageWithAnimation();
        }).to.not.throw(Error);
      });

      it('returns this', () => {
        expect(happyFace.setPercentageWithAnimation(10)).to.eql(happyFace);
      });
    });
  });
});
