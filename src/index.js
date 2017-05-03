import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parsers';

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

const getDiffStrings = (fstData, sndData) => {
  const fstKeys = Object.keys(fstData);
  const sndKeys = Object.keys(sndData);
  const unionKeys = _.union(fstKeys, sndKeys);
  return unionKeys.reduce(
    (acc, key) => {
      if (fstData[key] === sndData[key]) {
        return [...acc, `  ${key}: ${fstData[key]}`];
      }
      if (!sndData[key]) {
        return [...acc, `- ${key}: ${fstData[key]}`];
      }
      if (!fstData[key] && sndData[key]) {
        return [...acc, `+ ${key}: ${sndData[key]}`];
      }
      return [...acc, `+ ${key}: ${sndData[key]}`, `- ${key}: ${fstData[key]}`];
    }, []);
};

const getFormatDiff = diffStrings => ['{\n', ...diffStrings.map(s => `  ${s}\n`), '}'].join('');

const genDiff = (fstPath, sndPath) => {
  const fstConfObj = readConfFile(fstPath);
  const sndConfObj = readConfFile(sndPath);

  const fstConfData = getData(fstConfObj);
  const sndConfData = getData(sndConfObj);

  const diffStrings = getDiffStrings(fstConfData, sndConfData);

  const formattedDiff = getFormatDiff(diffStrings);

  return formattedDiff;
};

export default genDiff;
