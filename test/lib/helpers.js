export const createSVGElement = (type) => {
  let svg;

  if (document) {
    const randomInt = Math.floor(Math.random() * 1000000000);
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('id', `${type}-${randomInt}`);
  }

  return svg;
};
