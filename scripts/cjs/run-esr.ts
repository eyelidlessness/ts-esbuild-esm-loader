import path  from 'path';
import yargs from 'yargs';

const {
  argv: {
    concurrent,
    script,
  },
} = yargs
  .parserConfiguration({
    'boolean-negation':          true,
    'camel-case-expansion':      false,
    'combine-arrays':            false,
    'dot-notation':              false,
    'duplicate-arguments-array': true,
    'flatten-duplicate-arrays':  true,
    'negation-prefix':           'no-',
    'parse-numbers':             true,
    'populate--':                true,
    'set-placeholder-key':       false,
    'short-option-groups':       true,
    'strip-aliased':             true,
  })
  .command(
    '* <script>',
    'Run ESM script',
    (commandArgs) => (
      commandArgs.positional('script', {
        demandOption: true,
        describe:     'Script to run as ESM',
        type:         'string',
      })
    )
  )
  .option('concurrent', {
    alias:   'c',
    default: true,
  })
  .help();

type ArrayType<T> =
  T extends ReadonlyArray<infer U>
    ? U
  : T extends Array<infer U>
    ? U
    : never;

type ArrayTypeOrType<T> =
  ArrayType<T> extends infer U
    ? U
    : T;

const isArray = <T>(
  value: T
): value is Extract<T, ReadonlyArray<ArrayTypeOrType<T>>> => (
  Array.isArray(value)
);

const baseScripts = (
  isArray(script)
    ? script
  : script == null
    ? []
    : [ script ]
);

const cwd     = process.cwd();
const scripts = baseScripts.map((script) => (
  path.resolve(cwd, script)
));

(async () => {
  if (concurrent) {
    return await Promise.all(scripts.map((script) => import(script)));
  }

  for await (const script of scripts) {
    await import(script);
  }
})();
