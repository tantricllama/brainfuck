import React, { Fragment, useEffect, useState } from 'react';
import examples from '@web/examples';
import { Cell, Compiled, Example, Input, InputOutputType, Output as OutputType, ProgramState } from '@web/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import Reference from '@web/components/Reference';
import Explanation from '@web/components/Explanation';
import Cells from '@web/components/Cells';
import Error from '@web/components/Error';
import Controls from '@web/components/Controls';
import Output from '@web/components/Output';

const getEmptyCells = () => Array.from({ length: 20 }, () => ({ value: 0, className: '' } as Cell));

export default function Brainfuck() {
  const [state, setState] = useState(ProgramState.Stopped);
  const [error, setError] = useState('');
  const [cells, setCells] = useState(getEmptyCells());
  const [delay, setDelay] = useState(1);
  const [inputs, setInputs] = useState<Input[]>([
    {
      value: '',
      type: InputOutputType.String
    }
  ]);
  const [output, setOutput] = useState<OutputType>({
    value: [],
    type: InputOutputType.String
  });
  const [program, setProgram] = useState('');
  const [sanitizedProgram, setSanitizedProgram] = useState('');
  const [compiled, setCompiled] = useState<Compiled | null>(null);

  const sanitizeProgram = (dirty: string) => {
    return dirty.split('\n')
      .map(line => {
        const commentPos = line.indexOf('#');

        if (commentPos !== -1) {
          line = line.slice(0, commentPos);
        }

        return line.replace(/[^><+-.,\[\]]+/g, '').trim();
      })
      .join('');
  };

  const compile = () => {
    const loopStartMap: { [key: number]: number } = {};
    const loopEndMap: { [key: number]: number } = {};
    const startingPositions: number[] = [];

    for (let i = 0; i < sanitizedProgram.length; i++) {
      if (sanitizedProgram[i] == '[') {
        startingPositions.push(i);
      } else if (sanitizedProgram[i] == ']') {
        const startingPos = startingPositions.pop()!
        loopStartMap[i] = startingPos;
        loopEndMap[startingPos] = i;
      }
    }

    return {
      program: sanitizedProgram,
      pointer: 0,
      cursor: 0,
      inputBytes: inputs.map(input => {
        if (input.type === InputOutputType.Number) {
          return Number(input.value);
        } else {
          return input.value.split('').map(c => c.charCodeAt(0));
        }
      }).flat(),
      inputIndex: 0,
      loopStartMap,
      loopEndMap,
      start: new Date()
    };
  };

  useEffect(() => {
    if (state === ProgramState.Running) {
      if (compiled === null) {
        setError('');
        setCells(getEmptyCells());
        setOutput({
          ...output,
          value: []
        });
        setCompiled(compile());
      }
    } else if (state === ProgramState.Stopped) {
      setCompiled(null);
    }
  }, [state]);

  useEffect(() => {
    const runOnce = [
      ProgramState.Previous,
      ProgramState.Next
    ];
    const allowToRun = runOnce.concat([ProgramState.Running]);

    if (!allowToRun.includes(state) || compiled === null) {
      return;
    }

    const start = new Date().getTime();

    let { pointer, cursor, inputBytes, inputIndex, loopStartMap, loopEndMap } = compiled;
  
    if (cursor >= compiled.program.length) {
      setState(ProgramState.Stopped);
      return;
    }
  
    // Remove the pointer class as we might be moving it.
    const newCells = cells.map(cell => ({ ...cell, className: '' }));
    const cell = newCells[pointer].value;

    switch (compiled.program.charAt(cursor)) {
      case '>':
        pointer += 1;
        break;
  
      case '<':
        pointer -= 1;
        if (pointer < 0) {
          setError(`Pointer out of bounds: ${pointer}`);
          setState(ProgramState.Paused);
          return;
        }
        break;
  
      case '+':
        newCells[pointer].value += 1;
        if (newCells[pointer].value > 255) {
          newCells[pointer].value = 0;
        }
        break;
  
      case '-':
        newCells[pointer].value -= 1;
        if (newCells[pointer].value < 0) {
          newCells[pointer].value = 255;
        }
        break;
  
      case '.':
        setOutput({
          ...output,
          value: output.value.concat([cell])
        });
        break;
  
      case ',':
        newCells[pointer].value = inputBytes[inputIndex] ?? 0;
        inputIndex += 1;
        break;
  
      case '[':
        if (cell === 0) {
          cursor = loopEndMap[cursor] - 1;
        }
        break;
  
      case ']':
        if (cell > 0) {
          cursor = loopStartMap[cursor] - 1;
        }
        break;
    }

    if (newCells[pointer] === undefined) {
      newCells[pointer] = { value: 0, className: '' };
    }
  
    // Mark the current cell.
    newCells[pointer].className = 'text-primary';

    setCells(newCells);

    if (runOnce.includes(state)) {
      setState(ProgramState.Paused);
    }

    const wait = Math.max(0, delay - (new Date().getTime() - start));
    const nextCompiled = { ...compiled, pointer, cursor: cursor + 1, inputIndex, previous: { ...compiled, cells: [...cells] } };

    setTimeout(() => {
      setCompiled(nextCompiled);
    }, wait);
  }, [state, compiled])

  const loadExample = (example: Example) => {
    setError('');
    setCells(getEmptyCells());
    setInputs(example.inputs);
    setOutput({ value: [], type: example.outputType });
    setProgram(example.program);
    setSanitizedProgram(sanitizeProgram(example.program));
    setCompiled(null);
  };

  const inputTypeHandler = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newInputs = [...inputs];
    newInputs[index].type = e.target.value as InputOutputType;
    setInputs(newInputs);
  }

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newInputs = [...inputs];
    newInputs[index].value = e.target.value;
    setInputs(newInputs);
  };

  const addInput = () => {
    setInputs([...inputs, { value: '', type: InputOutputType.String }]);
  };

  const removeInput = (index: number) => {
    setInputs(inputs.filter((_, i) => i !== index));
  };

  const programHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCompiled(null);
    setProgram(e.target.value);
    setSanitizedProgram(sanitizeProgram(e.target.value));
  };

  const play = () => {
    if (state === ProgramState.Stopped) {
      setError('');
      setCells(getEmptyCells());
      setOutput({
        ...output,
        value: []
      });
      setCompiled(compile());
    }

    setState(ProgramState.Running);
  };

  const pause = () => {
    setState(ProgramState.Paused);
  };

  const stop = () => {
    setState(ProgramState.Stopped);
  };

  const previous = () => {
    if (compiled?.previous) {
      setCells(compiled.previous.cells);
      setCompiled(compiled.previous);
    }
  };

  const next = () => {
    if (!compiled || state === ProgramState.Stopped) {
      setError('');
      setCells(getEmptyCells());
      setCompiled(compile());
    }

    setState(ProgramState.Next);
  };

  return (
    <Fragment>
      <header className="m-4">
        <h1>
          Brainfuck Interpreter
          <div className="btn-group">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#referenceModal">
              Reference
            </button>
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Examples
            </button>
            <ul className="dropdown-menu">
              {examples.map((example, i) => (
                <li key={`example-${i}`}><a className="dropdown-item" onClick={() => loadExample(example)}>{example.name}</a></li>
              ))}
            </ul>
          </div>
        </h1>
      </header>
      <hr />
      <div className="row m-4">
        <div className="col-12 col-xxl-6">
          <div className="row mb-3 mb-xxl-0">
            <div className="editor col-8">
              <h3 className="first">Editor</h3>
              <textarea className="form-control" disabled={state === ProgramState.Running} rows={Math.max(10, program.split('\n').length)} value={program} onChange={programHandler}></textarea>
            </div>
            <div className="inputs col-4">
              <h3>
                Input(s)
                <button className="btn btn-success" type="button" onClick={addInput}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </h3>
              {inputs.map((input, i) => (
                <div key={`input-${i}`} className="input mb-3">
                  <select className="form-select w-auto" value={input.type} onChange={e => inputTypeHandler(e, i)}>
                    <option value={InputOutputType.String}>String</option>
                    <option value={InputOutputType.Number}>Number</option>
                  </select>
                  <input type={input.type} className="form-control mx-1" value={input.value} onChange={e => inputHandler(e, i)} />
                  <button className="btn btn-danger" type="button" disabled={inputs.length === 1} onClick={() => removeInput(i)}>
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-12 col-xxl-6">
          <Output output={output} setOutput={setOutput} />
          <hr />
          <Controls
            delay={delay}
            setDelay={setDelay}
            programState={state}
            play={play}
            pause={pause}
            stop={stop}
            previous={previous}
            next={next}
            compiledCursor={compiled?.cursor}
            start={compiled?.start}
          />
          <hr />
          <Error error={error} />
          <Cells cells={cells} runtimePointer={compiled?.pointer} />
          <Explanation sanitized={sanitizedProgram} runtimeCursor={compiled?.cursor} />
        </div>
      </div>
      <Reference />
    </Fragment>
  );
}
