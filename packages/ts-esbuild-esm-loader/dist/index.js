// src/lib/config.ts
import path from "path";
import ts from "typescript";
var TSCONFIG_PATH_DEFAULT = "tsconfig.json";
var {ESBUILD_NODE_PROJECT} = process.env;
var CWD = process.cwd();
var tsconfigPath = ESBUILD_NODE_PROJECT == null ? ts.findConfigFile(CWD, ts.sys.fileExists, TSCONFIG_PATH_DEFAULT) ?? path.resolve(CWD, TSCONFIG_PATH_DEFAULT) : path.resolve(CWD, ESBUILD_NODE_PROJECT);
var {
  config: tsconfig = {}
} = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
var {
  baseUrl = ".",
  paths = {}
} = tsconfig.compilerOptions ?? {};

// src/lib/getFormat.ts
import {
  fileURLToPath,
  format,
  pathToFileURL
} from "url";
var getFormat = async (urlString, context, defaultGetFormat) => {
  const url = new URL(urlString);
  if (!url.protocol.startsWith("file:")) {
    return defaultGetFormat(urlString, context, defaultGetFormat);
  }
  const nativePath = fileURLToPath(urlString);
  const asJS = nativePath.replace(/\.tsx?$/, ".js");
  if (asJS !== nativePath) {
    const formatted = format(pathToFileURL(asJS));
    return defaultGetFormat(formatted, context, defaultGetFormat);
  }
  return defaultGetFormat(urlString, context, defaultGetFormat);
};

// src/lib/resolve.ts
import path2 from "path";
var escapePattern = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
var pathPattern = (str) => new RegExp([
  "^",
  escapePattern(str.replace(/^(.*)\*.*/, "$1")),
  str.replace(/.*\*.*/, "(.*)"),
  escapePattern(str.replace(/.*\*(.*)$/, "$1")),
  "$"
].join(""));
var resolutionSpec = (resolution) => resolution.split("*");
var resolutionsArray = (resolutions) => Array.isArray(resolutions) ? resolutions : [];
var pathsMap = new Map(Object.entries(paths).map(([pattern, resolutions]) => [
  pathPattern(pattern),
  resolutionsArray(resolutions).map(resolutionSpec)
]));
var noExtensionPattern = /\/[^.]*$/;
var relativePrefixPattern = /^[./]/;
var resolve = async (specifier, context, defaultResolve) => {
  for (const [pattern, resolutions] of pathsMap.entries()) {
    if (pattern.test(specifier)) {
      const mapped = specifier.replace(pattern, "$1");
      for (const [prefix, suffix] of resolutions) {
        const modulePath = path2.resolve(CWD, baseUrl, prefix, `${mapped}${suffix}`);
        try {
          const resolved = defaultResolve(modulePath, context, defaultResolve);
          return resolved;
        } catch (error) {
          console.error("error", error);
        }
      }
    }
  }
  if (noExtensionPattern.test(specifier) && relativePrefixPattern.test(specifier)) {
    return defaultResolve(`${specifier}.js`, context, defaultResolve);
  }
  return defaultResolve(specifier, context, defaultResolve);
};

// src/lib/transformSource.ts
import esbuild from "esbuild";
import path3 from "path";
var typescriptExtensionPattern = /\.tsx?$/;
var transformSource = async (source, context, defaultTransformSource) => {
  const extension = path3.extname(context.url);
  if (typescriptExtensionPattern.test(extension)) {
    const {code} = await esbuild.transform(source.toString(), {});
    return {
      source: code
    };
  }
  return defaultTransformSource(source, context, defaultTransformSource);
};
export {
  CWD,
  baseUrl,
  getFormat,
  paths,
  resolve,
  transformSource,
  tsconfig,
  tsconfigPath
};
