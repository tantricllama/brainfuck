import React from 'react';

interface Props {
  invalid: boolean;
  cursor: number;
  cursorStart: number;
  part: string;
  indentation: number;
  explanation: string;
}

export default function Breakdown(props: Props) {
  const { invalid, cursor, cursorStart, part, indentation, explanation } = props;

  let commentClassName = '';
  if (invalid) {
    commentClassName = 'fw-bold text-danger';
  } else if (cursor >= cursorStart && cursor < cursorStart + part.length) {
    commentClassName = 'fw-bold text-primary';
  }

  let newParts = [];

  const pos = cursor - cursorStart;
  if (pos >= 0 && pos < part.length) {
    if (pos > 0) {
      newParts.push(part.slice(0, pos));
    }

    newParts.push((<span key={`active-${cursor}`} className="active">{part[pos]}</span>));

    if (pos + 1 < part.length) {
      newParts.push(part.slice(pos + 1));
    }
  } else {
    newParts.push(part);
  }

  return (
    <div className="row g-0">
      <pre className="bg-light col-6">
        <span dangerouslySetInnerHTML={{__html: '&nbsp;'.repeat(indentation)}} />
        <strong>
          {newParts}
        </strong>
      </pre>
      <pre className="bg-light col-6">
        <span className={commentClassName}># {explanation}</span>
      </pre>
    </div>
  );
}
