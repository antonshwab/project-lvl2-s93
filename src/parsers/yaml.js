import yaml from 'js-yaml';

const parse = string => yaml.safeLoad(string);

export default parse;
