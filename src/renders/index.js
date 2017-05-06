import tree from './renderTree';
import plain from './renderPlain';
import json from './renderJson';

const renders = { tree, plain, json };

export default (ast, format) => {
  const render = renders[format];
  return render(ast);
};
