import React from 'react';
import { Cell } from '@web/types';
import classnames from 'classnames';

interface Props {
  cells: Cell[];
  runtimePointer?: number;
}

export default function Cells(props: Props) {
  const chunkSize = 20;
  const rows = [];

  for (let i = 0; i < props.cells.length; i += chunkSize) {
    rows.push(props.cells.slice(i, i + chunkSize));
  }

  return (
    <div className="cells col-12 mb-3">
      <h3>Cells</h3>
      <table className="table table-borderless">
        <tbody>
          {rows.map((row, i) => (
            <tr key={`row-${i}`}>
              {row.map((cell, j) => (
                <td key={`cell-${i}-${j}`} className={classnames({
                  active: props.runtimePointer === (i * 20) + j,
                })}>{cell.value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
