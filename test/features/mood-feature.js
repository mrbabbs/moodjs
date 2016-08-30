import { expect } from 'chai';
import MoodJS from '../../src/mood';
import Face from '../../src/face';

describe('MoodJS', () => {
  it('creates a global var called MoodJS', () => {
    expect(MoodJS).to.not.be.undefined;
  });

  describe('#add(type, selector[, options])', () => {
    let div;
    const selector = '#faceContainer';
    beforeEach('create a div where attach the face', () => {
      div = document.createElement('div');
      div.setAttribute('id', selector.replace('#', ''));
      document.body.appendChild(div);
    });

    afterEach(() => {
      div.remove();
    });

    it('adds an happy face to a specific element by selector', () => {
      MoodJS.add('happy', selector);
      const actual = document.querySelector(`${selector} svg`);
      expect(actual).to.exist;
      expect(actual.getAttribute('id')).to.contain('happy');
    });

    it('adds a neutral face to a specific element by selector', () => {
      MoodJS.add('neutral', selector);
      const actual = document.querySelector(`${selector} svg`);
      expect(actual).to.exist;
      expect(actual.getAttribute('id')).to.contain('neutral');
    });

    it('adds a sad face to a specific element by selector', () => {
      MoodJS.add('sad', selector);
      const actual = document.querySelector(`${selector} svg`);
      expect(actual).to.exist;
      expect(actual.getAttribute('id')).to.contain('sad');
    });

    it('returns a #Face', () => {
      expect(MoodJS.add('happy', selector)).to.be.an.instanceOf(Face);
    });

    it('adds a face using the provided options')
  });

  describe('#happy(selector[, options])', () => {
    it('adds an happy face to a specific element by selector');

    it('returns a #Face');
  });

  describe('#neutral(selector[, options])', () => {
    it('adds an neutral face to a specific element by selector');

    it('returns a #Face');
  });

  describe('#sad(selector[, options])', () => {
    it('adds an sad face to a specific element by selector');

    it('returns a #Face');
  });

  describe('#remove([selector])', () => {
    context('without selector', () => {
      it('removes all faces');

      it('returns all removed #Faces');
    });

    context('with an unique selector', () => {
      it('removes a specific face');

      it('returns the removed #Faces');
    });

    context('with a group selector', () => {
      it('removes all happy faces');

      it('removes all neutral faces');

      it('removes all sad faces');

      it('returns all removed #Faces');
    });
  });

  describe('#setVal(selector, val)', () => {
    it('sets a value of a specific face');
  });

  describe('#reset([selector])', () => {
    context('with a selector', () => {
      it('resets a value of a specific face');
    });

    context('without selector', () => {
      it('resets all value of the faces');
    });
  });
});
