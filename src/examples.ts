import { Example, InputOutputType } from '@web/types';

export default <Example[]>[
  {
    name: 'say hello <name>!',
    program: '++++++++[>++++[>++>+++>+<<<-]>+>+[<]<-]>>.>---.+++++++..+++.>.>+[,.]<+.',
    inputs: [{ value: 'World', type: InputOutputType.String }],
    outputType: InputOutputType.String,
  },
  {
    name: 'loop example',
    program: `++++[>++++[>+++<-]<-]
>>>>>
++[<++++[<++++>-]>-]
<<<<<
,
[
  [
    ->+<
  ]
  >>+<
  [
    -<+>
  ]
  >.>.
  <<<
]`,
    inputs: [{ value: 10, type: InputOutputType.Number }],
    outputType: InputOutputType.String,
  },
  {
    name: 'reverse a string',
    program: '>,[>,]+[<.]',
    inputs: [{ value: '>- yaw sihT', type: InputOutputType.String }],
    outputType: InputOutputType.String,
  },
  {
    name: 'convert input to uppercase',
    program: '++++[>++++++++<-]>[>,]<[[-<]>[>]<]>>[.>]',
    inputs: [{ value: 'lower', type: InputOutputType.String }],
    outputType: InputOutputType.String,
  },
  {
    name: 'convert input to lowercase',
    program: '++++[>++++++++<-]>[>,]<[[+<]>--[>]<]>>[.>]',
    inputs: [{ value: 'UPPER', type: InputOutputType.String }],
    outputType: InputOutputType.String,
  },
  {
    name: 'add',
    program: `,>        # read first number, move to cell1
,<        # read second number, move to cell0
[
  ->+<    # add cell0 to cell1
]
>.        # output cell1`,
    inputs: [
      { value: 17, type: InputOutputType.Number },
      { value: 25, type: InputOutputType.Number }
    ],
    outputType: InputOutputType.Number,
  },
  {
    name: 'subtract',
    program: `,>        # read first number, move to cell1
,         # read second number
[
  <->-    # subtract cell1 from cell0
]
<.        # output cell0`,
    inputs: [
      { value: 42, type: InputOutputType.Number },
      { value: 25, type: InputOutputType.Number }
    ],
    outputType: InputOutputType.Number,
  },
  {
    name: 'multiply',
    program: `,>             # read first number, move to cell1
,<             # read second number, move to cell0
[
  >            # move to cell1
  [
    ->+>+<<    # move cell1 to cell2 and cell3, move back to cell1
  ]
  >>           # move to cell3
  [
    -<<+>>     # move cell3 to cell1
  ]
  <<<-         # move to cell0 and decrease it by 1
]
>>.            # output cell2`,
    inputs: [
      { value: 2, type: InputOutputType.Number },
      { value: 5, type: InputOutputType.Number }
    ],
    outputType: InputOutputType.Number,
  },
  {
    name: 'divide',
    program: `,>           # read first number, move to cell1
,<           # read second number, move to cell0
[
  >          # move to cell1
  [
  -<->>+<    #
  ]
  >>+
  <
  [
    <+>-
  ]
  <<
]
>>>.`,
    inputs: [
      { value: 20, type: InputOutputType.Number },
      { value: 5, type: InputOutputType.Number }
    ],
    outputType: InputOutputType.Number,
  },
  {
    name: 'bubble sort',
    program: `# bsort.b -- bubble sort
# (c) 2016 Daniel B. Cristofani
# http://brainfuck.org/

>>,[>>,]<<[
[<<]>>>>[
<<[>+<<+>-]
>>[>+<<<<[->]>[<]>>-]
<<<[[-]>>[>+<-]>>[<<<+>>>-]]
>>[[<+>-]>>]<
]<<[>>+<<-]<<
]>>>>[.>>]

# This program sorts the bytes of its input by bubble sort.`,
    inputs: [
      { value: 2, type: InputOutputType.Number },
      { value: 9, type: InputOutputType.Number },
      { value: 4, type: InputOutputType.Number }
    ],
    outputType: InputOutputType.Number,
  },
  {
    name: 'fibonnaci',
    program: `>++++++++++>+>+[
    [+++++[>++++++++<-]>.<++++++[>--------<-]+<<<]>.>>[
        [-]<[>+<-]>>[<<+>+>-]<[>+<-[>+<-[>+<-[>+<-[>+<-[>+<-
            [>+<-[>+<-[>+<-[>[-]>+>+<<<-[>+<-]]]]]]]]]]]+>>>
    ]<<<
]
# This program doesn't terminate; you will have to kill it.
# Daniel B Cristofani (cristofdathevanetdotcom)
# http://www.hevanet.com/cristofd/brainfuck/`,
    inputs: [],
    outputType: InputOutputType.String,
  },
  {
    name: 'quick sort',
    program: `# qsort.b -- quicksort
# (c) 2016 Daniel B. Cristofani
# http://brainfuck.org/

>>+>>>>>,[>+>>,]>+[--[+<<<-]<[<+>-]<[<[->[<<<+>>>>+<-]<<[>>+>[->]<<[<]
<-]>]>>>+<[[-]<[>+<-]<]>[[>>>]+<<<-<[<<[<<<]>>+>[>>>]<-]<<[<<<]>[>>[>>
>]<+<<[<<<]>-]]+<<<]+[->>>]>>]>>[.>>>]

# This program sorts input bytes via quicksort.`,
    inputs: [
      { value: 2, type: InputOutputType.Number },
      { value: 9, type: InputOutputType.Number },
      { value: 4, type: InputOutputType.Number }
    ],
    outputType: InputOutputType.Number,
  },
  {
    name: 'quine',
    program: `->++>+++>+>+>+++>>>>>>>>>>>>>>>>>>>>+>+>++>+++>++>>+++>+>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>+>+>>+++>>+++>>>>>+++>+>>>>>>>>>++>+++>+++>+>>+++>>>+++>+>++>+++>>>+>+>
++>+++>+>+>>+++>>>>>>>+>+>>>+>+>++>+++>+++>+>>+++>>>+++>+>++>+++>++>>+>+>++>+++>
+>+>>+++>>>>>+++>+>>>>>++>+++>+++>+>>+++>>>+++>+>+++>+>>+++>>+++>>++[[>>+[>]++>+
+[<]<-]>+[>]<+<+++[<]<+]>+[>]++++>++[[<++++++++++++++++>-]<+++++++++.<]
# Slight modification of Erik Bosman's ingenious 410-byte quine.
# Daniel B Cristofani (cristofdathevanetdotcom)
# http://www.hevanet.com/cristofd/brainfuck/`,
    inputs: [],
    outputType: InputOutputType.String,
  }
];