import childProcess from 'child_process';
import path         from 'path';

import {
  set as setChalkContext,
} from 'ava/lib/chalk';
import { controlFlow } from 'ava/lib/ipc-flow-control';
import chalk           from 'chalk';
import del             from 'del';

import pkg             from '../../package.json';

import type Ava               from 'ava/lib/api';
import type { AvaAPIOptions } from 'ava/lib/api';
import type Reporter          from 'ava/lib/reporters/default';

const CWD = process.cwd();

const avaCacheDir = path.join(CWD, 'node_modules', '.cache', 'ava');
const isWatch     = process.argv.includes('--watch');

let ava:      Ava      | null = null;
let reporter: Reporter | null = null;

const chalkOptions = {
  level: chalk.level || 3,
};

setChalkContext(chalkOptions);

class TestFailure extends Error {
  constructor() {
    super('Test failure');
  }
}

const LOADER_PACKAGE_NAME = 'ts-esbuild-esm-loader';
const LOADER_BUILD_PATH   = path.resolve(CWD, './dist/index.js');

const isLoaderPackage = pkg.name === LOADER_PACKAGE_NAME;

if (isLoaderPackage) {
  console.log(
    chalk.yellowBright('▶'),
    `Building ${LOADER_PACKAGE_NAME}`
  );

  childProcess.spawnSync('yarn', [
    'run',
    'build',
  ], {
    cwd:   CWD,
    env:   process.env,
    shell: true,
    stdio: 'inherit',
  });

  console.log(chalk.greenBright('✔'), 'Build complete!');
}

const loaderModule = isLoaderPackage
  ? LOADER_BUILD_PATH
  : LOADER_PACKAGE_NAME;

const loaderArguments = [
  `--experimental-loader=${loaderModule}`,
];

const nodeArguments = [
  '--no-warnings',
  ...loaderArguments,
];

const avaOptions: AvaAPIOptions = {
  cacheEnabled:          true,
  chalkOptions,
  concurrency:           0,
  debug:                 null,
  environmentVariables:  {},
  experiments:           {},
  extensions:            [ 'cjs', 'mjs', 'js', 'ts', 'tsx' ],
  failFast:              undefined,
  failWithoutAssertions: true,

  globs: {
    extensions:   [ 'cjs', 'mjs', 'js', 'ts', 'tsx' ],
    filePatterns: [
      'src/**/*.test.ts',
      'src/**/*.test.tsx',
    ],
    ignoredByWatcherPatterns: [
      '**/*.snap.md',
      'ava.config.js',
      'ava.config.cjs',
    ],
  },

  match: [],

  moduleTypes: {
    cjs: 'commonjs',
    js:  'module',
    jsx: 'module',
    mjs: 'module',
    ts:  'module',
    tsx: 'module',
  },

  nodeArguments,
  parallelRuns:    null,
  projectDir:      CWD,
  providers:       [],
  ranFromCli:      false,
  require:         [],
  serial:          undefined,
  snapshotDir:     path.resolve(CWD, './snapshots'),
  timeout:         '10s',
  updateSnapshots: undefined,
  workerArgv:      undefined,
} as const;

const runTests = async ()/* : Promise<estrella.BuildProcess | void> */ => {
  if (1 > 0) {
    if (ava == null) {
      const { default: Ava }      = await import('ava/lib/api');
      const { default: Reporter } = await import('ava/lib/reporters/default');

      ava = new Ava(avaOptions);

      reporter = new Reporter({
        durationThreshold: undefined,
        projectDir:        CWD,
        reportStream:      process.stdout,
        spinner:           undefined,
        stdStream:         process.stderr,
        watching:          undefined,
        verbose:           true,
      });

      ava.on('run', (plan) => {
        console.log('plan', plan);

        reporter!.startRun(plan);

        const bufferedSend = controlFlow(process);

        plan.status.on('stateChange', (event) => {
          bufferedSend(event);

          if (event.type === 'interrupt') {
            reporter!.endRun();
            process.exit(1);
          }
        });
      });
    }

    const runStatus = await ava.run();
    const exitCode = runStatus.suggestExitCode({ matching: false });

    reporter!.endRun();

    if (exitCode !== 0) {
      throw new TestFailure();
    }

    return;
  }
  else {
    // return estrella.build({
    //   cwd,
    //   entry:     globby.sync(entriesGlob),
    //   minify:    false,
    //   outdir:    outDir,
    //   sourcemap: 'inline',
    //   tslint:    isWatch,
    //   watch:     false,

    //   async onEnd() {

    //   },
    // });
  }
};

// let watchProcess: estrella.CancellablePromise<void> | null = null;

const main = async () => {
  // if (testProcess != null) {
  //   // testProcess.cancel();
  //   // testProcess = null;
  // }

  await Promise.all([
    del('*', {
      cwd: avaCacheDir,
    }),
  ]);

  try {
    /* const result =  */await runTests();

    // testProcess = result;
  }
  catch (error) {
    if (!(error instanceof TestFailure)) {
      console.error('Unexpected error:', error);
    }

    if (!isWatch) {
      process.exit(1);
    }
  }
  finally {
    if (isWatch) {
      // testProcess?.cancel();
      // testProcess = null;

      // if (watchProcess == null) {
      //   watchProcess = estrella.watch([ 'src' ], {
      //     // Imperceptibly slower (to me), but seems to prevent double runs
      //     // on filesystem changes.
      //     latency: 150,
      //   }, main);
      // }
    }
  }
};

main();
