import esbuild from 'esbuild';
import path    from 'path';

type Source =
  | string
  | SharedArrayBuffer
  | Uint8Array;

interface TransformSourceContext {
  readonly format: string;
  readonly url:    string;
}

interface TransformSourceResult {
  readonly source: Source;
}

type TransformSource = (
  source:                 Source,
  context:                TransformSourceContext,
  defaultTransformSource: TransformSource
) => Promise<TransformSourceResult>;

const typescriptExtensionPattern = /\.tsx?$/;

export const transformSource: TransformSource = async (
  source,
  context,
  defaultTransformSource
) => {
  const extension = path.extname(context.url);

  if (typescriptExtensionPattern.test(extension)) {
    const { code } = await esbuild.transform(source.toString(), {});

    return {
      source: code,
    };
  }

  return defaultTransformSource(source, context, defaultTransformSource);
};
