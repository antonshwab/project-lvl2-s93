import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parsers';
import format from './formatters';

const readConfFile = (confPath) => {
  const extname = path.parse(confPath).ext;
  const dottlessExtname = extname.substr(1);
  const string = fs.readFileSync(confPath, 'utf-8');
  return { string, extname: dottlessExtname };
};

const getData = (confObj) => {
  const { string, extname } = confObj;
  const parser = getParser(extname);
  return parser(string);
};

const getSimpleAST = (item) => {
  if (_.isArray(item)) {
    const elements = item.map(el => getSimpleAST(el));
    return { type: 'array', status: 'pass', elements };
  }
  if (_.isPlainObject(item)) {
    const props = Object.keys(item)
      .map(key => ({ type: 'property', status: 'pass', key, value: getSimpleAST(item[key]) }));
    return { type: 'object', status: 'pass', props };
  }
  return { type: 'literal', status: 'pass', value: item };
};

const getDiffAST = (fstData, sndData) => {
  const fstKeys = Object.keys(fstData);
  const sndKeys = Object.keys(sndData);
  const unionKeys = _.union(fstKeys, sndKeys);
  const props = unionKeys.map(
    (key) => {
      const fstValue = fstData[key];
      const sndValue = sndData[key];
      if (_.isPlainObject(fstValue) && _.isPlainObject(sndValue)) {
        return {
          type: 'property',
          status: 'pass',
          key,
          value: getDiffAST(fstValue, sndValue) };
      }
      if (_.isEqual(fstValue, sndValue)) {
        return {
          type: 'property',
          status: 'equal',
          key,
          value: getSimpleAST(fstValue) };
      }
      if (!fstValue && sndValue) {
        return {
          type: 'property',
          status: 'add',
          key,
          value: getSimpleAST(sndValue) };
      }
      if (fstValue && !sndValue) {
        return {
          type: 'property',
          status: 'remove',
          key,
          value: getSimpleAST(fstValue) };
      }
      return {
        type: 'property',
        status: 'change',
        key,
        valueBefore: getSimpleAST(fstValue),
        valueAfter: getSimpleAST(sndValue) };
    });
  const ast = { type: 'object', props };
  return ast;
};

const genDiff = (fstPath, sndPath) => {
  const fstConfObj = readConfFile(fstPath);
  const sndConfObj = readConfFile(sndPath);

  const fstConfData = getData(fstConfObj);
  const sndConfData = getData(sndConfObj);

  const ast = getDiffAST(fstConfData, sndConfData);
  const formattedDiff = format(ast);
  console.log(formattedDiff);
  return formattedDiff;
};

export default genDiff;
