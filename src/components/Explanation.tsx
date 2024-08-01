import { Breakdown as BreakdownType } from '@web/types';
import React, { useEffect } from 'react';
import Breakdown from './Breakdown';

interface Props {
  sanitized: string;
  runtimeCursor?: number;
}

export default function Explanation(props: Props) {
  const [breakdowns, setBreakdowns] = React.useState<BreakdownType[]>([]);
  const { sanitized, runtimeCursor } = props;

  useEffect(() => {
    const clean = sanitized.split('');
    if (!clean.length) {
      return;
    }

    const parts: string[] = [];

    while (clean.length) {
      const index = Math.max(0, parts.length - 1);

      if (parts.length <= index) {
        parts.push('');
      }

      const next = clean.shift()!;

      if (!['[', ']'].includes(next) && (!parts[index].length || parts[index].includes(next))) {
        parts[index] += next;
      } else {
        parts.push(next);
      }
    }

    let indentBy = 4;
    let indentation = 0;
    let cursorStart = 0;
    let invalid = false;

    const breakdowns: BreakdownType[] = parts.map(part => {
      let explanation = '';
      if (part[0] === '+') {
        explanation += 'Increment by ' + part.length;
      } else if (part[0] === '-') {
        explanation += 'Decrement by ' + part.length;
      } else if (part[0] === '>') {
        if (part.length === 1) {
          explanation += 'Move right';
        } else {
          explanation += `Move right ${part.length} cells`;
        }
      } else if (part[0] === '<') {
        if (part.length === 1) {
          explanation += 'Move left';
        } else {
          explanation += `Move left ${part.length} cells`;
        }
      } else if (part[0] === '.') {
        explanation += 'Write byte ' + (part.length > 1 ? part.length + ' times' : 'once');
      } else if (part[0] === ',') {
        explanation += 'Read byte ' + (part.length > 1 ? part.length + ' times' : 'once');
      } else if (part[0] === '[') {
        explanation += 'Loop until 0';
      } else if (part[0] === ']') {
        explanation += 'End loop if 0';
        if (indentation === 0) {
          invalid = true;
        } else {
          indentation -= indentBy;
        }
      }

      const breakdown = { part, cursorStart, explanation, indentation, invalid };

      if (part[0] === '[') {
        indentation += indentBy;
      }

      cursorStart += part.length;

      return breakdown;
    });

    if (indentation > 0) {
      breakdowns[breakdowns.length - 1].invalid = true;
    }

    setBreakdowns(breakdowns);
  }, [sanitized]);

  const cursor = runtimeCursor ?? 0;

  return (
    <div className="explanation col-12">
      <h3>Cursor</h3>
      {breakdowns.length === 0 ? (
        <pre>Nothing to explain</pre>
      ) : (
        <div className="breakdowns">
          {breakdowns.map(({ part, cursorStart, explanation, indentation, invalid }, i) => (
            <Breakdown
              key={`breakdown-${i}`}
              part={part}
              cursorStart={cursorStart}
              cursor={cursor}
              explanation={explanation}
              indentation={indentation}
              invalid={invalid}
            />
          ))}
        </div>
      )}
    </div>
  );
}
