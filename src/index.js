import fs from 'fs';
import path from 'path';
import getParseMethod from './parsers/parsers';

const readConfigFile = (configPath) => {
  const extname = path.parse(configPath).ext;
  const dottlessExtname = extname.substr(1);
  const string = fs.readFileSync(configPath, 'utf-8');
  return { string, extname: dottlessExtname };
};

const getData = (configObj) => {
  const { string, extname } = configObj;
  const parse = getParseMethod(extname);
  return parse(string);
};

const getDiffStrings = (fstData, sndData) => {
  const unionKeys = Object.keys(Object.assign({}, fstData, sndData));
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
  const fstConfigObj = readConfigFile(fstPath);
  const sndConfigObj = readConfigFile(sndPath);

  const fstConfigData = getData(fstConfigObj);
  const sndConfigData = getData(sndConfigObj);

  const diffStrings = getDiffStrings(fstConfigData, sndConfigData);

  const formattedDiff = getFormatDiff(diffStrings);

  return formattedDiff;
};

export default genDiff;
