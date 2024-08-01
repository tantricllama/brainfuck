import React from 'react';

export default function Error(props: { error: string }) {
  if (!props.error.length) {
    return null;
  }

  return (
    <div className="explanation col-12">
      <h3>Error</h3>
      <pre className="bg-danger text-light fw-bold p-3" dangerouslySetInnerHTML={{__html: props.error}} />
    </div>
  );
}
