import object from './object';
import array from './array';
import literal from './literal';

const formatters = { object, array, literal };

const getFormatter = type => formatters[type];

const prefix = {
  passed: '  ',
  equal: '  ',
  added: '+ ',
  removed: '- ',
  updated: { before: '- ', after: '+ ' },
};

const options = { spaceSize: 2, prefix };

const formatAST = (ast, opt = options) => {
  const format = getFormatter(ast.type);
  const string = format(ast, opt);
  return string;
};

export default formatAST;
