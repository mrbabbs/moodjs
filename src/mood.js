import { version as _version } from '../package.json';

const MoodJS = (function Mood() {
  const version = _version;
  const _faces = [];

  function _createId(prefix = '') {
    const randomId = btoa((1 + Math.random()) * 0x10000);

    return `${prefix}-${randomId}`;
  }

  /**
  * Return an array contains the list of added DOM face elements
  * if a param type is specified it is used as a filter
  *
  * @param type[String] face type to filter (happy, sad, neutral)
  * @return[Array] list of added DOM face element
  **/
  function get(type = '') {
    return !type ?
      _faces :
      _faces
        .filter(f => {
          const faceId = f.getAttribute('id');
          return faceId.indexOf(type) >= 0;
        });
  }

  /**
  * add a specific face type to the DOM using a selector
  *
  * @param type[String] face to add (happy, sad, neutral)
  * @selector[String] any css selector
  **/
  function add(type, selector) {
    const element = document.querySelector(selector);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('id', _createId(type));
    element.appendChild(svg);
    _faces.push(svg);
  }

  return {
    version,
    add,
    get,
    // TODO fix with this solution
    // https://philipwalton.com/articles/how-to-unit-test-private-functions-in-javascript/
    _faces,
  };
}());

export default MoodJS;
