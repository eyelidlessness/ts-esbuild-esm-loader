# ts-esbuild-esm-loader

An [experimental ESM loader][experimental loaders] supporting:

- ESBuild runtime transpilation of TypeScript ESM modules
- Resolution of `paths` aliases specified in your TypeScript config

## Install

Yarn:

```bash
yarn add typescript ts-esbuild-esm-loader
```

PNPM:

```bash
pnpm add typescript ts-esbuild-esm-loader
```

NPM:

```bash
npm install typescript ts-esbuild-esm-loader
```

## Usage

### Node v14.x.x

Running the node executable directly:

```bash
node --experimental-loader=ts-esbuild-esm-loader ...
```

Other commands which run node:

```bash
NODE_OPTIONS="$NODE_OPTIONS --experimental-loader=ts-esbuild-esm-loader" ...
```

### Node v10.x.x & v12.x.x

If you're using Node v10.x.x. or v12.x.x, you'll also need to specify the `--experimental-modules` flag.

### Stability warning

As noted in the Node.js documentation for [experimental loaders]:

> **Note: This API is currently being redesigned and will still change.**

As such, this library currently restricts compatibility to Node <abbr title="Long-term support">LTS versions</abbr> which are known to be compatible and API stable (v10.x.x, v12.x.x, v14.x.x). Inevitable future API changes will be supported as time allows.

Additionally, Node will rightly report a warning when *any* experimental loader is specified, but users who've accepted this caveat may find the warning noisy. It's possible to disable the warning by specifying an additional flag: `--no-warnings`. Unfortunately, Node does not currently offer more granularity, and this may suppress other, more important warnings.

[esbuild]: https://esbuild.github.io/
[experimental loaders]: https://nodejs.org/docs/latest-v14.x/api/esm.html#esm_loaders
[swc]: https://swc.rs/
