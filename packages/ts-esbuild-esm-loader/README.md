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

Running the node executable directly:

```bash
node --experimental-loader=ts-esbuild-esm-loader
```

Other commands which run node:

```bash
NODE_OPTIONS="$NODE_OPTIONS --experimental-loader=ts-esbuild-esm-loader" ...
```

## Warning

As noted in the Node.js documentation for [experimental loaders]:

> **Note: This API is currently being redesigned and will still change.**

[esbuild]: https://esbuild.github.io/
[experimental loaders]: https://nodejs.org/docs/latest-v14.x/api/esm.html#esm_loaders
[swc]: https://swc.rs/
