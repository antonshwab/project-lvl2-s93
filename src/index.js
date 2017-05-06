import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parsers';
import render from './renders';

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
    return { type: 'array', elements };
  }
  if (_.isPlainObject(item)) {
    const props = Object.keys(item)
      .map(key => ({ type: 'property', tag: 'nested', key, value: getSimpleAST(item[key]) }));
    return { type: 'object', props };
  }
  return { type: 'literal', value: item };
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
          tag: 'nested',
          key,
          value: getDiffAST(fstValue, sndValue) };
      }
      if (_.isEqual(fstValue, sndValue)) {
        return {
          type: 'property',
          tag: 'equal',
          key,
          value: getSimpleAST(fstValue) };
      }
      if (!fstValue && sndValue) {
        return {
          type: 'property',
          tag: 'added',
          key,
          value: getSimpleAST(sndValue) };
      }
      if (fstValue && !sndValue) {
        return {
          type: 'property',
          tag: 'removed',
          key,
          value: getSimpleAST(fstValue) };
      }
      return {
        type: 'property',
        tag: 'updated',
        key,
        valueBefore: getSimpleAST(fstValue),
        valueAfter: getSimpleAST(sndValue) };
    });
  const ast = { type: 'object', props };
  return ast;
};

const genDiff = (fstPath, sndPath, format = 'tree') => {
  const fstConfObj = readConfFile(fstPath);
  const sndConfObj = readConfFile(sndPath);

  const fstConfData = getData(fstConfObj);
  const sndConfData = getData(sndConfObj);

  const ast = getDiffAST(fstConfData, sndConfData);
  return render(ast, format);
};

export default genDiff;
