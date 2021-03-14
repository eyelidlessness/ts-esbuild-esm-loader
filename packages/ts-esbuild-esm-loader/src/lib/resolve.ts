import path from 'path';
import {
  baseUrl,
  CWD,
  paths,
} from './config.js';

const escapePattern = (str: string) => (
  str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
);

const pathPattern = (str: string) => (
  new RegExp([
    '^',
    escapePattern(
      str.replace(/^(.*)\*.*/, '$1')
    ),
    str.replace(/.*\*.*/, '(.*)'),
    escapePattern(
      str.replace(/.*\*(.*)$/, '$1')
    ),
    '$',
  ].join(''))
);

const resolutionSpec = (resolution: string) => (
  resolution.split('*')
);

const resolutionsArray = (resolutions: unknown) => (
  Array.isArray(resolutions)
    ? resolutions
    : []
);

const pathsMap = new Map(Object.entries(paths).map(([ pattern, resolutions ]) => ([
  pathPattern(pattern),
  resolutionsArray(resolutions).map(resolutionSpec),
])));

const noExtensionPattern    = /\/[^.]*$/;
const relativePrefixPattern = /^[./]/;

interface ResolveContext {
  readonly conditions: readonly string[];
  readonly parentURL?: string;
}

type ResolveFunction = (
  specifier:      string,
  context:        ResolveContext,
  defaultResolve: ResolveFunction
) => Promise<{ url: string }>;

export const resolve: ResolveFunction = async (
  specifier,
  context,
  defaultResolve
) => {
  for (const [ pattern, resolutions ] of pathsMap.entries()) {
    if (pattern.test(specifier)) {
      const mapped = specifier.replace(pattern, '$1');

      for (const [ prefix, suffix ] of resolutions) {
        const modulePath = path.resolve(CWD, baseUrl, prefix, `${mapped}${suffix}`);

        try {
          const resolved = defaultResolve(modulePath, context, defaultResolve);

          return resolved;
        }
        catch (error) {
          console.error('error', error);
        }
      }
    }
  }

  if (noExtensionPattern.test(specifier) && relativePrefixPattern.test(specifier)) {
    return defaultResolve(`${specifier}.js`, context, defaultResolve);
  }

  return defaultResolve(specifier, context, defaultResolve);
};
