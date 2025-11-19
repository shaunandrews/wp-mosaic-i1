import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './design-system/base.css';
import './design-system/color.css';
import './design-system/space.css';
import './design-system/type.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
