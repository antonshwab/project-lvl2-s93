const getDiffPhrase = (prop) => {
  if (prop.tag === 'equal') {
    return 'remained the same';
  }
  if (prop.tag === 'added') {
    return prop.value.type === 'literal' ? `was added with value: ${prop.value.value}` : 'was added with complex value';
  }
  if (prop.tag === 'removed') {
    return 'was removed';
  }
  const fromValueString = prop.valueBefore.type === 'literal' ? `${prop.valueBefore.value}` : 'complex value';
  const toValueString = prop.valueAfter.type === 'literal' ? `${prop.valueAfter.value}` : 'complex value';
  return `was updated. From ${fromValueString} to ${toValueString}`;
};

const renderPlain = (ast, parentsKeys = []) => {
  const propsStrings = ast.props.map(
    (prop) => {
      if (prop.tag === 'nested') {
        return renderPlain(prop.value, [...parentsKeys, prop.key]);
      }
      return `Property '${[...parentsKeys, prop.key].join('.')}' ${getDiffPhrase(prop)}`;
    });
  return propsStrings.join('\n');
};

export default renderPlain;
