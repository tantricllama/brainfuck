export interface Breakdown {
  part: string;
  cursorStart: number;
  explanation: string;
  indentation: number;
  invalid: boolean;
}

export interface Cell {
  value: number;
  className: string;
}

export interface Compiled {
  program: string;
  pointer: number;
  cursor: number;
  inputBytes: number[];
  inputIndex: number;
  previous?: Compiled & { cells : Cell[] };
  loopStartMap: { [key: number]: number };
  loopEndMap: { [key: number]: number };
  start: Date;
}

export interface Example {
  name: string;
  program: string;
  inputs: Input[];
  outputType: InputOutputType;
}

export interface Explanation {
  part: string;
  explanation: string;
  indentation: number;
  length: number;
}

export enum InputOutputType {
  Number = 'number',
  String = 'text'
}

export interface Input {
  value: string;
  type: InputOutputType;
}

export interface Output {
  value: number[];
  type: InputOutputType;
}

export enum ProgramState {
  Running,
  Paused,
  Stopped,
  Previous,
  Next,
}
