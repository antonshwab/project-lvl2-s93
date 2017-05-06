const prefix = {
  passed: '  ',
  equal: '  ',
  added: '+ ',
  removed: '- ',
  updated: { before: '- ', after: '+ ' },
};

const format = (astItem, indentSize = 2) => {
  const indent = ' '.repeat(Number(indentSize));
  const prevIndent = ' '.repeat(Number(indentSize) - 2);
  const nextIndentSize = indentSize + 4;
  if (astItem.type === 'object') {
    const propsStrings = astItem.props.map((prop) => {
      if (prop.tag === 'updated') {
        return `\n${indent}${prefix.updated.after}${prop.key}: ${format(prop.valueAfter, nextIndentSize)}`
          + `\n${indent}${prefix.updated.before}${prop.key}: ${format(prop.valueBefore, nextIndentSize)}`;
      }
      return `\n${indent}${prefix[prop.tag]}${prop.key}: ${format(prop.value, nextIndentSize)}`;
    });
    return ['{', ...propsStrings, `\n${prevIndent}}`].join('');
  }
  return `${astItem.value}`;
};

export default format;
