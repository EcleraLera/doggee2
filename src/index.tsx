import ReactDOM from 'react-dom/client';

import { App } from './App';

import 'Shared/Assets/reset.scss';

const root = ReactDOM.createRoot(
  document.querySelector('#root') as HTMLElement
);
root.render(<App />);
