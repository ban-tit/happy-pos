import ReactDOM from 'react-dom/client';
import './index.css';
import { router } from './routes/Router';
import { RouterProvider } from 'react-router-dom';
import AppProvider from './contexts/AppContext';

console.log('env:', process.env);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>,
);
