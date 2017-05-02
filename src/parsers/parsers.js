import json from './json';
import ini from './ini';
import yaml from './yaml';

const parseMethods = { json, ini, yaml, yml: yaml };

const getParseMethod = (extname) => {
  const parseMethod = parseMethods[extname];
  if (!parseMethod) {
    throw new Error(`${extname} extension is not supported!`);
  }
  return parseMethod;
};

export default getParseMethod;
