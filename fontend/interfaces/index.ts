// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { Pod } from 'path/to/interfaces';

export type Pod = {
  name: string
  containers: string[]
}

export enum TerminalConnectStatus {
  CONNECTING,
  CONNECTED,
  CLOSED,
}