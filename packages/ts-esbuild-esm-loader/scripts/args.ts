
type FormatArg<T> = (value: string) => T;

export const identity: FormatArg<string> = (arg: string) => arg;

const booleanArgMapping: Record<string, boolean> = {
  false: false,
  true:  true,
} as const;

const booleanStrings = new Set(Reflect.ownKeys(booleanArgMapping));

export const booleanFlag: FormatArg<boolean | undefined> = (arg: unknown) => (
  booleanArgMapping[arg as string]
);

export const args = <T = string>(
  argv:   readonly string[],
  flag:   string,
  format: FormatArg<T> = identity as unknown as FormatArg<T>
): T[] => {
  const flagName       = flag.replace(/^--/, '');
  const normalizedFlag = `--${flagName}`;
  const isBooleanFlag  = (format as unknown) === booleanFlag;
  const matchingFlags  = new Set(
    isBooleanFlag
      ? [
        normalizedFlag,
        `--no-${flagName}`,
      ]
      : [
        normalizedFlag
      ]
  );

  const results = argv.reduce<string[]>((acc, arg, index, argv) => {
    const isFlagArg = matchingFlags.has(
      isBooleanFlag
        ? arg
        : argv[index - 1]
    );

    if (isFlagArg) {
      const nextArg = argv[index + 1];

      const flagValue = isBooleanFlag
        ? booleanStrings.has(nextArg)
          ? nextArg
          : String(arg === normalizedFlag)
        : arg;

      return [
        ...acc,
        flagValue,
      ];
    }

    return acc;
  }, []);

  return results.map(format);
};
