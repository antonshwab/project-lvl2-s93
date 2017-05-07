const render = (ast) => {
  const json = ast.props.reduce(
    (acc, prop) => {
      if (prop.type === 'updated') {
        const valueAfter = prop.valueAfter.dataType === 'literal' ? prop.valueAfter.value : render(prop.valueAfter);
        const valueBefore = prop.valueBefore.dataType === 'literal' ? prop.valueBefore.value : render(prop.valueBefore);
        const value = {
          type: prop.type, valueAfter, valueBefore };
        return { ...acc, [prop.key]: value };
      }
      const value = {
        type: prop.type,
        value: prop.value.dataType === 'literal' ? prop.value.value : render(prop.value) };
      return { ...acc, [prop.key]: value };
    }, {});
  return json;
};

export default render;
