import fs from 'fs';
import genDiff from '../src/';

const path = '__tests__/data/json/';

test('empty configs', () => {
  const fstConfig = `${path}empty.json`;
  const sndConfig = `${path}empty.json`;
  const result = '';
  expect(genDiff(fstConfig, sndConfig)).toBe(result);
});

// test('fst empty, snd not empty', () => {});

// test('fst not empty, snd empty', () => {});

test('same', () => {
  const fstConfig = `${path}fst.json`;
  const sndConfig = `${path}reversedFst.json`;
  const result = fs.readFileSync(`${path}sameDiff.txt`, 'utf-8');
  expect(genDiff(fstConfig, sndConfig)).toBe(result);
});

test('diff of flat configs', () => {
  const fstConfig = `${path}fst.json`;
  const sndConfig = `${path}snd.json`;
  const result = fs.readFileSync(`${path}diff.txt`, 'utf-8');
  expect(genDiff(fstConfig, sndConfig)).toBe(result);
});

