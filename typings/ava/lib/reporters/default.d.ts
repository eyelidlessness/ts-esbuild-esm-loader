declare module 'ava/lib/reporters/default' {
  import { AvaPlan } from 'ava/lib/api';

  export interface AvaReporterOptions {
    readonly durationThreshold?: number;
    readonly projectDir:         string;
    readonly reportStream:       NodeJS.Process['stdout'];
    readonly spinner?:           boolean;
    readonly stdStream:          NodeJS.Process['stderr'];
    readonly watching?:          boolean;
    readonly verbose?:           boolean;
  }

  export default class Reporter {
    constructor(options: AvaReporterOptions) {}
    endRun(): void;

    startRun(plan: AvaPlan): void;
  }
}
