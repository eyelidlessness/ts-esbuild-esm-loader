import childProcess, {
  SpawnOptions,
} from 'child_process';
import path from 'path';

import chokidar from 'chokidar';

const CWD = process.cwd();

const defaultSpawnOptions = {
  cwd:   CWD,
  env:   process.env,
  shell: true,
  stdio: 'inherit',
} as const;

export const watch = (
  command:      string,
  args:         readonly string[],
  spawnOptions: SpawnOptions = {}
) => {
  const watcher = chokidar.watch(path.resolve(CWD, '*/**.{ts,tsx}'), {
    cwd:           CWD,
    ignoreInitial: false,
  });

  type AnyFunction<A extends readonly any[], R> = (...args: A) => R;

  const debounce = <A extends readonly any[], R>(
    fn:    AnyFunction<A, R>,
    delay: number
  ): AnyFunction<A, R> => {
    let previousResult: R | null = null;

    let isDebounced = false;

    return (...args: A): R => {
      if (isDebounced) {
        return previousResult!;
      }

      previousResult = fn(...args);
      isDebounced    = true;

      setTimeout(() => {
        isDebounced = false;
      }, delay);

      return previousResult;
    }
  }

  watcher.on('all', debounce(() => {
    try {
      childProcess.spawnSync(command, args, {
        ...defaultSpawnOptions,
        ...spawnOptions,
      });
    }
    catch (error) {
      console.error(error);
    }
  }, 150));

  watcher.on('error', (error) => {
    console.log(error);
  });

  return watcher;
};

const { argv } = process;

const SELF_URL = `file://${__filename}`;

const {
  pathname: SELF_PATH,
} = new URL(SELF_URL);

const selfArgIndex = argv.findIndex((arg) => (
  arg === SELF_PATH ||
  arg === __filename
));

if (selfArgIndex > -1) {
  const [
    command,
    ...args
  ] = argv.slice(selfArgIndex + 1);

  watch(command, args);
}
