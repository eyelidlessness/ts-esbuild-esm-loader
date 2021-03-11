declare module 'ava/lib/chalk' {
  import chalk from 'chalk';

  export interface ChalkOptions {
    readonly level: chalk.Level;
  }

  export const set: (options: ChalkOptions) => unknown;
}
