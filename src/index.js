import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parse = (configPath) => {
  const isEmptyConfig = fs.statSync(configPath).size === 0;
  const configString = isEmptyConfig ? '{}' : fs.readFileSync(configPath, 'utf-8');
  const extname = path.parse(configPath).ext;
  if (extname === '.json') {
    return JSON.parse(configString);
  }
  if (extname === '.yaml') {
    return yaml.safeLoad(configString);
  }
  if (extname === '.ini') {
    return ini.parse(configString);
  }
  return new Error(`${extname} extension is not supported!`);
};

const genDiff = (fstPath, sndPath) => {
  const fstConfig = parse(fstPath);
  const sndConfig = parse(sndPath);

  const unionKeys = Object.keys(Object.assign({}, fstConfig, sndConfig));

  const diffStrings = unionKeys.reduce(
    (acc, key) => {
      if (fstConfig[key] === sndConfig[key]) {
        acc.push(`  ${key}: ${fstConfig[key]}`);
        return acc;
      }
      if (!sndConfig[key]) {
        acc.push(`- ${key}: ${fstConfig[key]}`);
        return acc;
      }
      if (!fstConfig[key] && sndConfig[key]) {
        acc.push(`+ ${key}: ${sndConfig[key]}`);
        return acc;
      }
      acc.push(`+ ${key}: ${sndConfig[key]}`, `- ${key}: ${fstConfig[key]}`);
      return acc;
    }, []);

  const formattedDiff = ['{\n', ...diffStrings.map(s => `  ${s}\n`), '}'].join('');

  return formattedDiff;
};

export default genDiff;
