import {
  fileURLToPath,
  format,
  pathToFileURL,
} from 'url';

type Format =
  | 'builtin'
  | 'commonjs'
  | 'dynamic'
  | 'json'
  | 'module'
  | 'wasm';

interface GetFormatResult {
  readonly format: Format;
}

type GetFormat = (
  urlString:        string,
  context:          unknown,
  defaultGetFormat: GetFormat
) => Promise<GetFormatResult>;

 export const getFormat: GetFormat = async (
   urlString,
   context,
   defaultGetFormat
) => {
  const url = new URL(urlString);

  if (!url.protocol.startsWith('file:')) {
    return defaultGetFormat(urlString, context, defaultGetFormat);
  }

  const nativePath = fileURLToPath(urlString);
  const asJS       = nativePath.replace(/\.tsx?$/, '.js');

  if (asJS !== nativePath) {
    const formatted = format(pathToFileURL(asJS));

    return defaultGetFormat(formatted, context, defaultGetFormat);
  }

  return defaultGetFormat(urlString, context, defaultGetFormat);
};
