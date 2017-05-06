import _ from 'lodash';

const prefix = {
  nested: '  ',
  equal: '  ',
  added: '+ ',
  removed: '- ',
  updated: { before: '- ', after: '+ ' },
};

const render = (ast) => {
  const json = ast.props.reduce(
    (acc, prop) => {
      if (prop.type === 'updated') {
        const keyAfter = `${prefix.updated.after}${prop.key}`;
        const keyBefore = `${prefix.updated.before}${prop.key}`;
        return { ...acc, [keyAfter]: prop.valueAfter.value, [keyBefore]: prop.valueBefore.value };
      }
      const key = `${prefix[prop.type]}${prop.key}`;
      const value = prop.value.dataType === 'object' ? render(prop.value) : prop.value.value;
      return { ...acc, [key]: value };
    }, {});
  return json;
};

export default render;
