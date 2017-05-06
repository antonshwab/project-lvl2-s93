import tree from './renderTree';
import plain from './renderPlain';

const renders = { tree, plain };

export default (ast, view) => {
  const render = renders[view];
  return render(ast);
};
