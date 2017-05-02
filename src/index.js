import fs from 'fs';

const genDiff = (fstPath, sndPath) => {
  const isEmptyFst = fs.statSync(fstPath).size === 0;
  const isEmptySnd = fs.statSync(sndPath).size === 0;

  if (isEmptySnd && isEmptyFst) return '';

  const fstConfig = isEmptyFst ? {} : JSON.parse(fs.readFileSync(fstPath, 'utf-8'));
  const sndConfig = isEmptySnd ? {} : JSON.parse(fs.readFileSync(sndPath, 'utf-8'));

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

  const diff = ['{\n', ...diffStrings.map(s => `  ${s}\n`), '}'].join('');

  return diff;
};

export default genDiff;
