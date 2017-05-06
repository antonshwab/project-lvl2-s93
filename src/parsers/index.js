import json from './json';
import ini from './ini';
import yaml from './yaml';

const parsers = { json, ini, yaml, yml: yaml };

const getParser = (extname) => {
  const parser = parsers[extname];
  // if (!parser) {
  //   throw new Error(`${extname} extension is not supported!`);
  // }
  return parser;
};

export default getParser;
