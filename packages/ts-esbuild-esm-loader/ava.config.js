// @ts-check

const {
  NODE_OPTIONS,
} = process.env;

const nodeArguments = typeof NODE_OPTIONS === 'string'
  ? NODE_OPTIONS.trim().split(/\s+/)
  : [];

const config = {
  environmentVariables: {
    NODE_OPTIONS,
  },

  extensions: {
    js: true,
    ts: 'module',
  },

  files: [
    '**/*.avaTest.{cjs,js,jsx,mjs,ts,tsx}',
  ],

  nodeArguments,

  nonSemVerExperiments: {
    configurableModuleFormat: true,
  },
};

export default config;
