declare module 'package-hash' {
  interface PackageHash {
    readonly sync: (packagePath: string) => string;
  }

  const packageHash: PackageHash;

  export default packageHash
}
