import React from 'react';

const references = [
  {
    char: '>',
    description: 'move the pointer to the next cell'
  },
  {
    char: '<',
    description: 'move the pointer to the previous cell'
  },
  {
    char: '+',
    description: 'increment the byte at the pointer'
  },
  {
    char: '-',
    description: 'decrement the byte at the pointer'
  },
  {
    char: ',',
    description: 'read and store one byte of input at the pointer'
  },
  {
    char: '.',
    description: 'output the byte at the pointer'
  },
  {
    char: '[',
    description: 'if the byte at the pointer is zero move the pointer forward to the command after the matching <strong>]</strong> command'
  },
  {
    char: ']',
    description: 'if the byte at the pointer is nonzero move the pointer back to the command after the matching <strong>[</strong> command'
  },
];

export default function Reference() {
  return (
    <div className="modal fade" id="referenceModal" tabIndex={-1} aria-labelledby="referenceModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Reference</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body p-0">
            <div className="list-group list-group-flush">
              {references.map((ref, i) => (
                <div key={`reference-${i}`} className="list-group-item p-3">
                  <div className="row">
                    <div className="col-1">
                      <strong>{ref.char}</strong>
                    </div>
                    <div className="col-11" dangerouslySetInnerHTML={{__html: ref.description}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
