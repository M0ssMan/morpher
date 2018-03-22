export function getBounds(element) {
  console.log('element', element);
  console.dir(element);
  const parentWidth = element.parentNode.offsetWidth;
  const parentHeight = element.parentNode.offsetHeight;
  const elemWidth = element.offsetWidth;
  const elemHeight = element.offsetHeight;
  const { offsetLeft, offsetTop } = element;
  const bounds = {};
  bounds.left = -offsetLeft;
  bounds.top = -offsetTop;
  bounds.right = parentWidth - offsetLeft - elemWidth;
  bounds.bottom = parentHeight - offsetTop - elemHeight;
  return bounds;
}
