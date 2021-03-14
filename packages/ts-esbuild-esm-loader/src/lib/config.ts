import path from 'path';
import ts   from 'typescript';

const TSCONFIG_PATH_DEFAULT    = 'tsconfig.json';
const { ESBUILD_NODE_PROJECT } = process.env;
const CWD                      = process.cwd();

const tsconfigPath = (
  ESBUILD_NODE_PROJECT == null
    ? (
      ts.findConfigFile(
        CWD,
        ts.sys.fileExists,
        TSCONFIG_PATH_DEFAULT
      ) ??
      path.resolve(CWD, TSCONFIG_PATH_DEFAULT)
    )
    : path.resolve(CWD, ESBUILD_NODE_PROJECT)
);

const {
  config: tsconfig = {},
} = ts.readConfigFile(tsconfigPath, ts.sys.readFile);

const {
  baseUrl = '.',
  paths   = {},
} = tsconfig.compilerOptions ?? {};

export {
  baseUrl,
  CWD,
  paths,
  tsconfig,
  tsconfigPath as tsconfigPath,
};
