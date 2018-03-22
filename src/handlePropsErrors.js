export function handlePropsErrors(props) {
  console.log('props', props);
  if (!props.children || Array.isArray(props.children)) {
    throw new Error('Morpher component exepects one child element');
  }
  const childProps = props.children.props;
  console.log('childProps', childProps);
  if (!childProps.style || !childProps.style.height || !childProps.style.width) {
      throw new Error('Morpher child component must have height and width style');
  }
  if (typeof childProps.style.height !== 'number' || typeof childProps.style.width !== 'number') {
    throw new Error('Morpher child component height and width style must be numbers');
  }
}
