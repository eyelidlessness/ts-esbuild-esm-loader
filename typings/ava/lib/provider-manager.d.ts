declare module 'ava/lib/provider-manager' {
  export interface AvaCompileOptions {
    readonly cacheDir: string;
    readonly files:    readonly string[];
  }

  export interface AvaCompileResult {
    readonly extensions: string[];
    readonly lookup:     Record<string, string>;
  }

  export interface AvaWorkerOptions {
    readonly extensionsToLoadAsModules: readonly string[];
    readonly state:                     AvaCompileResult;
  }

  export type AvaRequireFunction = (ref: string) => unknown;

  export interface AvaLoadOptions {
    readonly requireFn: AvaRequireFunction;
  }

  export interface AvaWorkerResult {
    readonly powerAssert?: unknown;

    canLoad(ref: string): boolean;

    load(ref: string, options: AvaLoadOptions): Promise<unknown>;
  }

  export interface AvaProviderMain {
    readonly extensions: string[];

    compile(options: AvaCompileOptions): Promise<AvaCompileResult>;

  }

  type AvaProviderLevelV3       = 1;
  type AvaProviderLevelV3Point2 = 2;

  type AvaProviderLevel =
    | AvaProviderLevelV3
    | AvaProviderLevelV3Point2;

  type AvaProviderType =
    | 'babel'
    | 'typescript';

  export interface AvaProvider {
    // readonly level: AvaProviderLevel;

    // readonly main:  AvaProviderMain;
    // readonly type:  AvaProviderType;

    main(): AvaProviderMain;

    worker(options: AvaWorkerOptions): AvaWorkerResult;
  }
}
