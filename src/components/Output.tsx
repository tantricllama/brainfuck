import React, { Fragment } from 'react';
import { InputOutputType, Output as OutputType } from '@web/types';

interface Props {
  output: OutputType;
  setOutput: (output: OutputType) => void;
}

export default function Output(props: Props) {
  const { output, setOutput } = props;

  const outputTypeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOutput({
      ...output,
      type: e.target.value as InputOutputType
    });
  };

  const parseOutput = (output: OutputType): string => {
    if (output.type === InputOutputType.Number) {
      return output.value.join('\n');
    } else {
      return output.value
        .map(c => String.fromCharCode(c))
        .join('');
    }
  };

  let rows: number;
  if (output.type == InputOutputType.Number) {
    rows = Math.max(1, output.value.length);
  } else {
    rows = 1;
  }

  return (
    <Fragment>
      <h3>Output</h3>
      <div className="output">
        <select className="form-select w-auto" value={output.type} onChange={outputTypeHandler}>
          <option value={InputOutputType.String}>String</option>
          <option value={InputOutputType.Number}>Number</option>
        </select>
        <textarea className="form-control ms-1" rows={rows} value={parseOutput(output)} disabled />
      </div>
    </Fragment>
  );
}
