import fs     from 'fs';
import module from 'module';
import path   from 'path';

import esbuild, {
  Format,
  Platform,
} from 'esbuild';

import {
  args,
  booleanFlag,
} from './args';

const CWD = process.cwd();

const BUNDLE_DEFAULT   = true;
const ENTRY_DEFAULT    = path.resolve(CWD, './src/index.ts');
const FORMAT_DEFAULT   = 'esm';
const OUTFILE_DEFAULT  = path.resolve(CWD, './dist/index.js');
const PLATFORM_DEFAULT = 'node';
const TARGET_DEFAULT   = 'es2018';

const esbuildFormats = new Set([
  'cjs',
  'esm',
  'iife',
] as const);

const esbuildFormat = (arg: unknown): Format => (
  esbuildFormats.has(arg)
    ? arg
    : FORMAT_DEFAULT
);

const esbuildPlatforms = new Set([
  'browser',
  'neutral',
  'node',
] as const);

const esbuildPlatform = (arg: unknown): Platform => (
  esbuildPlatforms.has(arg)
    ? arg
    : PLATFORM_DEFAULT
);

const { argv } = process;

const [
  bundle = BUNDLE_DEFAULT,
] = args(argv, 'no-bundle', booleanFlag);

const [
  firstEntryPoint = ENTRY_DEFAULT,
  ...entryPointsRest
] = args(argv, 'entrypoint');

const entryPoints = [
  firstEntryPoint,
  ...entryPointsRest,
];

const nodeModulesDirectories = {
  local:    path.resolve(CWD, './node_modules'),
  monorepo: path.resolve(CWD, '../../node_modules'),
};

const external = [
  ...module.builtinModules,
  ...fs.readdirSync(nodeModulesDirectories.local),
  ...fs.readdirSync(nodeModulesDirectories.monorepo),
];

const [
  format = FORMAT_DEFAULT,
] = args(argv, 'format', esbuildFormat);

const [
  outfile = OUTFILE_DEFAULT,
] = args(argv, 'outfile');

const [
  platform = PLATFORM_DEFAULT,
] = args(argv, 'platform',  esbuildPlatform);

const [
  target = TARGET_DEFAULT,
] = args(argv, 'target',  esbuildPlatform);

const options = {
  bundle,
  entryPoints,
  external,
  format,
  platform,
  outfile,
  target,
};

esbuild.buildSync(options);
