import fs from 'fs';
import path from 'path';
import genDiff from '../src/';

const dirJson = '__tests__/__fixtures__/json/';

test('empty configs', () => {
  const fstPath = path.join(dirJson, 'empty.json');
  const sndPath = fstPath;
  const resultPath = path.join(dirJson, 'emptyDiff.txt');
  const result = fs.readFileSync(resultPath, 'utf-8');
  expect(genDiff(fstPath, sndPath)).toBe(result);
});

// test('fst empty, snd not empty', () => {});

// test('fst not empty, snd empty', () => {});

test('same', () => {
  const fstPath = path.join(dirJson, 'fst.json');
  const sndPath = path.join(dirJson, 'reversedFst.json');
  const resultPath = path.join(dirJson, 'sameDiff.txt');
  const result = fs.readFileSync(resultPath, 'utf-8');
  expect(genDiff(fstPath, sndPath)).toBe(result);
});

test('diff of flat configs', () => {
  const fstPath = path.join(dirJson, 'fst.json');
  const sndPath = path.join(dirJson, 'snd.json');
  const resultPath = path.join(dirJson, 'diff.txt');
  const result = fs.readFileSync(resultPath, 'utf-8');
  expect(genDiff(fstPath, sndPath)).toBe(result);
});

