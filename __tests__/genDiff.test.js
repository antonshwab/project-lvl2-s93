import fs from 'fs';
import path from 'path';
import genDiff from '../src/';

const dirJson = '__tests__/__fixtures__/json/';
const dirYaml = '__tests__/__fixtures__/yaml/';
const dirIni = '__tests__/__fixtures__/ini/';
const dirDiff = '__tests__/__fixtures__/diffs/';

describe('json configs', () => {
  test('empty configs', () => {
    const fstPath = path.join(dirJson, 'empty.json');
    const sndPath = fstPath;
    const resultPath = path.join(dirDiff, 'emptyDiff.txt');
    const result = fs.readFileSync(resultPath, 'utf-8');
    expect(genDiff(fstPath, sndPath)).toBe(result);
  });

  test('same', () => {
    const fstPath = path.join(dirJson, 'flatFst.json');
    const sndPath = path.join(dirJson, 'reversedFst.json');
    const resultPath = path.join(dirDiff, 'sameDiff.txt');
    const result = fs.readFileSync(resultPath, 'utf-8');
    expect(genDiff(fstPath, sndPath)).toBe(result);
  });

  test('diff flat configs', () => {
    const fstPath = path.join(dirJson, 'flatFst.json');
    const sndPath = path.join(dirJson, 'flatSnd.json');
    const resultPath = path.join(dirDiff, 'flatDiff.txt');
    const result = fs.readFileSync(resultPath, 'utf-8');
    expect(genDiff(fstPath, sndPath)).toBe(result);
  });

  test('diff nested configs', () => {
    const fstPath = path.join(dirJson, 'nestedFst.json');
    const sndPath = path.join(dirJson, 'nestedSnd.json');
    const resultPath = path.join(dirDiff, 'nestedDiff.txt');
    const result = fs.readFileSync(resultPath, 'utf-8');
    expect(genDiff(fstPath, sndPath)).toBe(result);
  });

  test('plain diff flat configs', () => {
    const fstPath = path.join(dirJson, 'flatFst.json');
    const sndPath = path.join(dirJson, 'flatSnd.json');
    const resultPath = path.join(dirDiff, 'flatPlainDiff.txt');
    const result = fs.readFileSync(resultPath, 'utf-8');
    expect(genDiff(fstPath, sndPath, 'plain')).toBe(result);
  });

  test('plain diff nested configs', () => {
    const fstPath = path.join(dirJson, 'nestedFst.json');
    const sndPath = path.join(dirJson, 'nestedSnd.json');
    const resultPath = path.join(dirDiff, 'nestedPlainDiff.txt');
    const result = fs.readFileSync(resultPath, 'utf-8');
    expect(genDiff(fstPath, sndPath, 'plain')).toBe(result);
  });

  test('json diff nested configs', () => {
    const fstPath = path.join(dirJson, 'nestedFst.json');
    const sndPath = path.join(dirJson, 'nestedSnd.json');
    const resultPath = path.join(dirDiff, 'nestedJsonDiff.json');
    const result = JSON.parse(fs.readFileSync(resultPath, 'utf-8'));
    expect(genDiff(fstPath, sndPath, 'json')).toEqual(result);
  });
});

describe('yaml configs', () => {
  test('diff flat configs', () => {
    const fstPath = path.join(dirYaml, 'flatFst.yaml');
    const sndPath = path.join(dirYaml, 'flatSnd.yaml');
    const resultPath = path.join(dirDiff, 'flatDiff.txt');
    const result = fs.readFileSync(resultPath, 'utf-8');
    expect(genDiff(fstPath, sndPath)).toBe(result);
  });
  test('diff nested configs', () => {
    const fstPath = path.join(dirYaml, 'nestedFst.yaml');
    const sndPath = path.join(dirYaml, 'nestedSnd.yaml');
    const resultPath = path.join(dirDiff, 'nestedDiff.txt');
    const result = fs.readFileSync(resultPath, 'utf-8');
    expect(genDiff(fstPath, sndPath)).toBe(result);
  });
  test('plain diff nested configs', () => {
    const fstPath = path.join(dirYaml, 'nestedFst.yaml');
    const sndPath = path.join(dirYaml, 'nestedSnd.yaml');
    const resultPath = path.join(dirDiff, 'nestedPlainDiff.txt');
    const result = fs.readFileSync(resultPath, 'utf-8');
    expect(genDiff(fstPath, sndPath, 'plain')).toBe(result);
  });
});

describe('ini configs', () => {
  test('diff flat configs', () => {
    const fstPath = path.join(dirIni, 'flatFst.ini');
    const sndPath = path.join(dirIni, 'flatSnd.ini');
    const resultPath = path.join(dirDiff, 'flatDiff.txt');
    const result = fs.readFileSync(resultPath, 'utf-8');
    expect(genDiff(fstPath, sndPath)).toBe(result);
  });
  test('diff nested configs', () => {
    const fstPath = path.join(dirIni, 'nestedFst.ini');
    const sndPath = path.join(dirIni, 'nestedSnd.ini');
    const resultPath = path.join(dirDiff, 'nestedDiff.txt');
    const result = fs.readFileSync(resultPath, 'utf-8');
    expect(genDiff(fstPath, sndPath)).toBe(result);
  });
  test('plain diff nested configs', () => {
    const fstPath = path.join(dirIni, 'nestedFst.ini');
    const sndPath = path.join(dirIni, 'nestedSnd.ini');
    const resultPath = path.join(dirDiff, 'nestedPlainDiff.txt');
    const result = fs.readFileSync(resultPath, 'utf-8');
    expect(genDiff(fstPath, sndPath, 'plain')).toBe(result);
  });
});

