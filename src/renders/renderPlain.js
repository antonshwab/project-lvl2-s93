const getDiffPhrase = (prop) => {
  if (prop.type === 'equal') {
    return 'remained the same';
  }
  if (prop.type === 'added') {
    return prop.value.dataType === 'literal' ? `was added with value: ${prop.value.value}` : 'was added with complex value';
  }
  if (prop.type === 'removed') {
    return 'was removed';
  }
  const fromValueString = prop.valueBefore.dataType === 'literal' ? `${prop.valueBefore.value}` : 'complex value';
  const toValueString = prop.valueAfter.dataType === 'literal' ? `${prop.valueAfter.value}` : 'complex value';
  return `was updated. From ${fromValueString} to ${toValueString}`;
};

const renderPlain = (ast, parentsKeys = []) => {
  const propsStrings = ast.props.map(
    (prop) => {
      if (prop.type === 'nested') {
        return renderPlain(prop.value, [...parentsKeys, prop.key]);
      }
      return `Property '${[...parentsKeys, prop.key].join('.')}' ${getDiffPhrase(prop)}`;
    });
  return propsStrings.join('\n');
};

export default renderPlain;
