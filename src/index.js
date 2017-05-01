import fs from 'fs';

const genDiff = (fstPath, sndPath) => {
  const isEmptyBefore = fs.statSync(fstPath).size === 0;
  const isEmptyAfter = fs.statSync(sndPath).size === 0;

  if (isEmptyAfter && isEmptyBefore) return '';

  const beforeConfig = isEmptyBefore ? {} : JSON.parse(fs.readFileSync(fstPath, 'utf-8'));
  const afterConfig = isEmptyAfter ? {} : JSON.parse(fs.readFileSync(sndPath, 'utf-8'));

  const beforeKeys = Object.keys(beforeConfig);
  const afterKeys = Object.keys(afterConfig);

  const diffStrings = beforeKeys.reduce(
    (acc, key) => {
      if (beforeConfig[key] === afterConfig[key]) {
        return [...acc, `  ${key}: ${beforeConfig[key]}`];
      }
      if (!afterConfig[key]) {
        return [...acc, `- ${key}: ${beforeConfig[key]}`];
      }
      return [...acc, `+ ${key}: ${afterConfig[key]}`, `- ${key}: ${beforeConfig[key]}`];
    },
    []);

  const newKeys = afterKeys.filter(k => !beforeKeys.includes(k));
  const additions = newKeys.reduce((acc, key) => [...acc, `+ ${key}: ${afterConfig[key]}`], []);

  diffStrings.push(...additions);

  const diff = ['{\n', ...diffStrings.map(s => `  ${s}\n`), '}'].join('');

  return diff;
};

export default genDiff;
