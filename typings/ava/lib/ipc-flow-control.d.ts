declare module 'ava/lib/ipc-flow-control' {
  type BufferedSend = (event: unknown) => void;

  export const controlFlow: (process: NodeJS.Process) => BufferedSend;
}
