import formatAST from '.';

const formatObject = (obj, opt) => {
  const { prefix, spaceSize } = opt;
  const space = ' '.repeat(Number(spaceSize));
  const prevSpace = ' '.repeat(Number(spaceSize) - 2);
  const propsStrings = obj.props.map(
    (prop) => {
      if (prop.tag === 'updated') {
        const stringValueAfter =
          formatAST(prop.valueAfter, { ...opt, spaceSize: spaceSize + 4 });
        const stringValueBefore =
          formatAST(prop.valueBefore, { ...opt, spaceSize: spaceSize + 4 });
        return `\n${space}${prefix.updated.after}${prop.key}: ${stringValueAfter}`
          + `\n${space}${prefix.updated.before}${prop.key}: ${stringValueBefore}`;
      }
      return `\n${space}${prefix[prop.tag]}${prop.key}: ${formatAST(prop.value, { ...opt, spaceSize: spaceSize + 4 })}`;
    });
  return ['{', ...propsStrings, `\n${prevSpace}}`].join('');
};

export default formatObject;
