import { version as __version } from '../package.json';

const MoodJS = {
  version: __version,
  _faces: [],

  _createId(prefix = '') {
    const randomId = btoa((1 + Math.random()) * 0x10000) ;

    return `${prefix}-${randomId}`;
  },

  /**
  * Return an array contains the list of added DOM face elements
  * if a param type is specified it is used as a filter
  *
  * @param type[String] face type to filter (happy, sad, neutral)
  * @return[Array] list of added DOM face element
  **/
  get(type = '') {
    return !type? this._faces : this._faces
      .filter(f => {
        const faceId = f.getAttribute('id');
        return faceId.indexOf('type') >= 0;
      });
  },

  /**
  * add a specific face type to the DOM using a selector
  *
  * @param type[String] face to add (happy, sad, neutral)
  * @selector[String] any css selector
  **/
  add(type, selector) {
    const element = document.querySelector(selector);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('id', this._createId(type));
    element.appendChild(svg);
    this._faces.push(svg);
  },
};

export default MoodJS;
