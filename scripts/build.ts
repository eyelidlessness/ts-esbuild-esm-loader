import esbuild from 'esbuild';
import path    from 'path';

const cwd = process.cwd();

esbuild.buildSync({
  bundle: true,
  entryPoints: [
    path.resolve(cwd, './src/index.ts'),
  ],
  external: [
    'path',
    'typescript',
  ],
  platform: 'node',
  outfile:  path.resolve(cwd, './dist/index.js'),
});
