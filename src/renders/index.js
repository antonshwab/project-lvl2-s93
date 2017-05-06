import tree from './renderTree';
import plain from './renderPlain';

const renders = { tree, plain };

export default (ast, format) => {
  const render = renders[format];
  return render(ast);
};
