#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format (tree, plain)')
  .action((firstConfig, secondConfig) =>
    console.log(genDiff(firstConfig, secondConfig, program.format)))
  .parse(process.argv);
