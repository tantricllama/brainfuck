import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from '@web/components/App';

import 'bootstrap/dist/js/bootstrap.bundle.min';
import './scss/index.scss';

const Node = React.Fragment;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Node>
    <App />
  </Node>
);
