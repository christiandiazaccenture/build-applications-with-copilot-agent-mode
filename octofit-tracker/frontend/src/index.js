import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
// Compute API base from Codespace env var if available
const codespaceName = process.env.REACT_APP_CODESPACE_NAME || '';
const apiBase = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/` : '/api/';
console.log('REACT app starting. API base:', apiBase);

root.render(<App />);
