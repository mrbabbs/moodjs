import { version as _version } from '../package.json';
import Face from './Face';

const MoodJS = (function Mood() {
  const version = _version;
  const _faces = [];

  /**
  * Return an array contains the list of added DOM face elements
  * if a param type is specified it is used as a filter
  *
  * @param type[String] face type to filter (happy, sad, neutral)
  * @return[Array] list of added DOM face element
  **/
  function get(type = '') {
    return !type ? _faces : _faces.filter(({ id }) => id.indexOf(type) >= 0);
  }

  /**
  * add a specific face type to the DOM using a selector
  *
  * @param type[String] face to add (happy, sad, neutral)
  * @param iselector[String] any css selector
  * @return {Face} object ref
  **/
  function add(type, selector) {
    const element = document.querySelector(selector);
    const face = new Face(type);
    const svg = face.svg;

    element.appendChild(svg);
    _faces.push(face);

    return face;
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
