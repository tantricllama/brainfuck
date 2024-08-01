import React from 'react';
import { ProgramState } from '@web/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faStop } from '@fortawesome/free-solid-svg-icons/faStop';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';

interface Props {
  delay: number;
  setDelay: (delay: number) => void;
  programState: ProgramState;
  play: () => void;
  pause: () => void;
  stop: () => void;
  previous: () => void;
  next: () => void;
  compiledCursor?: number;
  start?: Date;
}

export default function Controls(props: Props) {
  const { delay, setDelay, programState, play, pause, stop, previous, next, compiledCursor, start } = props;
  const diff = start ? Math.floor((new Date().getTime() - start.getTime()) / 1000) : 0;
  const seconds = diff % 60;
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 3660);

  return (
    <div className="col-12">
      <div className="delay">
        <div className="input-group w-auto">
          <span className="input-group-text">Delay:</span>
          <input type="number" className="form-control" placeholder="Delay" value={delay} onChange={e => setDelay(Number(e.target.value))} />
          <span className="input-group-text">(ms)</span>
        </div>
        <div className="btn-group ms-1">
          <button type="button" className="btn btn-success" onClick={play} disabled={programState === ProgramState.Running}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <button type="button" className="btn btn-success" onClick={pause} disabled={programState !== ProgramState.Running}>
            <FontAwesomeIcon icon={faPause} />
          </button>
          <button type="button" className="btn btn-danger" onClick={stop} disabled={programState === ProgramState.Stopped}>
            <FontAwesomeIcon icon={faStop} />
          </button>
        </div>
        <div className="btn-group ms-1">
          <button type="button" className="btn btn-primary" onClick={previous} disabled={programState === ProgramState.Running || compiledCursor === 0}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button type="button" className="btn btn-primary" onClick={next} disabled={programState === ProgramState.Running}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
        <div className="timer ms-3">
          {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
