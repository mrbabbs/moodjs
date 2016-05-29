import { expect } from 'chai';
import MoodJS from '../src/mood';
import { version } from '../package.json';
import { createSVGElement } from './lib/helpers.js'

describe.only('MoodJS', () => {
  const happy = 'happy';
  const neutral = 'neutral';
  const sad = 'sad';
  let div;
  const selector = '#containerId';

  it('exists', () => {
    expect(MoodJS).to.exist;
  });

  beforeEach('create a face container', () => {
    div = document.createElement('div');
    div.setAttribute('id', selector.replace('#', ''));
    document.body.appendChild(div);
  });

  afterEach(() => {
    while(MoodJS._faces.length) {
      MoodJS._faces.pop(); // reset only for test
    }
    div.remove();
  });

  describe('#properties', () => {
    it('has a version properties', () => {
      expect(MoodJS.version).to.equal(version);
    });
  });

  describe('#add(type, selector[, options])', () => {
    it('adds an svg element as child of selected element by selector', () => {
      MoodJS.add('happy', selector);
      const actual = div.querySelector('svg');
      expect(actual).to.exist;
    });

    it('adds an id to the svg element', () => {
      MoodJS.add('happy', selector);
      const element = div.querySelector('svg');
      const actual = element.getAttribute('id');
      expect(actual).to.exist;
    });

    context(`${happy} face`, () => {
      it(`adds an ${happy} face`);

      it(`adds ${happy} as prefix of id`, () => {
        MoodJS.add(happy, selector);
        const element = div.querySelector('svg');
        const actual = element.getAttribute('id');
        expect(actual).to.match(/happy-(.+)/);
      });
    });

    context(`${neutral} face`, () => {
      it(`adds an ${neutral} face`);

      it(`adds ${neutral} as prefix of id`, () => {
        MoodJS.add(`${neutral}`, selector);
        const element = div.querySelector('svg');
        const actual = element.getAttribute('id');
        expect(actual).to.match(/neutral-(.+)/);
      });
    });

    context(`${sad} face`, () => {
      it(`adds an ${sad} face`);

      it(`adds ${sad} as prefix of id`, () => {
        MoodJS.add(`${sad}`, selector);
        const element = div.querySelector('svg');
        const actual = element.getAttribute('id');
        expect(actual).to.match(/sad-(.+)/);
      });
    });
  });

  describe('#get([type])', () => {
    it('returns an empty array if no face are added', () => {
      const actual = MoodJS.get();
      expect(actual).to.be.a('array');
      expect(actual).to.be.empty;
    });

    it('returns the list with all the added DOM element if no type as param',
      () => {
        MoodJS._faces.push(createSVGElement(happy));
        let actual = MoodJS.get();
        expect(actual).to.be.a('array');
        expect(actual).to.have.lengthOf(1);

        MoodJS._faces.push(createSVGElement(sad));
        actual = MoodJS.get();
        expect(actual).to.have.lengthOf(2);

        MoodJS._faces.push(createSVGElement(neutral));
        actual = MoodJS.get();
        expect(actual).to.have.lengthOf(3);
      });

    it('returns the list with a group of added DOM element based on type',
      () => {
        MoodJS._faces.push(
          createSVGElement(happy),
          createSVGElement(happy),
          createSVGElement(sad),
          createSVGElement(neutral),
          createSVGElement(happy)
        );
        let actual = MoodJS.get(happy);
        expect(actual).to.have.lengthOf(3);

        actual = MoodJS.get(sad);
        expect(actual).to.have.lengthOf(1);

        actual = MoodJS.get(neutral);
        expect(actual).to.have.lengthOf(1);
      });
  });
});
