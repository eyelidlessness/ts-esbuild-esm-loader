declare module 'ava/lib/api' {
  import { ChalkOptions } from './chalk';

  type AvaFileExtension =
    | 'cjs'
    | 'js'
    | 'jsx'
    | 'mjs'
    | 'ts'
    | 'tsx';

  type AvaFileExtensions = readonly AvaFileExtension[];

  declare const avaPlan: unique symbol;

  export interface AvaPlan {
    [typeof avaPlan]: unknown;

    readonly status: NodeJS.EventEmitter;
  }

  type RunEventHandler = (plan: AvaPlan) => void;

  interface SuggestExitCodeOptions {
    readonly matching: boolean;
  }

  interface RunStatus {
    suggestExitCode(options: SuggestExitCodeOptions): number;
  }

  interface AvaAPIOptions {
    readonly cacheEnabled:          boolean;
    readonly chalkOptions:          ChalkOptions;
    readonly concurrency:           number;
    readonly debug:                 unknown;
    readonly environmentVariables:  Record<string, string>;
    readonly experiments:           unknown;
    readonly extensions:            AvaFileExtensions;
    readonly failFast?:             boolean;
    readonly failWithoutAssertions: boolean;

    readonly globs: {
      readonly extensions:               AvaFileExtensions;
      readonly filePatterns:             readonly string[];
      readonly ignoredByWatcherPatterns: readonly string[];
    };

    readonly match: readonly unknown[];

    readonly moduleTypes: Partial<{
      readonly cjs: 'commonjs';
      readonly js:  'module';
      readonly mjs: 'module';
      readonly jsx: 'module';
      readonly ts:  'module';
      readonly tsx: 'module';
    }>;

    readonly nodeArguments?:   readonly string[];
    readonly parallelRuns?:    boolean | null;
    readonly projectDir:       string;
    readonly providers:        readonly unknown[];
    readonly ranFromCli:       boolean;
    readonly require:          readonly string[];
    readonly serial?:          boolean;
    readonly snapshotDir:      string;
    readonly timeout:          string;
    readonly updateSnapshots?: boolean;
    readonly workerArgv?:      readonly string[];
  }

  export default class Ava implements NodeJS.EventEmitter {
    constructor(options: AvaAPIOptions) {}

    on(event: 'run', handler: RunEventHandler): void;

    run(): Promise<RunStatus>;
  }
}
